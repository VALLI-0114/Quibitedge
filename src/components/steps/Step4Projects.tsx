'use client';

import React, { useState } from 'react';
import FormInput from '../../components/FormInput';
import FileUpload from '../../components/FileUpload';
import GlassCard from '../../components/GlassCard';
import { motion } from 'framer-motion';
import { HiPlus, HiTrash } from 'react-icons/hi';

interface StepProps {
    data: Record<string, string | string[]>;
    onChange: (name: string, value: string | string[]) => void;
    errors: Record<string, string>;
    files: Record<string, File | null>;
    previews: Record<string, string>;
    onFileSelect: (name: string, file: File | null) => void;
}

interface Project {
    title: string;
    description: string;
    technologies: string;
    github_link: string;
    live_link: string;
}

export default function Step4Projects({ data, onChange, errors, files, previews, onFileSelect }: StepProps) {
    const [projects, setProjects] = useState<Project[]>(() => {
        const titles = (data.project_titles as string[]) || [];
        if (titles.length === 0) return [{ title: '', description: '', technologies: '', github_link: '', live_link: '' }];
        return titles.map((t, i) => ({
            title: t,
            description: ((data.project_descriptions as string[]) || [])[i] || '',
            technologies: ((data.technologies_used as string[]) || [])[i] || '',
            github_link: ((data.github_links as string[]) || [])[i] || '',
            live_link: ((data.live_links as string[]) || [])[i] || '',
        }));
    });

    const updateProjects = (updated: Project[]) => {
        setProjects(updated);
        onChange('num_projects', String(updated.length));
        onChange('project_titles', updated.map(p => p.title));
        onChange('project_descriptions', updated.map(p => p.description));
        onChange('technologies_used', updated.map(p => p.technologies));
        onChange('github_links', updated.map(p => p.github_link));
        onChange('live_links', updated.map(p => p.live_link));
    };

    const addProject = () => {
        updateProjects([...projects, { title: '', description: '', technologies: '', github_link: '', live_link: '' }]);
    };

    const removeProject = (index: number) => {
        if (projects.length > 1) {
            updateProjects(projects.filter((_, i) => i !== index));
        }
    };

    const updateProject = (index: number, field: keyof Project, value: string) => {
        const updated = [...projects];
        updated[index] = { ...updated[index], [field]: value };
        updateProjects(updated);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
        >
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px', textShadow: '0 0 10px rgba(14, 165, 233, 0.3)' }}>
                Projects & Resume
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '28px' }}>
                Showcase your work and upload your resume
            </p>

            {projects.map((project, i) => (
                <GlassCard key={i} animate={false} style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#334155' }}>
                            Project {i + 1}
                        </h3>
                        {projects.length > 1 && (
                            <button
                                onClick={() => removeProject(i)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '4px',
                                    padding: '6px 12px', borderRadius: '8px',
                                    background: 'rgba(239, 68, 68, 0.08)', border: 'none',
                                    color: '#ef4444', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 500,
                                }}
                            >
                                <HiTrash size={14} /> Remove
                            </button>
                        )}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0 20px' }}>
                        <FormInput
                            label="Project Title"
                            name={`project_title_${i}`}
                            value={project.title}
                            onChange={(e) => updateProject(i, 'title', e.target.value)}
                            placeholder="E-Commerce Platform"
                        />
                        <FormInput
                            label="Technologies Used"
                            name={`project_tech_${i}`}
                            value={project.technologies}
                            onChange={(e) => updateProject(i, 'technologies', e.target.value)}
                            placeholder="React, Node.js, MongoDB"
                        />
                    </div>
                    <FormInput
                        label="Project Description"
                        name={`project_desc_${i}`}
                        value={project.description}
                        onChange={(e) => updateProject(i, 'description', e.target.value)}
                        textarea
                        rows={3}
                        placeholder="Describe your project, its features, and your role..."
                    />
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0 20px' }}>
                        <FormInput
                            label="GitHub Repository Link"
                            name={`project_github_${i}`}
                            type="url"
                            value={project.github_link}
                            onChange={(e) => updateProject(i, 'github_link', e.target.value)}
                            placeholder="https://github.com/user/repo"
                        />
                        <FormInput
                            label="Live Project Link"
                            name={`project_live_${i}`}
                            type="url"
                            value={project.live_link}
                            onChange={(e) => updateProject(i, 'live_link', e.target.value)}
                            placeholder="https://myproject.vercel.app"
                        />
                    </div>
                </GlassCard>
            ))}

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={addProject}
                className="btn-secondary"
                style={{ width: '100%', marginBottom: '24px' }}
            >
                <HiPlus size={18} /> Add Another Project
            </motion.button>

            <GlassCard animate={false}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#334155', marginBottom: '20px' }}>
                    Upload Documents
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                    <FileUpload
                        label="Resume (PDF)"
                        accept={{ 'application/pdf': ['.pdf'] }}
                        maxSize={10}
                        onFileSelect={(f) => onFileSelect('resume', f)}
                        currentFile={files.resume}
                        previewUrl={previews.resume}
                        error={errors.resume}
                        required
                    />
                    <FileUpload
                        label="Portfolio (Optional)"
                        accept={{ 'application/pdf': ['.pdf'], 'image/*': ['.jpg', '.png', '.webp'] }}
                        maxSize={10}
                        onFileSelect={(f) => onFileSelect('portfolio', f)}
                        currentFile={files.portfolio}
                        previewUrl={previews.portfolio}
                    />
                </div>
            </GlassCard>
        </motion.div>
    );
}
