'use client';

import React from 'react';
import FormInput from '../../components/FormInput';
import GlassCard from '../../components/GlassCard';
import { motion } from 'framer-motion';
import { HiCheckCircle } from 'react-icons/hi';

interface StepProps {
    data: Record<string, string>;
    onChange: (name: string, value: string) => void;
    errors: Record<string, string>;
}

const internshipDomains = [
    { value: 'Cyber Security', color: '#ef4444' },
    { value: 'Artificial Intelligence', color: '#f59e0b' },
    { value: 'Machine Learning', color: '#10b981' },
    { value: 'Data Science', color: '#3b82f6' },
    { value: 'Python Development', color: '#06b6d4' },
    { value: 'Java Development', color: '#f97316' },
    { value: 'Web Development', color: '#8b5cf6' },
    { value: 'Front-End Development', color: '#14b8a6' },
    { value: 'Back-End Development', color: '#6366f1' },
    { value: 'Full Stack Development', color: '#ec4899' },
];

const modeOptions = [
    { value: 'Online', label: 'Online' },
    { value: 'Hybrid', label: 'Hybrid' },
];

const durationOptions = [
    { value: '4 Weeks', label: '4 Weeks' },
    { value: '6 Weeks', label: '6 Weeks' },
    { value: '8 Weeks', label: '8 Weeks' },
    { value: '12 Weeks', label: '12 Weeks' },
];

export default function Step3Preferences({ data, onChange, errors }: StepProps) {
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
                Internship Preferences
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '28px' }}>
                Select your preferred internship domain and tell us about your goals
            </p>

            <GlassCard animate={false}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#334155', marginBottom: '20px' }}>
                    Select Your Domain <span style={{ color: '#ef4444' }}>*</span>
                </h3>
                {errors.domain && (
                    <p style={{ fontSize: '0.8rem', color: '#ef4444', fontWeight: 500, marginBottom: '12px' }}>
                        {errors.domain}
                    </p>
                )}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '12px',
                }}>
                    {internshipDomains.map((domain) => (
                        <motion.div
                            key={domain.value}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onChange('domain', domain.value)}
                            className={`domain-card ${data.domain === domain.value ? 'selected' : ''}`}
                            style={{
                                padding: '16px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                borderColor: data.domain === domain.value ? domain.color : undefined,
                            }}
                        >
                            <div style={{
                                width: '12px', height: '12px', borderRadius: '50%',
                                background: domain.color, flexShrink: 0,
                            }} />
                            <span style={{
                                fontSize: '0.88rem', fontWeight: 600,
                                color: data.domain === domain.value ? domain.color : '#475569',
                            }}>
                                {domain.value}
                            </span>
                            {data.domain === domain.value && (
                                <HiCheckCircle style={{ marginLeft: 'auto', color: domain.color }} size={20} />
                            )}
                        </motion.div>
                    ))}
                </div>
            </GlassCard>

            <GlassCard animate={false} style={{ marginTop: '24px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#334155', marginBottom: '20px' }}>
                    Preferences
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0 20px' }}>
                    <FormInput label="Internship Mode" name="internship_mode" value={data.internship_mode || ''} onChange={handleChange} required error={errors.internship_mode} options={modeOptions} />
                    <FormInput label="Preferred Duration" name="preferred_duration" value={data.preferred_duration || ''} onChange={handleChange} required error={errors.preferred_duration} options={durationOptions} />
                    <FormInput label="Available Start Date" name="available_start_date" type="date" value={data.available_start_date || ''} onChange={handleChange} />
                </div>
            </GlassCard>

            <GlassCard animate={false} style={{ marginTop: '24px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#334155', marginBottom: '20px' }}>
                    Tell Us About Yourself
                </h3>
                <FormInput
                    label="Why do you want this internship?"
                    name="why_internship"
                    value={data.why_internship || ''}
                    onChange={handleChange}
                    textarea
                    rows={4}
                    required
                    error={errors.why_internship}
                    placeholder="Tell us what motivates you to apply for this internship..."
                />
                <FormInput
                    label="Areas of Interest"
                    name="areas_of_interest"
                    value={data.areas_of_interest || ''}
                    onChange={handleChange}
                    textarea
                    rows={3}
                    placeholder="What specific topics or technologies interest you..."
                />
                <FormInput
                    label="Career Goals"
                    name="career_goals"
                    value={data.career_goals || ''}
                    onChange={handleChange}
                    textarea
                    rows={3}
                    placeholder="Where do you see yourself in the next 5 years..."
                />
            </GlassCard>
        </motion.div>
    );
}
