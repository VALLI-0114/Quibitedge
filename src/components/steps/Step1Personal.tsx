'use client';

import React from 'react';
import FormInput from '../../components/FormInput';
import FileUpload from '../../components/FileUpload';
import GlassCard from '../../components/GlassCard';
import { motion } from 'framer-motion';

interface StepProps {
    data: Record<string, string>;
    onChange: (name: string, value: string) => void;
    errors: Record<string, string>;
    files: Record<string, File | null>;
    previews: Record<string, string>;
    onFileSelect: (name: string, file: File | null) => void;
}

const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' },
    { value: 'Prefer not to say', label: 'Prefer not to say' },
];

const countryOptions = [
    { value: 'India', label: 'India' },
    { value: 'USA', label: 'United States' },
    { value: 'UK', label: 'United Kingdom' },
    { value: 'Canada', label: 'Canada' },
    { value: 'Australia', label: 'Australia' },
    { value: 'Other', label: 'Other' },
];

export default function Step1Personal({ data, onChange, errors, files, previews, onFileSelect }: StepProps) {
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
                Personal Details
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '28px' }}>
                Let&apos;s start with your basic information
            </p>

            <GlassCard animate={false}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#334155', marginBottom: '20px' }}>
                    Basic Information
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0 20px' }}>
                    <FormInput label="Full Name" name="full_name" value={data.full_name || ''} onChange={handleChange} required error={errors.full_name} placeholder="John Doe" />
                    <FormInput label="Father's Name" name="father_name" value={data.father_name || ''} onChange={handleChange} placeholder="Father's full name" />
                    <FormInput label="Mother's Name" name="mother_name" value={data.mother_name || ''} onChange={handleChange} placeholder="Mother's full name" />
                    <FormInput label="Date of Birth" name="date_of_birth" type="date" value={data.date_of_birth || ''} onChange={handleChange} required error={errors.date_of_birth} />
                    <FormInput label="Gender" name="gender" value={data.gender || ''} onChange={handleChange} required error={errors.gender} options={genderOptions} />
                    <FormInput label="Nationality" name="nationality" value={data.nationality || ''} onChange={handleChange} placeholder="Indian" />
                </div>
            </GlassCard>

            <GlassCard animate={false} style={{ marginTop: '24px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#334155', marginBottom: '20px' }}>
                    Contact Information
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0 20px' }}>
                    <FormInput label="Phone Number" name="phone" type="tel" value={data.phone || ''} onChange={handleChange} required error={errors.phone} placeholder="+91 98765 43210" />
                    <FormInput label="Alternate Phone" name="alternate_phone" type="tel" value={data.alternate_phone || ''} onChange={handleChange} placeholder="+91 98765 43210" />
                    <FormInput label="Email Address" name="email" type="email" value={data.email || ''} onChange={handleChange} required error={errors.email} placeholder="john@example.com" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0 20px' }}>
                    <FormInput label="Address" name="address" value={data.address || ''} onChange={handleChange} placeholder="Full address" />
                    <FormInput label="City" name="city" value={data.city || ''} onChange={handleChange} placeholder="Hyderabad" />
                    <FormInput label="State" name="state" value={data.state || ''} onChange={handleChange} placeholder="Telangana" />
                    <FormInput label="Country" name="country" value={data.country || ''} onChange={handleChange} options={countryOptions} />
                    <FormInput label="Pincode" name="pincode" value={data.pincode || ''} onChange={handleChange} placeholder="500001" />
                </div>
            </GlassCard>

            <GlassCard animate={false} style={{ marginTop: '24px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#334155', marginBottom: '20px' }}>
                    Online Profiles
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0 20px' }}>
                    <FormInput label="LinkedIn Profile" name="linkedin" type="url" value={data.linkedin || ''} onChange={handleChange} placeholder="https://linkedin.com/in/username" />
                    <FormInput label="GitHub Profile" name="github" type="url" value={data.github || ''} onChange={handleChange} placeholder="https://github.com/username" />
                    <FormInput label="Portfolio Website" name="portfolio_website" type="url" value={data.portfolio_website || ''} onChange={handleChange} placeholder="https://yoursite.com" />
                </div>
            </GlassCard>

            <GlassCard animate={false} style={{ marginTop: '24px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#334155', marginBottom: '20px' }}>
                    Identity & Emergency Contact
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0 20px' }}>
                    <FormInput label="Aadhaar Number" name="aadhaar_number" value={data.aadhaar_number || ''} onChange={handleChange} placeholder="XXXX XXXX XXXX" error={errors.aadhaar_number} />
                    <FormInput label="Emergency Contact Name" name="emergency_contact_name" value={data.emergency_contact_name || ''} onChange={handleChange} placeholder="Contact person name" />
                    <FormInput label="Emergency Contact Number" name="emergency_contact_number" type="tel" value={data.emergency_contact_number || ''} onChange={handleChange} placeholder="+91 98765 43210" />
                </div>
            </GlassCard>

            <GlassCard animate={false} style={{ marginTop: '24px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#334155', marginBottom: '20px' }}>
                    Document Uploads
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                    <FileUpload
                        label="Profile Photo"
                        accept={{ 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] }}
                        maxSize={5}
                        onFileSelect={(f) => onFileSelect('profile_photo', f)}
                        currentFile={files.profile_photo}
                        previewUrl={previews.profile_photo}
                        error={errors.profile_photo}
                    />
                    <FileUpload
                        label="Aadhaar Card (Front)"
                        accept={{ 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] }}
                        maxSize={5}
                        onFileSelect={(f) => onFileSelect('aadhaar_front', f)}
                        currentFile={files.aadhaar_front}
                        previewUrl={previews.aadhaar_front}
                    />
                    <FileUpload
                        label="Aadhaar Card (Back)"
                        accept={{ 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] }}
                        maxSize={5}
                        onFileSelect={(f) => onFileSelect('aadhaar_back', f)}
                        currentFile={files.aadhaar_back}
                        previewUrl={previews.aadhaar_back}
                    />
                </div>
            </GlassCard>
        </motion.div>
    );
}
