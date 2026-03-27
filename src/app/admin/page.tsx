'use client';

import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import GlassCard from '../../components/GlassCard';
import {
    getAllApplications, updateApplicationStatus, verifyPayment,
    getApplicationStats, updateApplication, deleteApplication,
} from '../../lib/database';
import {
    HiUsers, HiClock, HiCheckCircle, HiXCircle, HiSearch,
    HiFilter, HiDownload, HiEye, HiShieldCheck, HiChartBar,
    HiDocumentDownload, HiLogin, HiCurrencyRupee, HiPencil, HiTrash,
} from 'react-icons/hi';

interface Application {
    id: string;
    app_id: string;
    full_name: string;
    email: string;
    phone: string;
    status: string;
    created_at: string;
    submitted_at: string;
    current_step: number;
    internship_preferences: Array<{ domain: string; internship_mode: string }>;
    academic_details: Array<{ college_name: string; degree: string; branch: string }>;
    payments: Array<{ payment_status: string; transaction_id: string; fee_amount: number }>;
    projects: Array<{ resume_url: string }>;
}

interface Stats {
    total: number;
    pending: number;
    underReview: number;
    approved: number;
    rejected: number;
    domainDistribution: Record<string, number>;
    paymentStats: { pending: number; verified: number; rejected: number };
}

const ADMIN_EMAIL = 'quibitedge@gmail.com';
const ADMIN_PASSWORD = 'Quibitedge@23';

