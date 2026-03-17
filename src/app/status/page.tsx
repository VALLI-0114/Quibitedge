'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AnimatedBackground from '../../components/AnimatedBackground';
import GlassCard from '../../components/GlassCard';
import { getApplicationByAppId, getApplicationByEmail } from '../../lib/database';
import { HiSearch, HiCheckCircle, HiClock, HiXCircle, HiEye, HiDocumentText } from 'react-icons/hi';

interface ApplicationResult {
    app_id: string;
    full_name: string;
    email: string;
    status: string;
    created_at: string;
    submitted_at: string;
    internship_preferences: Array<{ domain: string }>;
    payments: Array<{ payment_status: string }>;
}

const statusConfig: Record<string, { icon: React.ReactNode; color: string; bg: string; label: string }> = {
    pending: { icon: <HiClock size={24} />, color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', label: 'Pending Review' },
    under_review: { icon: <HiEye size={24} />, color: '#6366f1', bg: 'rgba(99,102,241,0.08)', label: 'Under Review' },
    approved: { icon: <HiCheckCircle size={24} />, color: '#10b981', bg: 'rgba(16,185,129,0.08)', label: 'Approved' },
    rejected: { icon: <HiXCircle size={24} />, color: '#ef4444', bg: 'rgba(239,68,68,0.08)', label: 'Rejected' },
};

export default function StatusPage() {
    const [searchType, setSearchType] = useState<'appId' | 'email'>('appId');
    const [searchValue, setSearchValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<ApplicationResult | null>(null);
    const [notFound, setNotFound] = useState(false);

    const handleSearch = async () => {
        if (!searchValue.trim()) {
            toast.error('Please enter a search value');
            return;
        }

        setIsLoading(true);
        setNotFound(false);
        setResult(null);

        try {
            let data;
            if (searchType === 'appId') {
                data = await getApplicationByAppId(searchValue.trim());
                setResult(data as unknown as ApplicationResult);
            } else {
                data = await getApplicationByEmail(searchValue.trim());
                if (data && data.length > 0) {
                    setResult(data[0] as unknown as ApplicationResult);
                } else {
                    setNotFound(true);
                }
            }
        } catch {
            setNotFound(true);
        } finally {
            setIsLoading(false);
        }
    };

    const status = result ? statusConfig[result.status] || statusConfig.pending : null;

    return (
        <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <AnimatedBackground />
            <Navbar />

            <div style={{
                position: 'relative', zIndex: 1,
                maxWidth: '700px', margin: '0 auto',
                padding: '120px 24px 60px',
                flexGrow: 1,
                width: '100%',
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ textAlign: 'center', marginBottom: '32px' }}
                >
                    <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>
                        Track Your Application
                    </h1>
                    <p style={{ color: '#64748b', fontSize: '1rem' }}>
                        Enter your Application ID or email to check status
                    </p>
                </motion.div>

                <GlassCard>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                        {(['appId', 'email'] as const).map((type) => (
                            <button
                                key={type}
                                onClick={() => { setSearchType(type); setResult(null); setNotFound(false); }}
                                style={{
                                    padding: '8px 20px', borderRadius: '10px', border: 'none',
                                    background: searchType === type ? 'linear-gradient(135deg, #6366f1, #a855f7)' : 'rgba(241,245,249,0.8)',
                                    color: searchType === type ? 'white' : '#64748b',
                                    fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer',
                                    transition: 'all 0.2s',
                                }}
                            >
                                {type === 'appId' ? 'Application ID' : 'Email Address'}
                            </button>
                        ))}
                    </div>

                    <div style={{ display: 'flex', gap: '12px' }}>
                        <input
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            placeholder={searchType === 'appId' ? 'QE2K26-XXXXX-XXXX' : 'your.email@example.com'}
                            className="glass-input"
                            style={{ flex: 1 }}
                        />
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={handleSearch}
                            disabled={isLoading}
                            className="btn-primary"
                            style={{ padding: '12px 24px', flexShrink: 0 }}
                        >
                            {isLoading ? <div className="loading-spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }} /> : <HiSearch size={20} />}
                        </motion.button>
                    </div>
                </GlassCard>

                {/* Results */}
                {result && status && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '24px' }}>
                        <GlassCard>
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: '16px',
                                padding: '20px', borderRadius: '14px',
                                background: status.bg, marginBottom: '24px',
                            }}>
                                <div style={{ color: status.color }}>{status.icon}</div>
                                <div>
                                    <p style={{ fontWeight: 700, color: '#0f172a', fontSize: '1.1rem' }}>{status.label}</p>
                                    <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
                                        Application ID: <span style={{ fontFamily: 'monospace', color: '#6366f1' }}>{result.app_id}</span>
                                    </p>
                                </div>
                            </div>

                            <div style={{
                                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                                gap: '16px',
                            }}>
                                {[
                                    { label: 'Applicant', value: result.full_name },
                                    { label: 'Email', value: result.email },
                                    { label: 'Domain', value: result.internship_preferences?.[0]?.domain || 'N/A' },
                                    { label: 'Applied On', value: result.submitted_at ? new Date(result.submitted_at).toLocaleDateString() : 'Draft' },
                                    { label: 'Payment', value: result.payments?.[0]?.payment_status || 'N/A' },
                                ].map((item, i) => (
                                    <div key={i} style={{
                                        padding: '12px 16px', borderRadius: '10px',
                                        background: 'rgba(248,250,252,0.8)',
                                    }}>
                                        <p style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 500, marginBottom: '4px' }}>{item.label}</p>
                                        <p style={{ fontSize: '0.9rem', color: '#1e293b', fontWeight: 500 }}>{item.value}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Timeline */}
                            <div style={{ marginTop: '24px' }}>
                                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#334155', marginBottom: '16px' }}>
                                    <HiDocumentText style={{ display: 'inline', marginRight: '6px' }} /> Application Timeline
                                </h4>
                                {[
                                    { label: 'Application Created', date: result.created_at, done: true },
                                    { label: 'Application Submitted', date: result.submitted_at, done: !!result.submitted_at },
                                    { label: 'Under Review', date: null, done: ['under_review', 'approved', 'rejected'].includes(result.status) },
                                    { label: 'Decision', date: null, done: ['approved', 'rejected'].includes(result.status) },
                                ].map((step, i) => (
                                    <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                                        <div style={{
                                            width: '24px', height: '24px', borderRadius: '50%', flexShrink: 0,
                                            background: step.done ? '#10b981' : '#e2e8f0',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        }}>
                                            {step.done && <HiCheckCircle size={14} style={{ color: 'white' }} />}
                                        </div>
                                        <div>
                                            <p style={{ fontSize: '0.85rem', fontWeight: step.done ? 500 : 400, color: step.done ? '#1e293b' : '#94a3b8' }}>
                                                {step.label}
                                            </p>
                                            {step.date && (
                                                <p style={{ fontSize: '0.72rem', color: '#64748b' }}>
                                                    {new Date(step.date).toLocaleString()}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>
                    </motion.div>
                )}

                {notFound && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '24px' }}>
                        <GlassCard style={{ textAlign: 'center', padding: '40px' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#0f172a', marginBottom: '8px' }}>
                                Application Not Found
                            </h3>
                            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
                                Please check your {searchType === 'appId' ? 'Application ID' : 'email address'} and try again.
                            </p>
                        </GlassCard>
                    </motion.div>
                )}
            </div>

            <Footer />
        </div>
    );
}
