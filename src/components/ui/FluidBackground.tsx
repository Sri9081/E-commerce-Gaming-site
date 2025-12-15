import React from 'react';
import { motion } from 'framer-motion';

const FluidBackground: React.FC = () => {
    return (
        <div className="fixed inset-0 -z-10 bg-background overflow-hidden">
            {/* Dark Overlay for contrast */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />

            {/* Mesh Gradient Blobs */}
            <div className="relative w-full h-full filter blur-[80px] opacity-60">
                <motion.div
                    animate={{
                        x: [0, 100, -50, 0],
                        y: [0, -50, 100, 0],
                        scale: [1, 1.2, 0.9, 1]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                    className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary rounded-full mix-blend-screen"
                />

                <motion.div
                    animate={{
                        x: [0, -70, 30, 0],
                        y: [0, 80, -40, 0],
                        scale: [1, 1.1, 0.9, 1]
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: 2
                    }}
                    className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-secondary rounded-full mix-blend-screen"
                />

                <motion.div
                    animate={{
                        x: [0, 60, -60, 0],
                        y: [0, -40, 40, 0],
                        scale: [1, 1.3, 0.8, 1]
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: 5
                    }}
                    className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] bg-indigo-900 rounded-full mix-blend-screen"
                />
                <motion.div
                    animate={{
                        x: [0, -30, 30, 0],
                        y: [0, 30, -30, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                    className="absolute top-[40%] left-[40%] w-[300px] h-[300px] bg-purple-900/50 rounded-full mix-blend-screen"
                />
            </div>

            {/* Grain Texture (Optional, for extra feel) */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
        </div>
    );
};

export default FluidBackground;
