import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Monitor, Gamepad2, ArrowRight, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/ui/GlassCard';

const Home = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <div ref={containerRef} className="relative min-h-screen">
            {/* Hero Section */}
            <section className="relative h-screen flex flex-col justify-center items-center text-center p-4 overflow-hidden">
                {/* Hero Background with Parallax/Pulse */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 animate-pulse pointer-events-none" />
                <div className="absolute -inset-4 bg-[url('/images/hero-bg-pattern.png')] opacity-5 pointer-events-none" />

                <motion.div
                    style={{ y, opacity }}
                    className="z-10 max-w-4xl"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h2 className="text-secondary font-bold tracking-widest text-sm md:text-base mb-4 uppercase">Next Gen Gaming Store</h2>
                        <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tight">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-400">LEVEL</span>{' '}
                            <span className="text-primary text-glow">UP</span>
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                            Discover ultimate performance hardware and immersive digital worlds.
                            Your journey to supremacy starts here.
                        </p>
                    </motion.div>

                    <div className="flex flex-col gap-8 max-w-5xl mx-auto w-full">
                        {/* Top Row: Hardware & Games */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Hardware Card */}
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                <Link to="/catalog?category=hardware" className="block group h-full">
                                    <GlassCard className="h-full flex flex-col items-center justify-center p-10 hover:border-secondary/50 transition-colors duration-300 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10">
                                            <Monitor className="w-10 h-10 text-secondary" />
                                        </div>
                                        <h3 className="text-2xl font-bold mb-2 relative z-10">Hardware</h3>
                                        <p className="text-sm text-gray-400 mb-6 relative z-10">GPUs, Peripherals & Rigs</p>
                                        <div className="flex items-center text-secondary font-bold text-sm group-hover:gap-2 transition-all relative z-10">
                                            Shop Now <ArrowRight className="w-4 h-4 ml-1" />
                                        </div>
                                    </GlassCard>
                                </Link>
                            </motion.div>

                            {/* Games Card */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                            >
                                <Link to="/catalog?category=game" className="block group h-full">
                                    <GlassCard className="h-full flex flex-col items-center justify-center p-10 hover:border-primary/50 transition-colors duration-300 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-bl from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10">
                                            <Gamepad2 className="w-10 h-10 text-primary" />
                                        </div>
                                        <h3 className="text-2xl font-bold mb-2 relative z-10">Games</h3>
                                        <p className="text-sm text-gray-400 mb-6 relative z-10">Digital Keys & Bundles</p>
                                        <div className="flex items-center text-primary font-bold text-sm group-hover:gap-2 transition-all relative z-10">
                                            Browse Library <ArrowRight className="w-4 h-4 ml-1" />
                                        </div>
                                    </GlassCard>
                                </Link>
                            </motion.div>
                        </div>

                        {/* Bottom Row: Hot Deals (Centered) */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="w-full md:w-2/3 mx-auto"
                        >
                            <Link to="/catalog?category=deals" className="block group">
                                <GlassCard className="flex flex-col md:flex-row items-center justify-center p-8 hover:border-orange-500/50 transition-colors duration-300 relative overflow-hidden border-orange-500/20 gap-6">
                                    <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Badge */}
                                    <div className="absolute top-4 right-4 bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded shadow-lg animate-pulse">
                                        LIMITED TIME
                                    </div>

                                    <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative z-10 shrink-0">
                                        <Flame className="w-8 h-8 text-orange-500" />
                                    </div>

                                    <div className="text-center md:text-left">
                                        <h3 className="text-2xl font-bold mb-1 relative z-10 text-orange-500">Hot Deals</h3>
                                        <p className="text-sm text-gray-400 relative z-10">Exclusive Bundles & Limited Offers</p>
                                    </div>

                                    <div className="flex items-center text-orange-500 font-bold text-sm group-hover:gap-2 transition-all relative z-10 md:ml-auto">
                                        View Offers <ArrowRight className="w-4 h-4 ml-1" />
                                    </div>
                                </GlassCard>
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default Home;