const domains = [
    'all', 'Cyber Security', 'Artificial Intelligence', 'Machine Learning',
    'Data Science', 'Web Development', 'Full Stack Development',
    'Python Development', 'Java Development',
];

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [applications, setApplications] = useState<Application[]>([]);
    const [stats, setStats] = useState<Stats | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [domainFilter, setDomainFilter] = useState('all');
    const [selectedApp, setSelectedApp] = useState<Application | null>(null);
    const [editingApp, setEditingApp] = useState<Application | null>(null);
    const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'overview' | 'applications' | 'payments'>('overview');

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const [apps, statsData] = await Promise.all([
                getAllApplications({ status: statusFilter, domain: domainFilter, search: searchQuery }),
                getApplicationStats(),
            ]);
            setApplications((apps || []) as unknown as Application[]);
            setStats(statsData as Stats);
        } catch (err) {
            console.error('Fetch error:', err);
            // Demo data if Supabase is not configured
            setStats({
                total: 0, pending: 0, underReview: 0, approved: 0, rejected: 0,
                domainDistribution: {}, paymentStats: { pending: 0, verified: 0, rejected: 0 },
            });
        } finally {
            setIsLoading(false);
        }
    }, [statusFilter, domainFilter, searchQuery]);

    useEffect(() => {
        if (isAuthenticated) fetchData();
    }, [isAuthenticated, fetchData]);

    const handleLogin = () => {
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            toast.success('Welcome, Admin!');
        } else {
            toast.error('Invalid email or password');
        }
    };

    const handleStatusChange = async (appId: string, newStatus: string) => {
        try {
            await updateApplicationStatus(appId, newStatus);
            toast.success(`Status updated to ${newStatus}`);
            fetchData();
        } catch {
            toast.error('Failed to update status');
        }
    };

    const handlePaymentVerification = async (appId: string, status: string) => {
        try {
            await verifyPayment(appId, status);
            toast.success(`Payment ${status}`);
            fetchData();
        } catch {
            toast.error('Failed to update payment');
        }
    };
    
    const handleDeleteApplication = async (id: string) => {
        console.log('AdminPage: Requesting deletion of application ID:', id);
        try {
            await deleteApplication(id);
            console.log('AdminPage: Deletion successful for ID:', id);
            toast.success('Application deleted successfully');
            setConfirmDelete(null);
            if (selectedApp?.id === id) setSelectedApp(null);
            fetchData();
        } catch (error) {
            console.error('AdminPage: Deletion failed for ID:', id, error);
            toast.error('Failed to delete application');
        }
    };
    
    const handleUpdateApplication = async (id: string, updatedData: any) => {
        try {
            await updateApplication(id, updatedData);
            toast.success('Application updated successfully');
            setEditingApp(null);
            fetchData();
        } catch {
            toast.error('Failed to update application');
        }
    };

    const exportCSV = () => {
        if (!applications.length) {
            toast.error('No data to export');
            return;
        }
        const headers = ['App ID', 'Name', 'Email', 'Phone', 'Status', 'Domain', 'College', 'Applied Date'];
        const rows = applications.map(app => [
            app.app_id,
            app.full_name,
            app.email,
            app.phone,
            app.status,
            app.internship_preferences?.[0]?.domain || 'N/A',
            app.academic_details?.[0]?.college_name || 'N/A',
            app.submitted_at ? new Date(app.submitted_at).toLocaleDateString() : 'Draft',
        ]);
        const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `applications_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success('CSV exported!');
    };

    if (!isAuthenticated) {
        return (
            <div style={{ position: 'relative', minHeight: '100vh', background: '#f8fafc' }}>
                <div style={{
                    position: 'relative', zIndex: 1,
                    minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '24px',
                }}>
                    <div
                        className="glass-card"
                        style={{ maxWidth: '420px', width: '100%', padding: '40px' }}
                    >
                        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                            <div style={{
                                width: '60px', height: '60px', borderRadius: '16px',
                                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                margin: '0 auto 16px',
                            }}>
                                <HiShieldCheck size={30} style={{ color: 'white' }} />
                            </div>
                            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0f172a' }}>Admin Dashboard</h2>
                            <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '8px' }}>
                                Enter admin credentials to continue
                            </p>
                        </div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email address"
                            className="glass-input"
                            style={{ marginBottom: '12px' }}
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                            placeholder="Password"
                            className="glass-input"
                            style={{ marginBottom: '16px' }}
                        />
                        <button
                            onClick={handleLogin}
                            className="btn-primary"
                            style={{ width: '100%' }}
                        >
                            <HiLogin size={18} /> Sign In
                        </button>
                        <p style={{ fontSize: '0.75rem', color: '#64748b', textAlign: 'center', marginTop: '16px' }}>
                            Restricted area. Authorized personnel only.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    const statCards = [
        { label: 'Total Applications', value: stats?.total || 0, icon: <HiUsers size={22} />, color: '#6366f1', bg: 'rgba(99,102,241,0.08)' },
        { label: 'Pending', value: stats?.pending || 0, icon: <HiClock size={22} />, color: '#f59e0b', bg: 'rgba(245,158,11,0.08)' },
        { label: 'Under Review', value: stats?.underReview || 0, icon: <HiEye size={22} />, color: '#3b82f6', bg: 'rgba(59,130,246,0.08)' },
        { label: 'Approved', value: stats?.approved || 0, icon: <HiCheckCircle size={22} />, color: '#10b981', bg: 'rgba(16,185,129,0.08)' },
        { label: 'Rejected', value: stats?.rejected || 0, icon: <HiXCircle size={22} />, color: '#ef4444', bg: 'rgba(239,68,68,0.08)' },
    ];

    return (
        <div style={{ position: 'relative', minHeight: '100vh', background: '#f1f5f9' }}>
            <div style={{
                position: 'relative', zIndex: 1,
                maxWidth: '1400px', margin: '0 auto',
                padding: '24px',
            }}>
                {/* Header */}
                <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    marginBottom: '32px', flexWrap: 'wrap', gap: '16px',
                }}>
                    <div>
                        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a' }}>
                            Admin Dashboard
                        </h1>
                        <p style={{ color: '#64748b', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            QubitEdge Summer Internship 2K26
                            <span style={{ 
                                padding: '2px 8px', borderRadius: '4px', background: '#ecfdf5', 
                                color: '#10b981', fontSize: '0.7rem', fontWeight: 600,
                                border: '1px solid #10b981'
                            }}>
                                ● Database: Connected
                            </span>
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button
                            onClick={exportCSV}
                            className="btn-secondary"
                            style={{ fontSize: '0.85rem', padding: '10px 18px' }}
                        >
                            <HiDownload size={16} /> Export CSV
                        </button>
                        <button
                            onClick={fetchData}
                            className="btn-primary"
                            style={{ fontSize: '0.85rem', padding: '10px 18px' }}
                        >
                            Refresh
                        </button>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div style={{ display: 'flex', gap: '4px', marginBottom: '24px', background: 'rgba(241,245,249,0.8)', padding: '4px', borderRadius: '12px', width: 'fit-content' }}>
                    {(['overview', 'applications', 'payments'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                padding: '10px 20px', borderRadius: '10px', border: 'none',
                                background: activeTab === tab ? 'white' : 'transparent',
                                color: activeTab === tab ? '#6366f1' : '#64748b',
                                fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer',
                                boxShadow: activeTab === tab ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                                transition: 'all 0.2s', textTransform: 'capitalize',
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <>
                        {/* Stat Cards */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '16px', marginBottom: '28px',
                        }}>
                            {statCards.map((card, i) => (
                                <div
                                    key={i}
                                    className="glass-card"
                                    style={{ padding: '20px' }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div>
                                            <p style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500, marginBottom: '4px' }}>{card.label}</p>
                                            <p style={{ fontSize: '1.8rem', fontWeight: 800, color: card.color }}>{card.value}</p>
                                        </div>
                                        <div style={{
                                            width: '44px', height: '44px', borderRadius: '12px',
                                            background: card.bg, display: 'flex', alignItems: 'center',
                                            justifyContent: 'center', color: card.color,
                                        }}>
                                            {card.icon}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Domain Distribution */}
                        <GlassCard>
                            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#0f172a', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <HiChartBar style={{ color: '#6366f1' }} /> Domain Distribution
                            </h3>
                            {stats && Object.keys(stats.domainDistribution).length > 0 ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {Object.entries(stats.domainDistribution).sort((a, b) => b[1] - a[1]).map(([domain, count]) => (
                                        <div key={domain}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                                <span style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 500 }}>{domain}</span>
                                                <span style={{ fontSize: '0.85rem', color: '#6366f1', fontWeight: 600 }}>{count}</span>
                                            </div>
                                            <div style={{ height: '8px', background: 'rgba(241,245,249,0.8)', borderRadius: '100px', overflow: 'hidden' }}>
                                                <div
                                                    style={{ 
                                                        height: '100%', 
                                                        width: `${(count / stats.total) * 100}%`,
                                                        background: 'linear-gradient(90deg, #6366f1, #a855f7)', 
                                                        borderRadius: '100px' 
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p style={{ color: '#64748b', textAlign: 'center', padding: '20px' }}>
                                    No applications yet. Data will appear here once students register.
                                </p>
                            )}
                        </GlassCard>

                        {/* Payment Stats */}
                        <GlassCard style={{ marginTop: '20px' }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#0f172a', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <HiCurrencyRupee style={{ color: '#6366f1' }} /> Payment Verification Status
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                                {[
                                    { label: 'Pending', value: stats?.paymentStats.pending || 0, color: '#f59e0b' },
                                    { label: 'Verified', value: stats?.paymentStats.verified || 0, color: '#10b981' },
                                    { label: 'Rejected', value: stats?.paymentStats.rejected || 0, color: '#ef4444' },
                                ].map((item, i) => (
                                    <div key={i} style={{
                                        textAlign: 'center',
                                        padding: '16px',
                                        borderRadius: '12px',
                                        background: `${item.color}08`,
                                    }}>
                                        <p style={{ fontSize: '1.6rem', fontWeight: 800, color: item.color }}>{item.value}</p>
                                        <p style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>{item.label}</p>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>
                    </>
                )}

                {/* Applications Tab */}
                {activeTab === 'applications' && (
                    <>
                        {/* Filters */}
                        <GlassCard animate={false} style={{ marginBottom: '20px', padding: '20px' }}>
                            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                                <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
                                    <HiSearch size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                                    <input
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search by name, email, or ID..."
                                        className="glass-input"
                                        style={{ paddingLeft: '40px' }}
                                    />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <HiFilter size={16} style={{ color: '#64748b' }} />
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="glass-input"
                                        style={{ width: 'auto', minWidth: '140px' }}
                                    >
                                        <option value="all">All Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="under_review">Under Review</option>
                                        <option value="approved">Approved</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                    <select
                                        value={domainFilter}
                                        onChange={(e) => setDomainFilter(e.target.value)}
                                        className="glass-input"
                                        style={{ width: 'auto', minWidth: '150px' }}
                                    >
                                        {domains.map(d => <option key={d} value={d}>{d === 'all' ? 'All Domains' : d}</option>)}
                                    </select>
                                </div>
                                <button
                                    onClick={fetchData}
                                    className="btn-primary"
                                    style={{ fontSize: '0.85rem', padding: '10px 18px' }}
                                >
                                    <HiSearch size={16} /> Search
                                </button>
                            </div>
                        </GlassCard>

                        {/* Table */}
                        <GlassCard animate={false} style={{ padding: '0', overflow: 'hidden' }}>
                            {isLoading ? (
                                <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
                                    <div className="loading-spinner" />
                                </div>
                            ) : applications.length > 0 ? (
                                <div style={{ overflowX: 'auto', display: 'flex', flexDirection: 'column', gap: '32px', padding: '24px' }}>
                                    {['pending', 'under_review', 'approved', 'rejected'].map(statusGroup => {
                                        const groupApps = applications
                                            .filter(app => app.status === statusGroup)
                                            .sort((a, b) => new Date(b.submitted_at || b.created_at || 0).getTime() - new Date(a.submitted_at || a.created_at || 0).getTime());
                                        
                                        if (groupApps.length === 0) return null;

                                        return (
                                            <div key={statusGroup}>
                                                <h4 style={{ 
                                                    fontSize: '1.05rem', fontWeight: 700, color: '#1e293b', marginBottom: '12px',
                                                    textTransform: 'capitalize', display: 'flex', alignItems: 'center', gap: '8px'
                                                }}>
                                                    {statusGroup.replace('_', ' ')} Applications
                                                    <span style={{ 
                                                        background: 'rgba(99,102,241,0.1)', color: '#6366f1', 
                                                        padding: '2px 8px', borderRadius: '10px', fontSize: '0.75rem' 
                                                    }}>
                                                        {groupApps.length}
                                                    </span>
                                                </h4>
                                                <table className="admin-table">
                                                    <thead>
                                                        <tr>
                                                            <th>App ID</th>
                                                            <th>Name</th>
                                                            <th>Email</th>
                                                            <th>Domain</th>
                                                            <th>Status</th>
                                                            <th>Payment</th>
                                                            <th>Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {groupApps.map((app) => (
                                                            <tr key={app.id}>
                                                                <td style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#6366f1' }}>{app.app_id}</td>
                                                                <td style={{ fontWeight: 500 }}>{app.full_name}</td>
                                                                <td>{app.email}</td>
                                                                <td>{app.internship_preferences?.[0]?.domain || 'N/A'}</td>
                                                                <td>
                                                                    <span className={`badge badge-${app.status}`}>{app.status.replace('_', ' ')}</span>
                                                                </td>
                                                                <td>
                                                                    <span className={`badge badge-${app.payments?.[0]?.payment_status || 'pending'}`}>
                                                                        {app.payments?.[0]?.payment_status || 'N/A'}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <div style={{ display: 'flex', gap: '6px' }}>
                                                                        <button
                                                                            onClick={() => setSelectedApp(app)}
                                                                            title="View Details"
                                                                            style={{
                                                                                padding: '5px 10px', borderRadius: '6px',
                                                                                background: 'rgba(99,102,241,0.08)', border: 'none',
                                                                                color: '#6366f1', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600,
                                                                                display: 'flex', alignItems: 'center', gap: '4px'
                                                                            }}
                                                                        >
                                                                            <HiEye size={14} /> View
                                                                        </button>
                                                                        <button
                                                                            onClick={() => setEditingApp(app)}
                                                                            title="Edit Application"
                                                                            style={{
                                                                                padding: '5px 10px', borderRadius: '6px',
                                                                                background: 'rgba(59,130,246,0.08)', border: 'none',
                                                                                color: '#3b82f6', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600,
                                                                                display: 'flex', alignItems: 'center', gap: '4px'
                                                                            }}
                                                                        >
                                                                            <HiPencil size={14} /> Edit
                                                                        </button>
                                                                        <button
                                                                            onClick={() => setConfirmDelete(app.id)}
                                                                            title="Delete Application"
                                                                            style={{
                                                                                padding: '5px 10px', borderRadius: '6px',
                                                                                background: 'rgba(239,68,68,0.08)', border: 'none',
                                                                                color: '#ef4444', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600,
                                                                                display: 'flex', alignItems: 'center', gap: '4px'
                                                                            }}
                                                                        >
                                                                            <HiTrash size={14} /> Delete
                                                                        </button>
                                                                        {app.status !== 'approved' && (
                                                                            <button
                                                                                onClick={() => handleStatusChange(app.id, 'approved')}
                                                                                style={{
                                                                                    padding: '5px 10px', borderRadius: '6px',
                                                                                    background: 'rgba(16,185,129,0.08)', border: 'none',
                                                                                    color: '#10b981', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600,
                                                                                }}
                                                                            >
                                                                                Approve
                                                                            </button>
                                                                        )}
                                                                        {app.status !== 'rejected' && (
                                                                            <button
                                                                                onClick={() => handleStatusChange(app.id, 'rejected')}
                                                                                style={{
                                                                                    padding: '5px 10px', borderRadius: '6px',
                                                                                    background: 'rgba(239,68,68,0.08)', border: 'none',
                                                                                    color: '#ef4444', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600,
                                                                                }}
                                                                            >
                                                                                Reject
                                                                            </button>
                                                                        )}
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '60px' }}>
                                    <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📋</div>
                                    <h3 style={{ color: '#475569', fontWeight: 600, marginBottom: '8px' }}>No Applications Found</h3>
                                    <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
                                        Applications will appear here once students register. Configure Supabase to see real data.
                                    </p>
                                </div>
                            )}
                        </GlassCard>
                    </>
                )}

                {/* Payments Tab */}
                {activeTab === 'payments' && (
                    <GlassCard>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#0f172a', marginBottom: '20px' }}>
                            Payment Verification
                        </h3>
                        {applications.filter(a => a.payments?.[0]).length > 0 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {applications.filter(a => a.payments?.[0]).map((app) => {
                                    const payment = app.payments[0];
                                    return (
                                        <div key={app.id} style={{
                                            padding: '16px', borderRadius: '12px',
                                            background: 'rgba(248,250,252,0.8)',
                                            border: '1px solid rgba(241,245,249,0.8)',
                                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                            flexWrap: 'wrap', gap: '12px',
                                        }}>
                                            <div>
                                                <p style={{ fontWeight: 600, color: '#1e293b' }}>{app.full_name}</p>
                                                <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
                                                    TXN: {payment.transaction_id || 'N/A'} • ₹{payment.fee_amount || '999'}
                                                </p>
                                            </div>
                                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                                <button
                                                    onClick={() => setEditingApp(app)}
                                                    title="Edit"
                                                    style={{ background: 'none', border: 'none', color: '#6366f1', cursor: 'pointer', padding: '4px' }}
                                                >
                                                    <HiPencil size={18} />
                                                </button>
                                                <button
                                                    onClick={() => setConfirmDelete(app.id)}
                                                    title="Delete"
                                                    style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}
                                                >
                                                    <HiTrash size={18} />
                                                </button>
                                                <span className={`badge badge-${payment.payment_status}`}>
                                                    {payment.payment_status}
                                                </span>
                                                {payment.payment_status === 'pending' && (
                                                    <>
                                                        <button
                                                            onClick={() => handlePaymentVerification(app.id, 'verified')}
                                                            style={{
                                                                padding: '6px 14px', borderRadius: '8px',
                                                                background: '#10b981', border: 'none',
                                                                color: 'white', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600,
                                                            }}
                                                        >
                                                            ✓ Verify
                                                        </button>
                                                        <button
                                                            onClick={() => handlePaymentVerification(app.id, 'rejected')}
                                                            style={{
                                                                padding: '6px 14px', borderRadius: '8px',
                                                                background: '#ef4444', border: 'none',
                                                                color: 'white', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600,
                                                            }}
                                                        >
                                                            ✗ Reject
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <p style={{ color: '#64748b', textAlign: 'center', padding: '40px' }}>
                                No payment records to show.
                            </p>
                        )}
                    </GlassCard>
                )}

                {/* Application Detail Modal */}
                {selectedApp && (
                    <div
                        onClick={() => setSelectedApp(null)}
                        style={{
                            position: 'fixed', inset: 0, zIndex: 2000,
                            background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            padding: '24px',
                        }}
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="glass-card"
                            style={{
                                maxWidth: '600px', width: '100%', padding: '32px',
                                maxHeight: '80vh', overflowY: 'auto',
                                background: 'rgba(255,255,255,0.95)',
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>
                                    Application Details
                                </h3>
                                <button
                                    onClick={() => setSelectedApp(null)}
                                    style={{
                                        background: 'rgba(239,68,68,0.08)', border: 'none',
                                        borderRadius: '8px', padding: '6px 12px', cursor: 'pointer',
                                        color: '#ef4444', fontWeight: 600, fontSize: '0.8rem',
                                    }}
                                >
                                    ✕ Close
                                </button>
                            </div>

                            <div style={{ display: 'grid', gap: '12px' }}>
                                {[
                                    ['App ID', selectedApp.app_id],
                                    ['Name', selectedApp.full_name],
                                    ['Email', selectedApp.email],
                                    ['Phone', selectedApp.phone],
                                    ['Status', selectedApp.status],
                                    ['Domain', selectedApp.internship_preferences?.[0]?.domain],
                                    ['Mode', selectedApp.internship_preferences?.[0]?.internship_mode],
                                    ['College', selectedApp.academic_details?.[0]?.college_name],
                                    ['Degree', `${selectedApp.academic_details?.[0]?.degree || ''} - ${selectedApp.academic_details?.[0]?.branch || ''}`],
                                    ['Payment Status', selectedApp.payments?.[0]?.payment_status],
                                    ['Transaction ID', selectedApp.payments?.[0]?.transaction_id],
                                    ['Applied', selectedApp.submitted_at ? new Date(selectedApp.submitted_at).toLocaleString() : 'Draft'],
                                ].filter(([, v]) => v).map(([label, value], i) => (
                                    <div key={i} style={{ display: 'flex', gap: '8px' }}>
                                        <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 500, minWidth: '120px' }}>{label}:</span>
                                        <span style={{
                                            fontSize: '0.85rem', fontWeight: 500, color: '#1e293b',
                                            fontFamily: label === 'App ID' || label === 'Transaction ID' ? 'monospace' : 'inherit',
                                        }}>
                                            {value as string}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                {selectedApp.projects?.[0]?.resume_url ? (
                                    <a
                                        href={selectedApp.projects[0].resume_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            padding: '8px 24px', borderRadius: '8px',
                                            background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)',
                                            color: '#0284c7', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600,
                                            display: 'flex', alignItems: 'center', gap: '6px', width: 'fit-content',
                                        }}
                                    >
                                        <HiDocumentDownload size={18} /> View Student Resume
                                    </a>
                                ) : (
                                    <div
                                        style={{
                                            padding: '8px 24px', borderRadius: '8px',
                                            background: 'rgba(100, 116, 139, 0.1)', border: '1px solid rgba(100, 116, 139, 0.2)',
                                            color: '#94a3b8', fontSize: '0.9rem', fontWeight: 600,
                                            display: 'flex', alignItems: 'center', gap: '6px', width: 'fit-content',
                                            cursor: 'not-allowed'
                                        }}
                                        title="No resume was uploaded for this application"
                                    >
                                        <HiDocumentDownload size={18} /> Resume Not Provided
                                    </div>
                                )}
                            </div>

                            <div style={{ display: 'flex', gap: '8px', marginTop: '24px' }}>
                                <button
                                    onClick={() => { handleStatusChange(selectedApp.id, 'approved'); setSelectedApp(null); }}
                                    className="btn-primary"
                                    style={{ flex: 1, background: 'linear-gradient(135deg, #10b981, #059669)' }}
                                >
                                    <HiCheckCircle /> Approve
                                </button>
                                <button
                                    onClick={() => { handleStatusChange(selectedApp.id, 'rejected'); setSelectedApp(null); }}
                                    className="btn-primary"
                                    style={{ flex: 1, background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}
                                >
                                    <HiXCircle /> Reject
                                </button>
                                <button
                                    onClick={() => setConfirmDelete(selectedApp.id)}
                                    className="btn-secondary"
                                    style={{ flex: 1, color: '#ef4444', borderColor: '#ef4444' }}
                                >
                                    <HiTrash /> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Edit Application Modal */}
                {editingApp && (
                    <div
                        onClick={() => setEditingApp(null)}
                        style={{
                            position: 'fixed', inset: 0, zIndex: 2000,
                            background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            padding: '24px',
                        }}
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="glass-card"
                            style={{
                                maxWidth: '600px', width: '100%', padding: '32px',
                                maxHeight: '80vh', overflowY: 'auto',
                                background: 'rgba(255,255,255,0.95)',
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a' }}>
                                    Edit Application
                                </h3>
                                <button
                                    onClick={() => setEditingApp(null)}
                                    style={{
                                        background: 'rgba(239,68,68,0.08)', border: 'none',
                                        borderRadius: '8px', padding: '6px 12px', cursor: 'pointer',
                                        color: '#ef4444', fontWeight: 600, fontSize: '0.8rem',
                                    }}
                                >
                                    ✕ Cancel
                                </button>
                            </div>

                            <div style={{ display: 'grid', gap: '16px' }}>
                                <div>
                                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>Full Name</label>
                                    <input
                                        type="text"
                                        value={editingApp.full_name}
                                        onChange={(e) => setEditingApp({ ...editingApp, full_name: e.target.value })}
                                        className="glass-input"
                                    />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>Email</label>
                                    <input
                                        type="email"
                                        value={editingApp.email}
                                        onChange={(e) => setEditingApp({ ...editingApp, email: e.target.value })}
                                        className="glass-input"
                                    />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>Phone</label>
                                    <input
                                        type="text"
                                        value={editingApp.phone}
                                        onChange={(e) => setEditingApp({ ...editingApp, phone: e.target.value })}
                                        className="glass-input"
                                    />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>Status</label>
                                    <select
                                        value={editingApp.status}
                                        onChange={(e) => setEditingApp({ ...editingApp, status: e.target.value })}
                                        className="glass-input"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="under_review">Under Review</option>
                                        <option value="approved">Approved</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
                                <button
                                    onClick={() => handleUpdateApplication(editingApp.id, {
                                        full_name: editingApp.full_name,
                                        email: editingApp.email,
                                        phone: editingApp.phone,
                                        status: editingApp.status,
                                    })}
                                    className="btn-primary"
                                    style={{ flex: 1 }}
                                >
                                    Save Changes
                                </button>
                                <button
                                    onClick={() => setEditingApp(null)}
                                    className="btn-secondary"
                                    style={{ flex: 1 }}
                                >
                                    Discard
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {confirmDelete && (
                    <div
                        onClick={() => setConfirmDelete(null)}
                        style={{
                            position: 'fixed', inset: 0, zIndex: 3000,
                            background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            padding: '24px',
                        }}
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="glass-card"
                            style={{
                                maxWidth: '400px', width: '100%', padding: '32px',
                                background: 'white', textAlign: 'center',
                            }}
                        >
                            <div style={{
                                width: '60px', height: '60px', borderRadius: '50%',
                                background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                margin: '0 auto 20px',
                            }}>
                                <HiTrash size={30} />
                            </div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                                Delete Application?
                            </h3>
                            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '24px' }}>
                                This action cannot be undone. All application data will be permanently removed.
                            </p>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button
                                    onClick={() => handleDeleteApplication(confirmDelete)}
                                    className="btn-primary"
                                    style={{ flex: 1, background: '#ef4444' }}
                                >
                                    Yes, Delete
                                </button>
                                <button
                                    onClick={() => setConfirmDelete(null)}
                                    className="btn-secondary"
                                    style={{ flex: 1 }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
