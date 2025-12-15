import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ShoppingCart, ShieldCheck, Zap } from 'lucide-react';
import type { Product } from '../../types';
import GlassButton from '../ui/GlassButton';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { cn } from '../../lib/utils';

interface QuickViewModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product | null;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ isOpen, onClose, product }) => {
    const { addItem } = useCart();
    const { addToast } = useToast();

    if (!product) return null;

    const handleAddToCart = () => {
        addItem(product);
        addToast(`Added ${product.name} to cart`, 'success');
        onClose();
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
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="bg-[#0f172a] border border-glass-border rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto pointer-events-auto flex flex-col md:flex-row relative shadow-[0_0_50px_rgba(var(--color-primary),0.1)]">
                            <motion.button
                                whileHover={{ rotate: 90, scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors z-10"
                            >
                                <X className="w-5 h-5 text-gray-300" />
                            </motion.button>

                            {/* Image Section */}
                            <div className="w-full md:w-1/2 relative bg-black">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-64 md:h-full object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                                    <div className="flex gap-2 mb-2">
                                        {product.category === 'hardware' && <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-xs font-bold border border-cyan-500/30">Hardware</span>}
                                        {product.category === 'game' && <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-xs font-bold border border-purple-500/30">Game</span>}
                                        {product.category === 'deals' && <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-xs font-bold border border-orange-500/30">Hot Deal</span>}
                                    </div>
                                    <h2 className="text-2xl font-bold text-white shadow-black drop-shadow-lg">{product.name}</h2>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-1 text-yellow-500">
                                        <motion.div whileHover={{ scale: 1.2, rotate: 10 }}>
                                            <Star className="w-5 h-5 fill-yellow-500" />
                                        </motion.div>
                                        <span className="font-bold text-lg">{product.rating}</span>
                                        <span className="text-gray-500 text-sm ml-1">(120+ reviews)</span>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        {product.originalPrice && (
                                            <span className="text-gray-500 line-through text-lg decoration-red-500 decoration-2">
                                                ₹{product.originalPrice.toLocaleString('en-IN')}
                                            </span>
                                        )}
                                        <span className={cn(
                                            "text-3xl font-bold text-primary",
                                            product.category === 'deals' && "text-accent animate-pulse"
                                        )}>
                                            ₹{product.price.toLocaleString('en-IN')}
                                        </span>
                                    </div>
                                </div>

                                <p className="text-gray-300 leading-relaxed mb-6">
                                    {product.description}
                                </p>

                                {/* Specs / Details Grid */}
                                <div className="bg-white/5 rounded-xl p-4 mb-6 grid grid-cols-2 gap-4">
                                    {product.brand && (
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Brand</p>
                                            <p className="font-medium text-white">{product.brand}</p>
                                        </div>
                                    )}
                                    {product.platform && (
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Platform</p>
                                            <p className="font-medium text-white">{product.platform}</p>
                                        </div>
                                    )}
                                    {product.specs && Object.entries(product.specs).map(([key, value]) => (
                                        <div key={key}>
                                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{key}</p>
                                            <p className="font-medium text-white">{value}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* User Reviews Section (New) */}
                                <div className="mb-6 flex-1">
                                    <h3 className="font-bold mb-3 flex items-center gap-2">
                                        <Star className="w-4 h-4 text-primary" /> User Reviews
                                    </h3>
                                    <div className="space-y-3 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                                        {product.reviews && product.reviews.length > 0 ? (
                                            product.reviews.map(review => (
                                                <div key={review.id} className="bg-white/5 p-3 rounded-lg text-sm">
                                                    <div className="flex justify-between mb-1">
                                                        <span className="font-bold text-gray-300">{review.user}</span>
                                                        <span className="text-xs text-gray-500">{review.date}</span>
                                                    </div>
                                                    <div className="flex text-yellow-500 mb-1">
                                                        {Array.from({ length: review.rating }).map((_, i) => (
                                                            <Star key={i} className="w-3 h-3 fill-current" />
                                                        ))}
                                                    </div>
                                                    <p className="text-gray-400 italic">"{review.comment}"</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-500 text-sm italic">No reviews yet.</p>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-4 mt-auto">
                                    <GlassButton
                                        onClick={handleAddToCart}
                                        disabled={product.inStock === false}
                                        className={cn(
                                            "flex-1 flex items-center justify-center gap-2 py-4 text-base",
                                            product.inStock === false && "opacity-50 cursor-not-allowed grayscale"
                                        )}
                                    >
                                        <motion.div whileHover={{ scale: 1.2 }}>
                                            <ShoppingCart className="w-5 h-5" />
                                        </motion.div>
                                        {product.inStock === false ? 'Out of Stock' : 'Add to Cart'}
                                    </GlassButton>
                                </div>

                                <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <motion.div whileHover={{ scale: 1.2 }}>
                                            <ShieldCheck className="w-4 h-4" />
                                        </motion.div>
                                        Secure Transaction
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <motion.div whileHover={{ scale: 1.2 }}>
                                            <Zap className="w-4 h-4" />
                                        </motion.div>
                                        Instant Delivery
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default QuickViewModal;
