'use client';

import React from 'react';

export default function AnimatedBackground() {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -1, background: '#f8fafc' }}>
            {/* Subtle Static Ambient Orbs */}
            <div
                style={{
                    position: 'absolute', top: '-10%', right: '-5%', width: '1000px', height: '1000px',
                    background: 'radial-gradient(circle, rgba(99, 102, 241, 0.03) 0%, transparent 70%)',
                    borderRadius: '50%',
                    opacity: 0.6,
                }}
            />
            
            <div
                style={{
                    position: 'absolute', bottom: '-15%', left: '-5%', width: '900px', height: '900px',
                    background: 'radial-gradient(circle, rgba(168, 85, 247, 0.02) 0%, transparent 70%)',
                    borderRadius: '50%',
                    opacity: 0.5,
                }}
            />

            <div
                style={{
                    position: 'absolute', top: '20%', left: '25%', width: '1200px', height: '1200px',
                    background: 'radial-gradient(circle, rgba(56, 189, 248, 0.02) 0%, transparent 70%)',
                    borderRadius: '50%',
                    opacity: 0.4,
                }}
            />
        </div>
    );
}
