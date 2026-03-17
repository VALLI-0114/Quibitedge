'use client';

import React from 'react';
import GlassCard from '../../components/GlassCard';
import { motion } from 'framer-motion';
import { HiPencil, HiCheck, HiUser, HiAcademicCap, HiBriefcase, HiCode, HiCurrencyRupee } from 'react-icons/hi';

interface StepProps {
    formData: {
        personal: Record<string, string>;
        academic: Record<string, string | string[]>;
        preferences: Record<string, string>;
        projects: Record<string, string | string[]>;
        payment: Record<string, string>;
    };
    declaration: boolean;
    onDeclarationChange: (val: boolean) => void;
    onEditStep: (step: number) => void;
    previews: Record<string, string>;
}

function ReviewSection({
    title,
    icon,
    step,
    onEdit,
    children,
}: {
    title: string;
    icon: React.ReactNode;
    step: number;
    onEdit: (s: number) => void;
    children: React.ReactNode;
}) {
    return (
        <GlassCard animate={false} style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                        width: '36px', height: '36px', borderRadius: '10px',
                        background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(168,85,247,0.1))',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#6366f1',
                    }}>
                        {icon}
                    </div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#0f172a' }}>{title}</h3>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onEdit(step)}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '4px',
                        padding: '6px 14px', borderRadius: '8px',
                        background: 'rgba(56, 189, 248, 0.1)', border: 'none',
                        color: '#38bdf8', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600,
                    }}
                >
                    <HiPencil size={14} /> Edit
                </motion.button>
            </div>
            {children}
        </GlassCard>
    );
}

function Field({ label, value }: { label: string; value: string | undefined }) {
    if (!value) return null;
    return (
        <div style={{ marginBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500 }}>{label}</span>
            <p style={{ fontSize: '0.9rem', color: '#f1f5f9', fontWeight: 400 }}>{value}</p>
        </div>
    );
}

export default function Step6Review({ formData, declaration, onDeclarationChange, onEditStep, previews }: StepProps) {
    const { personal, academic, preferences, projects, payment } = formData;

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
        >
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px', textShadow: '0 0 10px rgba(14, 165, 233, 0.3)' }}>
                Review & Submit
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '28px' }}>
                Please review all your details before submitting
            </p>

            {/* Personal Details */}
            <ReviewSection title="Personal Details" icon={<HiUser size={18} />} step={1} onEdit={onEditStep}>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    {previews.profile_photo && (
                        <img
                            src={previews.profile_photo}
                            alt="Profile"
                            style={{ width: '80px', height: '80px', borderRadius: '14px', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.5)' }}
                        />
                    )}
                    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0 20px' }}>
                        <Field label="Full Name" value={personal.full_name} />
                        <Field label="Email" value={personal.email} />
                        <Field label="Phone" value={personal.phone} />
                        <Field label="Gender" value={personal.gender} />
                        <Field label="Date of Birth" value={personal.date_of_birth} />
                        <Field label="City" value={personal.city} />
                        <Field label="State" value={personal.state} />
                        <Field label="LinkedIn" value={personal.linkedin} />
                        <Field label="GitHub" value={personal.github} />
                    </div>
                </div>
            </ReviewSection>

            {/* Academic Details */}
            <ReviewSection title="Academic Details" icon={<HiAcademicCap size={18} />} step={2} onEdit={onEditStep}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0 20px' }}>
                    <Field label="College" value={academic.college_name as string} />
                    <Field label="Degree" value={academic.degree as string} />
                    <Field label="Branch" value={academic.branch as string} />
                    <Field label="Year" value={academic.year_of_study as string} />
                    <Field label="Overall CGPA" value={academic.overall_cgpa as string} />
                    <Field label="10th" value={academic.tenth_percentage as string} />
                    <Field label="12th" value={academic.twelfth_percentage as string} />
                </div>
                {(academic.skills as string[])?.length > 0 && (
                    <div style={{ marginTop: '12px' }}>
                        <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500 }}>Skills</span>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                            {(academic.skills as string[]).map((s, i) => (
                                <span key={i} className="skill-tag">{s}</span>
                            ))}
                        </div>
                    </div>
                )}
            </ReviewSection>

            {/* Preferences */}
            <ReviewSection title="Internship Preferences" icon={<HiBriefcase size={18} />} step={3} onEdit={onEditStep}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0 20px' }}>
                    <Field label="Domain" value={preferences.domain} />
                    <Field label="Mode" value={preferences.internship_mode} />
                    <Field label="Duration" value={preferences.preferred_duration} />
                    <Field label="Start Date" value={preferences.available_start_date} />
                </div>
                <Field label="Why This Internship" value={preferences.why_internship} />
            </ReviewSection>

            {/* Projects */}
            <ReviewSection title="Projects & Resume" icon={<HiCode size={18} />} step={4} onEdit={onEditStep}>
                {((projects.project_titles as string[]) || []).map((title, i) => (
                    title && (
                        <div key={i} style={{
                            padding: '12px 16px', borderRadius: '10px',
                            background: 'rgba(15,23,42,0.8)', marginBottom: '10px',
                            border: '1px solid rgba(255,255,255,0.05)'
                        }}>
                            <p style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.9rem' }}>{title}</p>
                            {((projects.project_descriptions as string[]) || [])[i] && (
                                <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>
                                    {((projects.project_descriptions as string[]) || [])[i]}
                                </p>
                            )}
                        </div>
                    )
                ))}
            </ReviewSection>

            {/* Payment */}
            <ReviewSection title="Payment Details" icon={<HiCurrencyRupee size={18} />} step={5} onEdit={onEditStep}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0 20px' }}>
                    <Field label="Amount" value={`₹${payment.fee_amount || '999'}`} />
                    <Field label="Transaction ID" value={payment.transaction_id} />
                    <Field label="Payment Method" value={payment.payment_method} />
                    <Field label="Payment Date" value={payment.payment_date} />
                    <Field label="UPI ID" value={payment.upi_id} />
                </div>
            </ReviewSection>

            {/* Declaration */}
            <GlassCard animate={false} style={{
                background: declaration
                    ? 'rgba(16, 185, 129, 0.1)'
                    : 'rgba(241, 245, 249, 0.6)',
                border: declaration
                    ? '1px solid rgba(16, 185, 129, 0.4)'
                    : '1px solid rgba(203, 213, 225, 0.5)',
            }}>
                <label
                    style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '14px',
                        cursor: 'pointer',
                    }}
                >
                    <div
                        onClick={() => onDeclarationChange(!declaration)}
                        style={{
                            width: '24px', height: '24px', borderRadius: '6px',
                            border: `2px solid ${declaration ? '#10b981' : '#cbd5e1'}`,
                            background: declaration ? '#10b981' : 'white',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            flexShrink: 0, marginTop: '2px', cursor: 'pointer',
                            transition: 'all 0.2s ease',
                        }}
                    >
                        {declaration && <HiCheck size={14} style={{ color: 'white' }} />}
                    </div>
                    <div>
                        <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}>
                            Declaration
                        </p>
                        <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.6 }}>
                            I confirm that all the information provided above is true and correct to the best of my knowledge.
                            I understand that any false information may result in the rejection of my application.
                        </p>
                    </div>
                </label>
            </GlassCard>
        </motion.div>
    );
}
