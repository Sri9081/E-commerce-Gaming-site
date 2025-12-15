import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Twitter, Instagram, Facebook, Youtube, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <footer className="relative z-10 border-t border-glass-border bg-black/40 backdrop-blur-lg pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <motion.div
                                whileHover={{ rotate: 15, scale: 1.1 }}
                                className="p-2 bg-primary/20 rounded-lg"
                            >
                                <Gamepad2 className="w-6 h-6 text-primary" />
                            </motion.div>
                            <span className="text-xl font-bold tracking-tight">
                                NEXUS<span className="text-primary">GAMING</span>
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            The premier destination for next-gen hardware and digital entertainment.
                            Built for gamers, made by gamers.
                        </p>
                    </div>

                    {/* Shop */}
                    <div>
                        <h3 className="font-bold mb-6 text-glow">Shop</h3>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link to="/catalog?category=hardware" className="hover:text-primary transition-colors">Hardware</Link></li>
                            <li><Link to="/catalog?category=game" className="hover:text-primary transition-colors">Games</Link></li>
                            <li><Link to="/catalog" className="hover:text-primary transition-colors">New Arrivals</Link></li>
                            <li><Link to="/catalog" className="hover:text-primary transition-colors">Deals</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-bold mb-6 text-glow">Support</h3>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Order Status</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Returns & Warranty</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="font-bold mb-6 text-glow">Connect</h3>
                        <div className="flex gap-4">
                            <motion.a whileHover={{ y: -5, scale: 1.1 }} href="#" className="p-2 bg-white/5 rounded-full hover:bg-primary hover:text-white transition-all duration-300">
                                <Twitter className="w-5 h-5" />
                            </motion.a>
                            <motion.a whileHover={{ y: -5, scale: 1.1 }} href="#" className="p-2 bg-white/5 rounded-full hover:bg-primary hover:text-white transition-all duration-300">
                                <Instagram className="w-5 h-5" />
                            </motion.a>
                            <motion.a whileHover={{ y: -5, scale: 1.1 }} href="#" className="p-2 bg-white/5 rounded-full hover:bg-primary hover:text-white transition-all duration-300">
                                <Facebook className="w-5 h-5" />
                            </motion.a>
                            <motion.a whileHover={{ y: -5, scale: 1.1 }} href="#" className="p-2 bg-white/5 rounded-full hover:bg-primary hover:text-white transition-all duration-300">
                                <Youtube className="w-5 h-5" />
                            </motion.a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-glass-border pt-8 text-center text-sm text-gray-500">
                    <p className="flex items-center justify-center gap-1">
                        © 2024 Nexus Gaming. Crafted with <Heart className="w-4 h-4 text-red-500" /> for the community.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
