'use client';

import React from 'react';

interface FormInputProps {
    label: string;
    name: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    placeholder?: string;
    required?: boolean;
    error?: string;
    options?: { value: string; label: string }[];
    textarea?: boolean;
    rows?: number;
    disabled?: boolean;
}

export default function FormInput({
    label,
    name,
    type = 'text',
    value,
    onChange,
    placeholder = '',
    required = false,
    error,
    options,
    textarea = false,
    rows = 4,
    disabled = false,
}: FormInputProps) {
    const inputId = `field-${name}`;

    return (
        <div style={{ marginBottom: '20px' }}>
            <label
                htmlFor={inputId}
                style={{
                    display: 'block',
                    marginBottom: '6px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: '#334155',
                }}
            >
                {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
            </label>

            {options ? (
                <select
                    id={inputId}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`glass-input ${error ? 'error' : ''}`}
                    disabled={disabled}
                    style={{ cursor: 'pointer' }}
                >
                    <option value="">Select {label}</option>
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            ) : textarea ? (
                <textarea
                    id={inputId}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    rows={rows}
                    className={`glass-input ${error ? 'error' : ''}`}
                    disabled={disabled}
                    style={{ resize: 'vertical', minHeight: `${rows * 28}px` }}
                />
            ) : (
                <input
                    id={inputId}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`glass-input ${error ? 'error' : ''}`}
                    disabled={disabled}
                />
            )}

            {error && (
                <p style={{ marginTop: '4px', fontSize: '0.8rem', color: '#ef4444', fontWeight: 500 }}>
                    {error}
                </p>
            )}
        </div>
    );
}
