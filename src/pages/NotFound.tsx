import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Home, AlertTriangle, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlassButton from '../components/ui/GlassButton';
import { cn } from '../lib/utils';

const NotFound: React.FC = () => {
    // Game State
    const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);
    const [winner, setWinner] = useState<string | null>(null);
    const [isDraw, setIsDraw] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);

    // Check for winner
    const checkWinner = useCallback((squares: (string | null)[]) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }, []);

    // AI Turn
    useEffect(() => {
        if (!isPlayerTurn && !winner && !isDraw) {
            const timer = setTimeout(() => {
                const emptyIndices = board.map((val, idx) => val === null ? idx : null).filter(val => val !== null) as number[];

                if (emptyIndices.length === 0) return;

                let move = -1;

                // 1. Try to win
                for (let idx of emptyIndices) {
                    const tempBoard = [...board];
                    tempBoard[idx] = 'O';
                    if (checkWinner(tempBoard) === 'O') {
                        move = idx;
                        break;
                    }
                }

                // 2. Block player
                if (move === -1) {
                    for (let idx of emptyIndices) {
                        const tempBoard = [...board];
                        tempBoard[idx] = 'X';
                        if (checkWinner(tempBoard) === 'X') {
                            move = idx;
                            break;
                        }
                    }
                }

                // 3. Take center
                if (move === -1 && board[4] === null) move = 4;

                // 4. Random
                if (move === -1) {
                    move = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
                }

                const newBoard = [...board];
                newBoard[move] = 'O';
                setBoard(newBoard);

                const win = checkWinner(newBoard);
                if (win) {
                    setWinner(win);
                } else if (!newBoard.includes(null)) {
                    setIsDraw(true);
                } else {
                    setIsPlayerTurn(true);
                }
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isPlayerTurn, winner, isDraw, board, checkWinner]);

    const handleSquareClick = (index: number) => {
        if (board[index] || winner || !isPlayerTurn) return;

        setGameStarted(true);
        const newBoard = [...board];
        newBoard[index] = 'X';
        setBoard(newBoard);

        const win = checkWinner(newBoard);
        if (win) {
            setWinner(win);
        } else if (!newBoard.includes(null)) {
            setIsDraw(true);
        } else {
            setIsPlayerTurn(false);
        }
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsPlayerTurn(true);
        setWinner(null);
        setIsDraw(false);
        setGameStarted(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center pt-20 pb-10 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.02] -z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[100px] rounded-full -z-10" />

            <div className="text-center p-8 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 relative inline-block"
                >
                    <AlertTriangle className="w-24 h-24 text-red-500 opacity-80" />
                    <div className="absolute inset-0 blur-xl bg-red-500/30 -z-10 animate-pulse" />
                </motion.div>

                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 mb-8"
                >
                    404
                </motion.h1>

                {/* Tic Tac Toe Board */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-8 bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-md"
                >
                    <div className="grid grid-cols-3 gap-2">
                        {board.map((cell, index) => (
                            <button
                                key={index}
                                onClick={() => handleSquareClick(index)}
                                disabled={!!cell || !!winner || !isPlayerTurn}
                                className={cn(
                                    "w-16 h-16 rounded-lg bg-black/40 flex items-center justify-center text-3xl font-bold transition-all duration-200",
                                    !cell && !winner && "hover:bg-white/10",
                                    cell === 'X' ? "text-purple-500" : "text-teal-400"
                                )}
                            >
                                {cell && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    >
                                        {cell}
                                    </motion.span>
                                )}
                            </button>
                        ))}
                    </div>
                    {/* Reset Button (Small) */}
                    {(winner || isDraw) && (
                        <div className="mt-4 flex justify-center">
                            <button
                                onClick={resetGame}
                                className="text-xs text-gray-500 hover:text-white flex items-center gap-1 transition-colors"
                            >
                                <RotateCcw className="w-3 h-3" /> Play Again
                            </button>
                        </div>
                    )}
                </motion.div>

                {/* Game Result / Game Over Text */}
                <div className="h-16 mb-4">
                    {(winner || isDraw) ? (
                        <motion.h2
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className={cn(
                                "text-4xl font-bold",
                                winner === 'X' ? "text-green-400" : "text-red-500"
                            )}
                        >
                            {winner === 'X' ? "YOU WON" : winner === 'O' ? "GAME OVER" : "DRAW"}
                        </motion.h2>
                    ) : (
                        <motion.h2
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-3xl font-bold text-gray-600"
                        >
                            {gameStarted ? "Playing..." : "Challenger Awaits"}
                        </motion.h2>
                    )}
                </div>


                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-400 max-w-md mx-auto mb-8"
                >
                    The level you are looking for seems to be corrupted or doesn't exist.
                    Lets get you back to the lobby.
                </motion.p>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <Link to="/">
                        <GlassButton size="lg" className="group">
                            <Home className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                            Return to Home Base
                        </GlassButton>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default NotFound;
