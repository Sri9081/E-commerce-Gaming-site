import React from 'react';
import { cn } from '../../lib/utils';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface GlassButtonProps extends HTMLMotionProps<"button"> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

const GlassButton: React.FC<GlassButtonProps> = ({
    children,
    className,
    variant = 'primary',
    size = 'md',
    ...props
}) => {
    const variants = {
        primary: "bg-primary hover:bg-primary-hover text-white border-transparent shadow-[0_0_15px_rgba(139,92,246,0.5)] hover:shadow-[0_0_25px_rgba(139,92,246,0.6)]",
        secondary: "bg-secondary hover:bg-secondary-hover text-white border-transparent shadow-[0_0_15px_rgba(6,182,212,0.5)]",
        outline: "bg-transparent border-glass-border hover:bg-white/10 text-white",
        ghost: "bg-transparent hover:bg-white/5 text-gray-300 hover:text-white border-transparent"
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-6 py-2.5 text-base",
        lg: "px-8 py-3.5 text-lg"
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                "relative inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 border backdrop-blur-sm",
                variants[variant],
                sizes[size],
                className
            )}
            {...props as any}
        >
            {children}
        </motion.button>
    );
};

export default GlassButton;
