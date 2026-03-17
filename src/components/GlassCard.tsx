'use client';

import { motion } from 'framer-motion';
import React, { useState } from 'react';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    animate?: boolean;
    delay?: number;
}

export default function GlassCard({ children, className = '', style = {}, animate = true, delay = 0 }: GlassCardProps) {
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        setTilt({ x: -y / 20, y: x / 20 });
    };

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
    };
    if (!animate) {
        return (
            <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                animate={{ rotateX: tilt.x, rotateY: tilt.y }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`glass-card ${className}`}
                style={{ padding: '32px', ...style }}
            >
                {children}
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: tilt.x, rotateY: tilt.y }}
            transition={{ duration: 0.5, delay, ease: 'easeOut', type: 'spring', stiffness: 300, damping: 20 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`glass-card ${className}`}
            style={{ padding: '32px', ...style }}
        >
            {children}
        </motion.div>
    );
}
