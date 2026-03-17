'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { HiCloudUpload, HiDocument, HiX, HiPhotograph } from 'react-icons/hi';

interface FileUploadProps {
    label: string;
    accept: Record<string, string[]>;
    maxSize?: number; // in MB
    onFileSelect: (file: File) => void;
    currentFile?: File | null;
    previewUrl?: string;
    error?: string;
    required?: boolean;
}

export default function FileUpload({
    label,
    accept,
    maxSize = 5,
    onFileSelect,
    currentFile,
    previewUrl,
    error,
    required = false,
}: FileUploadProps) {
    const [dragError, setDragError] = useState('');

    const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: unknown[]) => {
        setDragError('');
        if (rejectedFiles && (rejectedFiles as Array<unknown>).length > 0) {
            setDragError(`File too large or wrong type. Max ${maxSize}MB.`);
            return;
        }
        if (acceptedFiles.length > 0) {
            onFileSelect(acceptedFiles[0]);
        }
    }, [maxSize, onFileSelect]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept,
        maxSize: maxSize * 1024 * 1024,
        multiple: false,
    });

    const isImage = currentFile?.type?.startsWith('image/') || previewUrl?.match(/\.(jpg|jpeg|png|gif|webp)/i);

    return (
        <div style={{ marginBottom: '20px' }}>
            <label style={{
                display: 'block', marginBottom: '6px',
                fontSize: '0.85rem', fontWeight: 600, color: '#334155',
            }}>
                {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
            </label>

            {currentFile || previewUrl ? (
                <div style={{
                    border: '2px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '16px',
                    padding: '16px',
                    background: 'rgba(16, 185, 129, 0.03)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                }}>
                    {isImage && previewUrl ? (
                        <img
                            src={previewUrl}
                            alt="Preview"
                            style={{
                                width: '80px',
                                height: '80px',
                                objectFit: 'cover',
                                borderRadius: '12px',
                                border: '2px solid rgba(255,255,255,0.5)',
                            }}
                        />
                    ) : (
                        <div style={{
                            width: '50px', height: '50px', borderRadius: '12px',
                            background: 'rgba(99, 102, 241, 0.1)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <HiDocument size={24} style={{ color: '#6366f1' }} />
                        </div>
                    )}
                    <div style={{ flex: 1 }}>
                        <p style={{ fontSize: '0.9rem', fontWeight: 500, color: '#0f172a' }}>
                            {currentFile?.name || 'Uploaded file'}
                        </p>
                        {currentFile && (
                            <p style={{ fontSize: '0.75rem', color: '#64748b' }}>
                                {(currentFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                        )}
                    </div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onFileSelect(null as unknown as File);
                        }}
                        style={{
                            width: '32px', height: '32px', borderRadius: '8px',
                            background: 'rgba(239, 68, 68, 0.1)', border: 'none',
                            cursor: 'pointer', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', color: '#ef4444',
                        }}
                    >
                        <HiX size={16} />
                    </button>
                </div>
            ) : (
                <div
                    {...getRootProps()}
                    className={`upload-zone ${isDragActive ? 'drag-active' : ''}`}
                >
                    <input {...getInputProps()} />
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                        {isDragActive ? (
                            <HiPhotograph size={40} style={{ color: '#6366f1' }} />
                        ) : (
                            <HiCloudUpload size={40} style={{ color: '#64748b' }} />
                        )}
                        <div>
                            <p style={{ fontSize: '0.9rem', fontWeight: 500, color: '#334155' }}>
                                {isDragActive ? 'Drop the file here' : 'Drag & drop or click to upload'}
                            </p>
                            <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                                Max file size: {maxSize}MB
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {(error || dragError) && (
                <p style={{ marginTop: '4px', fontSize: '0.8rem', color: '#ef4444', fontWeight: 500 }}>
                    {error || dragError}
                </p>
            )}
        </div>
    );
}
