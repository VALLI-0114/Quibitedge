'use client';

import React from 'react';
import FormInput from '../../components/FormInput';
import SkillTagInput from '../../components/SkillTagInput';
import GlassCard from '../../components/GlassCard';
import { motion } from 'framer-motion';

interface StepProps {
    data: Record<string, string | string[]>;
    onChange: (name: string, value: string | string[]) => void;
    errors: Record<string, string>;
}

const degreeOptions = [
    { value: 'B.Tech', label: 'B.Tech' },
    { value: 'B.E.', label: 'B.E.' },
    { value: 'B.Sc', label: 'B.Sc' },
    { value: 'BCA', label: 'BCA' },
    { value: 'MCA', label: 'MCA' },
    { value: 'M.Tech', label: 'M.Tech' },
    { value: 'M.Sc', label: 'M.Sc' },
    { value: 'MBA', label: 'MBA' },
    { value: 'Ph.D', label: 'Ph.D' },
    { value: 'Diploma', label: 'Diploma' },
    { value: 'Other', label: 'Other' },
];

const yearOptions = [
    { value: '1st Year', label: '1st Year' },
    { value: '2nd Year', label: '2nd Year' },
    { value: '3rd Year', label: '3rd Year' },
    { value: '4th Year', label: '4th Year' },
    { value: '5th Year', label: '5th Year' },
    { value: 'Graduated', label: 'Graduated' },
];

const semesterOptions = Array.from({ length: 10 }, (_, i) => ({
    value: `${i + 1}`,
    label: `Semester ${i + 1}`,
}));

export default function Step2Academic({ data, onChange, errors }: StepProps) {
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
                Academic Details
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '28px' }}>
                Tell us about your educational background
            </p>

            <GlassCard animate={false}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#334155', marginBottom: '20px' }}>
                    Institution Information
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0 20px' }}>
                    <FormInput label="College Name" name="college_name" value={(data.college_name as string) || ''} onChange={handleChange} required error={errors.college_name} placeholder="IIT Hyderabad" />
                    <FormInput label="University Name" name="university_name" value={(data.university_name as string) || ''} onChange={handleChange} placeholder="JNTU Hyderabad" />
                    <FormInput label="Degree" name="degree" value={(data.degree as string) || ''} onChange={handleChange} required error={errors.degree} options={degreeOptions} />
                    <FormInput label="Branch / Department" name="branch" value={(data.branch as string) || ''} onChange={handleChange} required error={errors.branch} placeholder="Computer Science" />
                    <FormInput label="Current Semester" name="current_semester" value={(data.current_semester as string) || ''} onChange={handleChange} options={semesterOptions} />
                    <FormInput label="Year of Study" name="year_of_study" value={(data.year_of_study as string) || ''} onChange={handleChange} options={yearOptions} />
                </div>
            </GlassCard>

            <GlassCard animate={false} style={{ marginTop: '24px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#334155', marginBottom: '20px' }}>
                    Academic IDs & Performance
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0 20px' }}>
                    <FormInput label="Roll Number" name="roll_number" value={(data.roll_number as string) || ''} onChange={handleChange} placeholder="21B01A0501" />
                    <FormInput label="Registration Number" name="registration_number" value={(data.registration_number as string) || ''} onChange={handleChange} placeholder="University Reg. No." />
                    <FormInput label="Previous Semester CGPA" name="previous_semester_cgpa" value={(data.previous_semester_cgpa as string) || ''} onChange={handleChange} placeholder="8.5" />
                    <FormInput label="Overall CGPA" name="overall_cgpa" value={(data.overall_cgpa as string) || ''} onChange={handleChange} placeholder="8.0" />
                    <FormInput label="10th Percentage" name="tenth_percentage" value={(data.tenth_percentage as string) || ''} onChange={handleChange} placeholder="95%" />
                    <FormInput label="12th Percentage" name="twelfth_percentage" value={(data.twelfth_percentage as string) || ''} onChange={handleChange} placeholder="92%" />
                </div>
            </GlassCard>

            <GlassCard animate={false} style={{ marginTop: '24px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#334155', marginBottom: '20px' }}>
                    Skills & Certifications
                </h3>
                <SkillTagInput
                    label="Skills"
                    tags={(data.skills as string[]) || []}
                    onTagsChange={(tags) => onChange('skills', tags)}
                    placeholder="e.g. React, Python, Docker..."
                />
                <SkillTagInput
                    label="Programming Languages Known"
                    tags={(data.programming_languages as string[]) || []}
                    onTagsChange={(tags) => onChange('programming_languages', tags)}
                    placeholder="e.g. JavaScript, Python, Java..."
                />
                <FormInput
                    label="Certifications"
                    name="certifications"
                    value={(data.certifications as string) || ''}
                    onChange={handleChange}
                    textarea
                    rows={3}
                    placeholder="List your certifications (one per line)"
                />
            </GlassCard>
        </motion.div>
    );
}
