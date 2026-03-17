'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import AnimatedBackground from '../../components/AnimatedBackground';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { HiCheckCircle, HiClipboardCopy, HiExternalLink } from 'react-icons/hi';
import toast from 'react-hot-toast';

function SuccessContent() {
    const searchParams = useSearchParams();
    const appId = searchParams.get('appId') || 'QE2K26-XXXXXX';

    const copyId = () => {
        navigator.clipboard.writeText(appId);
        toast.success('Application ID copied!');
    };

    return (
        <div style={{
            position: 'relative', zIndex: 1,
            flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '100px 24px 60px', width: '100%',
        }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="glass-card"
                style={{
                    maxWidth: '560px', width: '100%', padding: '48px',
                    textAlign: 'center',
                }}
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                    style={{
                        width: '80px', height: '80px', borderRadius: '50%',
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 24px',
                        boxShadow: '0 8px 30px rgba(16, 185, 129, 0.3)',
                    }}
                >
                    <HiCheckCircle size={44} style={{ color: 'white' }} />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}
                >
                    Application Submitted! 🎉
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '32px', lineHeight: 1.6 }}
                >
                    Your internship application has been submitted successfully. We&apos;ll review it and get back to you soon!
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    style={{
                        padding: '20px',
                        background: 'rgba(99, 102, 241, 0.06)',
                        borderRadius: '14px',
                        border: '1px solid rgba(99, 102, 241, 0.12)',
                        marginBottom: '28px',
                    }}
                >
                    <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '8px', fontWeight: 500 }}>
                        Your Application ID
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                        <span style={{
                            fontSize: '1.3rem', fontWeight: 700, color: '#6366f1',
                            letterSpacing: '0.05em', fontFamily: 'monospace',
                        }}>
                            {appId}
                        </span>
                        <button
                            onClick={copyId}
                            style={{
                                background: 'rgba(99,102,241,0.1)', border: 'none',
                                borderRadius: '8px', padding: '6px', cursor: 'pointer',
                                display: 'flex', color: '#6366f1',
                            }}
                        >
                            <HiClipboardCopy size={18} />
                        </button>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '8px' }}>
                        Save this ID to track your application status
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}
                >
                    <Link href="/status" style={{ textDecoration: 'none' }}>
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="btn-primary"
                        >
                            <HiExternalLink /> Track Status
                        </motion.button>
                    </Link>
                    <Link href="/" style={{ textDecoration: 'none' }}>
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="btn-secondary"
                        >
                            Back to Home
                        </motion.button>
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <AnimatedBackground />
            <Navbar />
            <main style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Suspense fallback={
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <div className="loading-spinner" />
                    </div>
                }>
                    <SuccessContent />
                </Suspense>
            </main>
            <Footer />
        </div>
    );
}
