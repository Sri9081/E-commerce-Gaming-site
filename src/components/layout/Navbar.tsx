import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, Gamepad2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { cn } from '../../lib/utils';

const Navbar: React.FC = () => {
    const { toggleCart, items } = useCart();
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Scroll effect for navbar background
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Hardware', path: '/catalog?category=hardware' },
        { name: 'Games', path: '/catalog?category=game' },
        { name: 'Hot Deals', path: '/catalog?category=deals' },
    ];

    const isActive = (path: string) => {
        if (path === '/' && location.pathname === '/') return true;
        if (path !== '/' && location.search.includes(path.split('?')[1])) return true;
        return false;
    };

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b border-transparent",
                scrolled ? "bg-background/70 backdrop-blur-md border-glass-border h-16" : "bg-transparent h-20"
            )}
        >
            <div className="container mx-auto px-4 h-full flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <motion.div
                        whileHover={{ rotate: 15, scale: 1.1 }}
                        className="p-2 bg-primary/20 rounded-lg group-hover:bg-primary/40 transition-colors"
                    >
                        <Gamepad2 className="w-6 h-6 text-primary" />
                    </motion.div>

                    <span className="text-xl font-bold tracking-tight">
                        NEXUS<span className="text-primary">GAMING</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map(link => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={cn(
                                "text-sm font-bold transition-all relative px-3 py-1 rounded-full",
                                isActive(link.path)
                                    ? "text-primary bg-primary/10 shadow-[0_0_10px_rgba(var(--color-primary),0.3)]"
                                    : "text-gray-300 hover:text-white"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleCart}
                        className="relative p-2 hover:bg-white/10 rounded-full transition-colors group"
                    >
                        <ShoppingCart className="w-6 h-6 text-gray-300 group-hover:text-white" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs flex items-center justify-center rounded-full font-bold shadow-lg">
                                {cartCount}
                            </span>
                        )}
                    </motion.button>

                    {/* Mobile Menu Trigger (Simplified) */}
                    <button className="md:hidden p-2">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
