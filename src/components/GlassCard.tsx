'use client';

import React, { useState } from 'react';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    animate?: boolean;
    delay?: number;
}

export default function GlassCard({ children, className = '', style = {}, animate = true, delay = 0 }: GlassCardProps) {
    return (
        <div
            className={`glass-card ${className}`}
            style={{ padding: '32px', ...style }}
        >
            {children}
        </div>
    );
}
