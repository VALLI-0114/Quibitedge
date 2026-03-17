'use client';

import React, { useState, KeyboardEvent } from 'react';
import { HiX } from 'react-icons/hi';

interface SkillTagInputProps {
    label: string;
    tags: string[];
    onTagsChange: (tags: string[]) => void;
    placeholder?: string;
    required?: boolean;
    error?: string;
}

export default function SkillTagInput({
    label,
    tags,
    onTagsChange,
    placeholder = 'Type and press Enter',
    required = false,
    error,
}: SkillTagInputProps) {
    const [input, setInput] = useState('');

    const addTag = (tag: string) => {
        const trimmed = tag.trim();
        if (trimmed && !tags.includes(trimmed)) {
            onTagsChange([...tags, trimmed]);
        }
        setInput('');
    };

    const removeTag = (index: number) => {
        onTagsChange(tags.filter((_, i) => i !== index));
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addTag(input);
        }
        if (e.key === 'Backspace' && !input && tags.length > 0) {
            removeTag(tags.length - 1);
        }
    };

    return (
        <div style={{ marginBottom: '20px' }}>
            <label style={{
                display: 'block', marginBottom: '6px',
                fontSize: '0.85rem', fontWeight: 600, color: '#334155',
            }}>
                {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
            </label>

            <div style={{
                padding: '8px 12px',
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px)',
                border: `1.5px solid ${error ? '#ef4444' : 'rgba(203, 213, 225, 0.5)'}`,
                borderRadius: '12px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                alignItems: 'center',
                minHeight: '48px',
                transition: 'border-color 0.3s',
            }}>
                {tags.map((tag, i) => (
                    <span key={i} className="skill-tag" style={{ animation: 'fadeIn 0.2s ease' }}>
                        {tag}
                        <button
                            onClick={() => removeTag(i)}
                            style={{
                                background: 'none', border: 'none', cursor: 'pointer',
                                color: '#6366f1', display: 'flex', padding: 0,
                            }}
                        >
                            <HiX size={14} />
                        </button>
                    </span>
                ))}
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={tags.length === 0 ? placeholder : ''}
                    style={{
                        flex: 1,
                        minWidth: '120px',
                        border: 'none',
                        outline: 'none',
                        background: 'transparent',
                        fontSize: '0.9rem',
                        color: '#1e293b',
                        padding: '4px',
                    }}
                />
            </div>

            <p style={{ marginTop: '4px', fontSize: '0.72rem', color: '#64748b' }}>
                Press Enter or comma to add
            </p>

            {error && (
                <p style={{ marginTop: '2px', fontSize: '0.8rem', color: '#ef4444', fontWeight: 500 }}>
                    {error}
                </p>
            )}
        </div>
    );
}
