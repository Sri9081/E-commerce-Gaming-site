import React from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Sparkles } from 'lucide-react';
import type { Product } from '../../types';
import GlassCard from '../ui/GlassCard';
import GlassButton from '../ui/GlassButton';

interface UpsellPopupProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
    onAddToCart: (product: Product) => void;
}

const UpsellPopup: React.FC<UpsellPopupProps> = ({ product, isOpen, onClose, onAddToCart }) => {
    // No auto-close for modals, requires user interaction

    if (!product) return null;

    return ReactDOM.createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
                    >
                        <GlassCard className="pointer-events-auto w-full max-w-md border-accent/50 shadow-[0_0_50px_rgba(234,179,8,0.2)] relative overflow-hidden">

                            {/* Decorative Background Glow */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-accent/10 blur-3xl rounded-full -z-10" />

                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-full p-2"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="text-center mb-6 pt-4">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", delay: 0.2 }}
                                    className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-accent/30 shadow-[0_0_20px_rgba(234,179,8,0.3)]"
                                >
                                    <Sparkles className="w-8 h-8 text-accent animate-pulse" />
                                </motion.div>
                                <h2 className="text-2xl font-bold text-white mb-2">Exclusive Deal Unlocked!</h2>
                                <p className="text-gray-400 text-sm">Because you have great taste...</p>
                            </div>

                            <div className="bg-white/5 rounded-xl p-4 mb-6 border border-white/5">
                                <div className="flex gap-4">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-24 h-24 rounded-lg object-cover bg-black/40"
                                    />
                                    <div className="flex-1 flex flex-col justify-center">
                                        <h3 className="font-bold text-lg leading-tight mb-2">{product.name}</h3>
                                        <div className="flex items-center gap-3">
                                            {product.originalPrice && (
                                                <span className="text-gray-500 line-through text-sm">
                                                    ₹{product.originalPrice.toLocaleString('en-IN')}
                                                </span>
                                            )}
                                            <span className="text-xl font-bold text-accent">
                                                ₹{product.price.toLocaleString('en-IN')}
                                            </span>
                                            {product.originalPrice && (
                                                <span className="text-xs font-bold text-black bg-accent px-2 py-0.5 rounded">
                                                    SAVE {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <GlassButton
                                    onClick={() => onAddToCart(product)}
                                    className="w-full bg-accent hover:bg-accent/90 text-black border-none font-bold py-4 text-lg hover:scale-[1.02] shadow-[0_0_20px_rgba(234,179,8,0.4)]"
                                >
                                    Add to Cart <ShoppingCart className="w-5 h-5 ml-2" />
                                </GlassButton>
                                <button
                                    onClick={onClose}
                                    className="w-full py-3 text-sm text-gray-500 hover:text-white transition-colors"
                                >
                                    No thanks, I'll pass on this offer
                                </button>
                            </div>
                        </GlassCard>
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default UpsellPopup;
