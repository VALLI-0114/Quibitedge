'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import AnimatedBackground from '../../components/AnimatedBackground';
import ProgressBar from '../../components/ProgressBar';
import Step1Personal from '../../components/steps/Step1Personal';
import Step2Academic from '../../components/steps/Step2Academic';
import Step3Preferences from '../../components/steps/Step3Preferences';
import Step4Projects from '../../components/steps/Step4Projects';
import Step5Payment from '../../components/steps/Step5Payment';
import Step6Review from '../../components/steps/Step6Review';
import Footer from '../../components/Footer';
import { createApplication, updateApplication, saveAcademicDetails, savePreferences, saveProjects, savePayment, uploadFile, submitApplication } from '../../lib/database';
import { HiArrowLeft, HiArrowRight, HiCheck } from 'react-icons/hi';

const stepNames = ['Personal', 'Academic', 'Preferences', 'Projects', 'Payment', 'Review'];

export default function RegisterPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [applicationId, setApplicationId] = useState<string | null>(null);
    const [declaration, setDeclaration] = useState(false);

    const [personalData, setPersonalData] = useState<Record<string, string>>({});
    const [academicData, setAcademicData] = useState<Record<string, string | string[]>>({});
    const [preferencesData, setPreferencesData] = useState<Record<string, string>>({});
    const [projectsData, setProjectsData] = useState<Record<string, string | string[]>>({});
    const [paymentData, setPaymentData] = useState<Record<string, string>>({ fee_amount: '999' });

    const [files, setFiles] = useState<Record<string, File | null>>({});
    const [previews, setPreviews] = useState<Record<string, string>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleFileSelect = useCallback((name: string, file: File | null) => {
        setFiles(prev => ({ ...prev, [name]: file }));
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviews(prev => ({ ...prev, [name]: url }));
        } else {
            setPreviews(prev => { const n = { ...prev }; delete n[name]; return n; });
        }
    }, []);

    const handlePersonalChange = useCallback((name: string, value: string) => {
        setPersonalData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => { const n = { ...prev }; delete n[name]; return n; });
    }, []);

    const handleAcademicChange = useCallback((name: string, value: string | string[]) => {
        setAcademicData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => { const n = { ...prev }; delete n[name]; return n; });
    }, []);

    const handlePreferencesChange = useCallback((name: string, value: string) => {
        setPreferencesData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => { const n = { ...prev }; delete n[name]; return n; });
    }, []);

    const handleProjectsChange = useCallback((name: string, value: string | string[]) => {
        setProjectsData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => { const n = { ...prev }; delete n[name]; return n; });
    }, []);

    const handlePaymentChange = useCallback((name: string, value: string) => {
        setPaymentData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => { const n = { ...prev }; delete n[name]; return n; });
    }, []);

    const validateStep = (step: number): boolean => {
        const newErrors: Record<string, string> = {};

        switch (step) {
            case 1:
                if (!personalData.full_name?.trim()) newErrors.full_name = 'Full name is required';
                if (!personalData.email?.trim()) newErrors.email = 'Email is required';
                else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalData.email)) newErrors.email = 'Invalid email format';
                if (!personalData.phone?.trim()) newErrors.phone = 'Phone number is required';
                if (!personalData.gender) newErrors.gender = 'Gender is required';
                if (!personalData.date_of_birth) newErrors.date_of_birth = 'Date of birth is required';
                break;
            case 2:
                if (!academicData.college_name) newErrors.college_name = 'College name is required';
                if (!academicData.degree) newErrors.degree = 'Degree is required';
                if (!academicData.branch) newErrors.branch = 'Branch is required';
                break;
            case 3:
                if (!preferencesData.domain) newErrors.domain = 'Please select a domain';
                if (!preferencesData.internship_mode) newErrors.internship_mode = 'Mode is required';
                if (!preferencesData.preferred_duration) newErrors.preferred_duration = 'Duration is required';
                if (!preferencesData.why_internship?.trim()) newErrors.why_internship = 'This field is required';
                break;
            case 5:
                if (!paymentData.transaction_id?.trim()) newErrors.transaction_id = 'Transaction ID is required';
                if (!paymentData.payment_method) newErrors.payment_method = 'Payment method is required';
                if (!paymentData.payment_date) newErrors.payment_date = 'Payment date is required';
                if (!files.payment_screenshot) newErrors.payment_screenshot = 'Payment screenshot is required';
                break;
        }

        setErrors(newErrors);
        const errorKeys = Object.keys(newErrors);
        if (errorKeys.length > 0) {
            if (errorKeys.length === 1) {
                toast.error(newErrors[errorKeys[0]]);
            } else {
                toast.error(`Please fix ${errorKeys.length} missing/invalid fields to proceed.`);
            }
            return false;
        }
        return true;
    };

    const saveStepData = async (step: number) => {
        try {
            switch (step) {
                case 1: {
                    if (!applicationId) {
                        const app = await createApplication(personalData);
                        setApplicationId(app.id);
                        if (files.profile_photo) {
                            const url = await uploadFile('photos', `${app.id}/profile.${files.profile_photo.name.split('.').pop()}`, files.profile_photo);
                            await updateApplication(app.id, { profile_photo_url: url });
                        }
                    } else {
                        await updateApplication(applicationId, personalData);
                    }
                    toast.success('Personal details saved!');
                    break;
                }
                case 2:
                    if (applicationId) {
                        await saveAcademicDetails(applicationId, academicData);
                        toast.success('Academic details saved!');
                    }
                    break;
                case 3:
                    if (applicationId) {
                        await savePreferences(applicationId, preferencesData);
                        toast.success('Preferences saved!');
                    }
                    break;
                case 4:
                    if (applicationId) {
                        await saveProjects(applicationId, projectsData);
                        if (files.resume) {
                            const url = await uploadFile('resumes', `${applicationId}/resume.${files.resume.name.split('.').pop()}`, files.resume);
                            await saveProjects(applicationId, { ...projectsData, resume_url: url });
                        }
                        toast.success('Projects saved!');
                    }
                    break;
                case 5:
                    if (applicationId) {
                        await savePayment(applicationId, paymentData);
                        if (files.payment_screenshot) {
                            const url = await uploadFile('payment-proofs', `${applicationId}/screenshot.${files.payment_screenshot.name.split('.').pop()}`, files.payment_screenshot);
                            await savePayment(applicationId, { ...paymentData, payment_screenshot_url: url });
                        }
                        toast.success('Payment details saved!');
                    }
                    break;
            }
        } catch (err) {
            console.error('Save error:', err);
            // Still allow navigation even if save fails (demo mode)
        }
    };

    const handleNext = async () => {
        if (!validateStep(currentStep)) return;
        await saveStepData(currentStep);
        setCurrentStep(prev => Math.min(prev + 1, 6));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePrev = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = async () => {
        if (!declaration) {
            toast.error('Please accept the declaration before submitting');
            return;
        }

        setIsSubmitting(true);
        try {
            if (applicationId) {
                const result = await submitApplication(applicationId);
                router.push(`/success?appId=${result.app_id}`);
            } else {
                // Demo mode - generate a fake app ID
                const fakeAppId = `QE2K26-DEMO-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
                router.push(`/success?appId=${fakeAppId}`);
            }
        } catch (err) {
            console.error('Submit error:', err);
            const fakeAppId = `QE2K26-DEMO-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
            router.push(`/success?appId=${fakeAppId}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'transparent', overflow: 'hidden' }}>
            <AnimatedBackground />
            <Navbar />

            <div style={{
                position: 'relative', zIndex: 1,
                maxWidth: '900px', margin: '0 auto',
                padding: '100px 24px 60px',
                flexGrow: 1,
                width: '100%',
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 style={{
                        fontSize: '1.8rem', fontWeight: 800, color: '#0f172a',
                        textAlign: 'center', marginBottom: '8px',
                        textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                        Internship Registration
                    </h1>
                    <p style={{
                        textAlign: 'center', color: '#64748b', fontSize: '0.95rem',
                        marginBottom: '32px',
                    }}>
                        Complete all steps to submit your application
                    </p>
                </motion.div>

                <ProgressBar currentStep={currentStep} totalSteps={6} stepNames={stepNames} />

                <AnimatePresence mode="wait">
                    {currentStep === 1 && (
                        <Step1Personal
                            key="step1"
                            data={personalData}
                            onChange={handlePersonalChange}
                            errors={errors}
                            files={files}
                            previews={previews}
                            onFileSelect={handleFileSelect}
                        />
                    )}
                    {currentStep === 2 && (
                        <Step2Academic
                            key="step2"
                            data={academicData}
                            onChange={handleAcademicChange}
                            errors={errors}
                        />
                    )}
                    {currentStep === 3 && (
                        <Step3Preferences
                            key="step3"
                            data={preferencesData}
                            onChange={handlePreferencesChange}
                            errors={errors}
                        />
                    )}
                    {currentStep === 4 && (
                        <Step4Projects
                            key="step4"
                            data={projectsData}
                            onChange={handleProjectsChange}
                            errors={errors}
                            files={files}
                            previews={previews}
                            onFileSelect={handleFileSelect}
                        />
                    )}
                    {currentStep === 5 && (
                        <Step5Payment
                            key="step5"
                            data={paymentData}
                            onChange={handlePaymentChange}
                            errors={errors}
                            files={files}
                            previews={previews}
                            onFileSelect={handleFileSelect}
                        />
                    )}
                    {currentStep === 6 && (
                        <Step6Review
                            key="step6"
                            formData={{
                                personal: personalData,
                                academic: academicData,
                                preferences: preferencesData,
                                projects: projectsData,
                                payment: paymentData,
                            }}
                            declaration={declaration}
                            onDeclarationChange={setDeclaration}
                            onEditStep={setCurrentStep}
                            previews={previews}
                        />
                    )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '32px',
                    gap: '16px',
                }}>
                    {currentStep > 1 ? (
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handlePrev}
                            className="btn-secondary"
                            style={{ flex: 1, maxWidth: '200px' }}
                        >
                            <HiArrowLeft /> Previous
                        </motion.button>
                    ) : (
                        <div />
                    )}

                    {currentStep < 6 ? (
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleNext}
                            className="btn-primary"
                            style={{ flex: 1, maxWidth: '200px' }}
                        >
                            Save & Next <HiArrowRight />
                        </motion.button>
                    ) : (
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleSubmit}
                            disabled={isSubmitting || !declaration}
                            className="btn-primary"
                            style={{
                                flex: 1, maxWidth: '260px',
                                background: declaration
                                    ? 'linear-gradient(135deg, #10b981, #059669)'
                                    : undefined,
                            }}
                        >
                            {isSubmitting ? (
                                <><div className="loading-spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }} /> Submitting...</>
                            ) : (
                                <><HiCheck size={20} /> Submit Application</>
                            )}
                        </motion.button>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
