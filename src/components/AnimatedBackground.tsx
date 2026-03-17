'use client';

import React from 'react';

export default function AnimatedBackground() {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -1 }}>
            {/* Soft Ambient Orbs */}
            <div className="animate-pulse-glow" style={{
                position: 'absolute', top: '-10%', right: '-10%', width: '800px', height: '800px',
                background: 'radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, transparent 60%)',
                borderRadius: '50%',
            }} />
            
            <div className="animate-pulse-glow" style={{
                position: 'absolute', bottom: '-20%', left: '-10%', width: '700px', height: '700px',
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 60%)',
                borderRadius: '50%',
                animationDelay: '2.5s'
            }} />

            <div className="animate-pulse-glow" style={{
                position: 'absolute', top: '30%', left: '30%', width: '900px', height: '900px',
                background: 'radial-gradient(circle, rgba(56, 189, 248, 0.08) 0%, transparent 60%)',
                borderRadius: '50%',
                animationDelay: '1s'
            }} />
        </div>
    );
}
