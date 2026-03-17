'use client';

import { motion } from 'framer-motion';
import { HiCheck } from 'react-icons/hi';

interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
    stepNames: string[];
}

export default function ProgressBar({ currentStep, totalSteps, stepNames }: ProgressBarProps) {
    const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

    return (
        <div style={{ marginBottom: '40px' }}>
            {/* Progress line */}
            <div style={{ position: 'relative', marginBottom: '12px' }}>
                <div className="progress-bar-track">
                    <motion.div
                        className="progress-bar-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                </div>
            </div>

            {/* Step dots */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                position: 'relative',
            }}>
                {stepNames.map((name, i) => {
                    const stepNum = i + 1;
                    const isCompleted = stepNum < currentStep;
                    const isActive = stepNum === currentStep;

                    return (
                        <div key={i} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            flex: 1,
                        }}>
                            <motion.div
                                initial={{ scale: 0.8 }}
                                animate={{ scale: isActive ? 1.1 : 1 }}
                                transition={{ duration: 0.3 }}
                                className={`step-dot ${isCompleted ? 'completed' : isActive ? 'active' : 'inactive'}`}
                            >
                                {isCompleted ? <HiCheck size={18} /> : stepNum}
                            </motion.div>
                            <span style={{
                                marginTop: '12px',
                                fontSize: '0.75rem',
                                fontWeight: isActive ? 700 : 500,
                                color: isActive ? '#38bdf8' : isCompleted ? '#10b981' : '#64748b',
                                textAlign: 'center',
                                maxWidth: '80px',
                                lineHeight: '1.3',
                            }}>
                                {name}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
