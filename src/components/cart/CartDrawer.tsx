import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import GlassButton from '../ui/GlassButton';
import { useNavigate } from 'react-router-dom';

const CartDrawer: React.FC = () => {
    const { isOpen, toggleCart, items, updateQuantity, removeItem, subtotal, total } = useCart();
    const navigate = useNavigate();

    const handleCheckout = () => {
        toggleCart();
        navigate('/checkout');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-background/80 backdrop-blur-xl border-l border-glass-border z-50 flex flex-col shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-glass-border">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <ShoppingCart className="w-5 h-5 text-primary" />
                                Your Cart
                            </h2>
                            <button onClick={toggleCart} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Free Shipping Meter */}
                        <div className="px-6 py-4 bg-white/5 border-b border-glass-border">
                            {total >= 50000 ? (
                                <div className="text-green-400 text-sm font-bold flex items-center gap-2">
                                    🎉 You've unlocked FREE Shipping!
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Add <span className="text-primary font-bold">₹{(50000 - total).toLocaleString('en-IN')}</span> for Free Shipping</span>
                                        <span className="text-gray-400">{Math.min(100, (total / 50000) * 100).toFixed(0)}%</span>
                                    </div>
                                    <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${Math.min(100, (total / 50000) * 100)}%` }}
                                            className="h-full bg-gradient-to-r from-primary to-secondary"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {items.length === 0 ? (
                                <div className="text-center text-gray-400 mt-20">
                                    <ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-20" />
                                    <p>Your cart is empty.</p>
                                    <GlassButton
                                        variant="ghost"
                                        className="mt-4"
                                        onClick={toggleCart}
                                    >
                                        Continue Shopping
                                    </GlassButton>
                                </div>
                            ) : (
                                items.map(item => (
                                    <div key={item.id} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-sm line-clamp-1">{item.name}</h3>
                                            <p className="text-gray-400 text-xs mb-2 capitalize">{item.category}</p>
                                            <div className="flex items-center justify-between">
                                                <span className="font-bold text-primary">₹{item.price.toLocaleString('en-IN')}</span>

                                                <div className="flex items-center gap-2 bg-black/20 rounded-lg p-1">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-1 hover:text-white text-gray-400 transition-colors"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="text-xs w-4 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-1 hover:text-white text-gray-400 transition-colors"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="self-start text-gray-500 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-6 border-t border-glass-border bg-black/20">
                                <div className="space-y-2 mb-4 text-sm">
                                    <div className="flex justify-between text-gray-400">
                                        <span>Subtotal</span>
                                        <span>₹{subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-400">
                                        <span>Tax (10%)</span>
                                        <span>₹{(total - subtotal).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold pt-2 border-t border-white/10">
                                        <span>Total</span>
                                        <span className="text-primary">₹{total.toLocaleString('en-IN')}</span>
                                    </div>
                                </div>
                                <GlassButton className="w-full" size="lg" onClick={handleCheckout}>
                                    Checkout
                                </GlassButton>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
