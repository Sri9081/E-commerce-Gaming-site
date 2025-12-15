import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Star, Eye } from 'lucide-react';
import { productService } from '../services/api';
import type { Product, Category } from '../types';
import GlassCard from '../components/ui/GlassCard';
import GlassButton from '../components/ui/GlassButton';
import Skeleton from '../components/ui/Skeleton';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import QuickViewModal from '../components/product/QuickViewModal';
import UpsellPopup from '../components/product/UpsellPopup';
import TiltWrapper from '../components/ui/TiltWrapper';
import { cn } from '../lib/utils';

const Catalog: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [suggestions, setSuggestions] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category') as Category | null;
    const [searchTerm, setSearchTerm] = useState('');
    const { addItem } = useCart();
    const { setTheme } = useTheme();
    const { addToast } = useToast();

    // Quick View State
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Upsell State
    const [showUpsell, setShowUpsell] = useState(false);
    const [upsellProduct, setUpsellProduct] = useState<Product | null>(null);

    // Update theme based on category
    useEffect(() => {
        if (category === 'hardware') {
            setTheme('hardware');
        } else if (category === 'game') {
            setTheme('game');
        } else if (category === 'deals') {
            setTheme('deals');
        } else {
            setTheme('default');
        }

        return () => {
            if (!category) setTheme('default');
        };
    }, [category, setTheme]);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            let data = await productService.getProducts();

            if (category) {
                data = data.filter(p => p.category === category);
            }

            if (searchTerm) {
                data = data.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
            }

            // Sorting: New First, Out of Stock Last
            data.sort((a, b) => {
                const aStock = a.inStock !== false;
                const bStock = b.inStock !== false;
                const aNew = !!a.isNew;
                const bNew = !!b.isNew;

                if (aStock && !bStock) return -1;
                if (!aStock && bStock) return 1;
                if (aNew && !bNew) return -1;
                if (!aNew && bNew) return 1;
                return 0;
            });

            setProducts(data);

            // Logic for suggestions if no results
            if (data.length === 0 && searchTerm) {
                const allData = await productService.getProducts();
                // Get some random suggestions or "featured"
                const randomSuggestions = allData
                    .filter(p => p.inStock !== false)
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 3);
                setSuggestions(randomSuggestions);
            } else {
                setSuggestions([]);
            }

            setIsLoading(false);
        };
        fetchProducts();
    }, [category, searchTerm]);

    const openQuickView = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleAddToCart = async (e: React.MouseEvent, product: Product) => {
        e.stopPropagation();
        if (product.inStock === false) return; // Prevent adding out of stock

        addItem(product);
        addToast(`Added ${product.name} to cart`, 'success');

        if (product.category === 'hardware' || product.category === 'game') {
            // Fetch deals dynamically since current 'products' state might only have hardware/games
            const allDeals = await productService.getProductsByCategory('deals');
            const validDeals = allDeals.filter(p => p.inStock !== false);

            if (validDeals.length > 0) {
                // Pick random deal
                const randomDeal = validDeals[Math.floor(Math.random() * validDeals.length)];
                setUpsellProduct(randomDeal);
                setShowUpsell(true);
            }
        }
    };

    const handleUpsellAddToCart = (product: Product) => {
        addItem(product);
        addToast(`Added ${product.name} to cart`, 'success');
        setShowUpsell(false);
    };

    const renderCard = (product: Product) => (
        <TiltWrapper key={product.id} className="h-full">
            <GlassCard
                hoverEffect
                className={cn(
                    "flex flex-col h-full group cursor-pointer transition-all duration-300",
                    product.inStock === false && "opacity-75 grayscale"
                )}
                onClick={() => openQuickView(product)}
            >
                <div className="relative aspect-video mb-4 overflow-hidden rounded-lg transform-style-3d">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1 z-20">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        {product.rating}
                    </div>

                    {/* Badges Container */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-2 items-center justify-center w-full px-2 z-20">
                        <div className={cn(
                            "px-2 py-1 rounded-md text-xs font-bold border capitalize backdrop-blur-md shadow-lg",
                            product.inStock === false
                                ? "bg-gray-500/80 text-white border-gray-400"
                                : "bg-black/60 text-white border-white/10"
                        )}>
                            {product.inStock === false ? 'Out of Stock' : product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                        </div>

                        {product.isNew && (
                            <div className="px-2 py-1 rounded-md text-xs font-bold bg-red-600 text-white shadow-lg animate-pulse whitespace-nowrap">
                                New Arrival
                            </div>
                        )}
                    </div>

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                        <span className="bg-primary/90 text-white px-4 py-2 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <Eye className="w-4 h-4" /> Quick View
                        </span>
                    </div>
                </div>

                <div className="flex-1 flex flex-col transform-style-3d">
                    <div className="mb-2">
                        <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-1 translate-z-4">{product.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                            <span className={cn(
                                "text-xl font-bold text-primary",
                                product.category === 'deals' && "text-accent animate-pulse"
                            )}>
                                ₹{product.price.toLocaleString('en-IN')}
                            </span>
                            {product.originalPrice && (
                                <span className="text-sm text-gray-500 line-through decoration-red-500/80 decoration-2">
                                    ₹{product.originalPrice.toLocaleString('en-IN')}
                                </span>
                            )}
                        </div>
                    </div>

                    <p className="text-sm text-gray-400 mb-4 line-clamp-2 flex-1">{product.description}</p>

                    <div className="flex gap-2 mb-6 flex-wrap">
                        {product.brand && (
                            <span className="text-xs px-2 py-1 rounded-md bg-white/5 border border-white/5 text-gray-300">
                                {product.brand}
                            </span>
                        )}
                    </div>

                    <GlassButton
                        className="w-full"
                        onClick={(e) => handleAddToCart(e, product)}
                        disabled={product.inStock === false}
                    >
                        {product.inStock === false ? 'Out of Stock' : 'Add to Cart'}
                    </GlassButton>
                </div>
            </GlassCard>
        </TiltWrapper>
    );

    return (
        <div className="pt-24 min-h-screen container mx-auto px-4 pb-20">
            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10">
                <div>
                    <h1 className="text-4xl font-bold mb-2 capitalize text-glow">
                        {category ? `${category} Store` : 'All Products'}
                    </h1>
                    <p className="text-gray-400">Find the perfect addition to your collection.</p>
                </div>

                <div className="flex gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full bg-white/5 border border-glass-border rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-primary/50 transition-colors text-white placeholder-gray-500"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                    // Skeleton Loading
                    Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="rounded-2xl overflow-hidden glass-panel h-[400px] p-6 flex flex-col">
                            <Skeleton className="w-full aspect-video rounded-lg mb-4" />
                            <div className="space-y-2 flex-1">
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-4 w-1/4" />
                                <Skeleton className="h-20 w-full mt-4" />
                            </div>
                            <Skeleton className="h-10 w-full mt-6" />
                        </div>
                    ))
                ) : (
                    // Product List
                    products.map(product => renderCard(product))
                )}
            </div>

            {!isLoading && products.length === 0 && (
                <div className="py-10">
                    <div className="text-center text-gray-400 mb-8">
                        <h2 className="text-xl font-bold text-white mb-2">No results found for "{searchTerm}"</h2>
                        <p>But check out these trending items:</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {suggestions.map(product => renderCard(product))}
                    </div>
                </div>
            )}

            {/* Upsell Popup */}
            <UpsellPopup
                isOpen={showUpsell}
                product={upsellProduct}
                onClose={() => setShowUpsell(false)}
                onAddToCart={handleUpsellAddToCart}
            />

            <QuickViewModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                product={selectedProduct}
            />
        </div>
    );
};

export default Catalog;
