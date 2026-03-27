'use client';

import React from 'react';
import FormInput from '../../components/FormInput';
import FileUpload from '../../components/FileUpload';
import GlassCard from '../../components/GlassCard';
import { motion } from 'framer-motion';
import { HiCurrencyRupee, HiQrcode, HiShieldCheck, HiExclamationCircle } from 'react-icons/hi';

interface StepProps {
    data: Record<string, string>;
    onChange: (name: string, value: string) => void;
    errors: Record<string, string>;
    files: Record<string, File | null>;
    previews: Record<string, string>;
    onFileSelect: (name: string, file: File | null) => void;
}

const paymentMethods = [
    { value: 'UPI', label: 'UPI' },
    { value: 'Bank Transfer', label: 'Bank Transfer' },
    { value: 'QR Payment', label: 'QR Payment' },
];

export default function Step5Payment({ data, onChange, errors, files, previews, onFileSelect }: StepProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        onChange(e.target.name, e.target.value);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
        >
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px', textShadow: '0 0 10px rgba(14, 165, 233, 0.3)' }}>
                Payment Details
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '28px' }}>
                Complete your payment to finalize registration
            </p>

            {/* Fee Information */}
            <GlassCard animate={false} style={{
                background: 'linear-gradient(135deg, rgba(99,102,241,0.06), rgba(168,85,247,0.06))',
                marginBottom: '24px',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                        width: '56px', height: '56px', borderRadius: '16px',
                        background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <HiCurrencyRupee size={28} style={{ color: 'white' }} />
                    </div>
                    <div>
                        <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '4px' }}>Internship Registration Fee</p>
                        <p style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', textShadow: '0 0 15px rgba(139, 92, 246, 0.5)' }}>₹2000</p>
                        <p style={{ fontSize: '0.75rem', color: '#64748b' }}>One-time payment • Includes certificate</p>
                    </div>
                </div>
            </GlassCard>

            {/* QR Code Section */}
            <GlassCard animate={false} style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#334155', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <HiQrcode size={20} style={{ color: '#6366f1' }} /> Scan QR Code to Pay
                </h3>
                <div className="qr-container" style={{ maxWidth: '300px', margin: '0 auto', textAlign: 'center' }}>
                    <div style={{
                        width: '240px', height: '240px',
                        background: 'white',
                        borderRadius: '12px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 16px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
                        border: '1px solid #e2e8f0',
                        overflow: 'hidden'
                    }}>
                        <img 
                            src="/qr-code.png" 
                            alt="Payment QR Code" 
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 600, marginBottom: '4px' }}>
                        UPI ID: <span style={{ color: '#0ea5e9' }}>eazypay.1IGYN5S2B7@icici</span>
                    </p>
                    <p style={{ fontSize: '0.75rem', color: '#64748b' }}>
                        Scan & pay ₹2000 using any UPI app
                    </p>
                </div>
            </GlassCard>

            <GlassCard animate={false} style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#334155', marginBottom: '20px' }}>
                    Payment Information
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0 20px' }}>
                    <FormInput label="Fee Amount" name="fee_amount" value={data.fee_amount || '2000'} onChange={handleChange} disabled placeholder="2000" />
                    <FormInput label="Payment Date" name="payment_date" type="date" value={data.payment_date || ''} onChange={handleChange} required error={errors.payment_date} />
                    <FormInput label="Transaction ID" name="transaction_id" value={data.transaction_id || ''} onChange={handleChange} required error={errors.transaction_id} placeholder="Enter transaction/reference ID" />
                    <FormInput label="UPI ID Used" name="upi_id" value={data.upi_id || ''} onChange={handleChange} placeholder="yourname@upi" />
                    <FormInput label="Payment Method" name="payment_method" value={data.payment_method || ''} onChange={handleChange} required error={errors.payment_method} options={paymentMethods} />
                </div>
            </GlassCard>

            {/* Payment Proof */}
            <GlassCard animate={false} style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#334155', marginBottom: '20px' }}>
                    Upload Payment Proof
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                    <FileUpload
                        label="Payment Screenshot"
                        accept={{ 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] }}
                        maxSize={5}
                        onFileSelect={(f) => onFileSelect('payment_screenshot', f)}
                        currentFile={files.payment_screenshot}
                        previewUrl={previews.payment_screenshot}
                        error={errors.payment_screenshot}
                        required
                    />
                    <FileUpload
                        label="Transaction Receipt (Optional)"
                        accept={{ 'image/*': ['.jpg', '.jpeg', '.png'], 'application/pdf': ['.pdf'] }}
                        maxSize={5}
                        onFileSelect={(f) => onFileSelect('transaction_receipt', f)}
                        currentFile={files.transaction_receipt}
                        previewUrl={previews.transaction_receipt}
                    />
                </div>
            </GlassCard>

            {/* Security Note */}
            <div style={{
                display: 'flex', gap: '12px', alignItems: 'flex-start',
                padding: '16px 20px', borderRadius: '12px',
                background: 'rgba(16, 185, 129, 0.06)',
                border: '1px solid rgba(16, 185, 129, 0.15)',
            }}>
                <HiShieldCheck size={22} style={{ color: '#10b981', flexShrink: 0, marginTop: '2px' }} />
                <div>
                    <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#34d399', marginBottom: '4px' }}>
                        Secure Payment Verification
                    </p>
                    <p style={{ fontSize: '0.78rem', color: '#64748b', lineHeight: 1.6 }}>
                        Your payment will be verified within 24-48 hours. Transaction IDs are checked for uniqueness to prevent fraud.
                        Payment screenshots are securely stored and only accessible by admins.
                    </p>
                </div>
            </div>

            {/* Payment Status */}
            <div style={{
                marginTop: '20px', display: 'flex', alignItems: 'center', gap: '8px',
                padding: '12px 16px', borderRadius: '10px',
                background: 'rgba(245, 158, 11, 0.08)',
                border: '1px solid rgba(245, 158, 11, 0.15)',
            }}>
                <HiExclamationCircle size={18} style={{ color: '#f59e0b' }} />
                <span style={{ fontSize: '0.85rem', color: '#92400e', fontWeight: 500 }}>
                    Payment Status: <span className="badge badge-pending">Pending Verification</span>
                </span>
            </div>
        </motion.div>
    );
}
