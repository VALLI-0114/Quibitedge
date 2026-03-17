'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Internships', href: '/internship' },
    { name: 'Register', href: '/register' },
    { name: 'Track Status', href: '/status' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.05)',
            }}
        >
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
                    {/* Logo */}
                    <Link href="/" style={{ textDecoration: 'none' }}>
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                        >
                            <img 
                                src="https://qubitedge.in/wp-content/uploads/2025/07/logo-shorter.png" 
                                alt="QubitEdge Logo"
                                style={{ height: '32px', width: 'auto', objectFit: 'contain', marginBottom: '4px' }}
                            />
                            <div>
                                <div style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 500, letterSpacing: '0.05em' }}>
                                    SUMMER INTERNSHIP 2K26
                                </div>
                            </div>
                        </motion.div>
                    </Link>

                    {/* Desktop Links */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                        className="hidden md:flex"
                    >
                        {navLinks.map((link) => (
                            <Link key={link.name} href={link.href} style={{ textDecoration: 'none' }}>
                                <motion.span
                                    whileHover={{ y: -1 }}
                                    style={{
                                        padding: '8px 18px',
                                        borderRadius: '10px',
                                        fontSize: '0.9rem',
                                        fontWeight: 500,
                                        color: '#475569',
                                        transition: 'all 0.2s',
                                        display: 'block',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color = '#6366f1';
                                        e.currentTarget.style.background = 'rgba(99,102,241,0.06)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = '#475569';
                                        e.currentTarget.style.background = 'transparent';
                                    }}
                                >
                                    {link.name}
                                </motion.span>
                            </Link>
                        ))}
                        <Link href="/register" style={{ textDecoration: 'none' }}>
                            <motion.button
                                whileHover={{ scale: 1.03, y: -1 }}
                                whileTap={{ scale: 0.97 }}
                                className="btn-primary"
                                style={{ padding: '10px 22px', fontSize: '0.9rem', marginLeft: '8px' }}
                            >
                                Apply Now
                            </motion.button>
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden"
                        onClick={() => setIsOpen(!isOpen)}
                        style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            fontSize: '1.5rem', color: '#475569', padding: '8px',
                        }}
                    >
                        {isOpen ? <HiX /> : <HiMenu />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden"
                        style={{ paddingBottom: '16px' }}
                    >
                        {navLinks.map((link) => (
                            <Link key={link.name} href={link.href} style={{ textDecoration: 'none' }}>
                                <div
                                    onClick={() => setIsOpen(false)}
                                    style={{
                                        padding: '12px 16px',
                                        borderRadius: '10px',
                                        fontSize: '0.95rem',
                                        fontWeight: 500,
                                        color: '#475569',
                                    }}
                                >
                                    {link.name}
                                </div>
                            </Link>
                        ))}
                        <Link href="/register" style={{ textDecoration: 'none' }}>
                            <button className="btn-primary" style={{ width: '100%', marginTop: '8px' }}>
                                Apply Now
                            </button>
                        </Link>
                    </motion.div>
                )}
            </div>
        </motion.nav>
    );
}
