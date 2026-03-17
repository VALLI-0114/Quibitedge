'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AnimatedBackground from '../../components/AnimatedBackground';
import { HiArrowRight, HiClock, HiDesktopComputer, HiCurrencyRupee, HiCheckCircle } from 'react-icons/hi';

const domains = [
    {
        name: 'Cyber Security', color: '#ef4444',
        desc: 'Master ethical hacking, penetration testing, network security, vulnerability assessment, and incident response. Work with industry-standard tools like Kali Linux, Wireshark, and Metasploit.',
        skills: ['Ethical Hacking', 'Network Security', 'Penetration Testing', 'SIEM', 'Forensics'],
        duration: '4-8 Weeks', mode: 'Online / Hybrid', fee: '₹999',
    },
    {
        name: 'Artificial Intelligence', color: '#f59e0b',
        desc: 'Build intelligent systems using neural networks, natural language processing, computer vision, and reinforcement learning. Hands-on experience with TensorFlow, PyTorch, and OpenAI APIs.',
        skills: ['Deep Learning', 'NLP', 'Computer Vision', 'TensorFlow', 'PyTorch'],
        duration: '4-8 Weeks', mode: 'Online / Hybrid', fee: '₹999',
    },
    {
        name: 'Machine Learning', color: '#10b981',
        desc: 'Master predictive modeling, feature engineering, model evaluation, and deployment. Work with real datasets to build production-ready ML pipelines.',
        skills: ['Supervised Learning', 'Unsupervised Learning', 'Scikit-learn', 'Feature Engineering', 'MLOps'],
        duration: '4-8 Weeks', mode: 'Online / Hybrid', fee: '₹999',
    },
    {
        name: 'Data Science', color: '#3b82f6',
        desc: 'Learn data analysis, visualization, statistical modeling, and business intelligence. Extract actionable insights from complex datasets.',
        skills: ['Python', 'Pandas', 'Statistics', 'Tableau', 'SQL'],
        duration: '4-8 Weeks', mode: 'Online / Hybrid', fee: '₹999',
    },
    {
        name: 'Web Development', color: '#8b5cf6',
        desc: 'Build modern, responsive websites using HTML5, CSS3, JavaScript, React, and Next.js. Learn UI/UX principles and web performance optimization.',
        skills: ['HTML/CSS', 'JavaScript', 'React', 'Next.js', 'Responsive Design'],
        duration: '4-8 Weeks', mode: 'Online / Hybrid', fee: '₹999',
    },
    {
        name: 'Full Stack Development', color: '#ec4899',
        desc: 'Master both frontend and backend development. Build complete applications with React, Node.js, databases, APIs, and deployment.',
        skills: ['React', 'Node.js', 'MongoDB', 'REST APIs', 'DevOps'],
        duration: '4-8 Weeks', mode: 'Online / Hybrid', fee: '₹999',
    },
    {
        name: 'Python Development', color: '#06b6d4',
        desc: 'Build applications, APIs, automation scripts, and data tools with Python. Master Django, Flask, FastAPI, and Python best practices.',
        skills: ['Django', 'Flask', 'FastAPI', 'Automation', 'REST APIs'],
        duration: '4-8 Weeks', mode: 'Online / Hybrid', fee: '₹999',
    },
    {
        name: 'Java Development', color: '#f97316',
        desc: 'Enterprise software development with Java, Spring Boot, microservices, and Android development. Industry-standard practices and tools.',
        skills: ['Spring Boot', 'Microservices', 'JDBC', 'Android', 'Maven'],
        duration: '4-8 Weeks', mode: 'Online / Hybrid', fee: '₹999',
    },
    {
        name: 'Front-End Development', color: '#14b8a6',
        desc: 'Create stunning user interfaces with modern frameworks. Master React, Vue, or Angular with advanced CSS and animation techniques.',
        skills: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Figma'],
        duration: '4-8 Weeks', mode: 'Online / Hybrid', fee: '₹999',
    },
    {
        name: 'Back-End Development', color: '#6366f1',
        desc: 'Build scalable server-side applications, RESTful APIs, authentication systems, and database architectures.',
        skills: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'Docker'],
        duration: '4-8 Weeks', mode: 'Online / Hybrid', fee: '₹999',
    },
];

export default function InternshipPage() {
    return (
        <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <AnimatedBackground />
            <Navbar />

            <section style={{
                position: 'relative', zIndex: 1,
                maxWidth: '1200px', margin: '0 auto', padding: '120px 24px 40px',
                flexGrow: 1,
                width: '100%',
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ textAlign: 'center', marginBottom: '48px' }}
                >
                    <h1 style={{
                        fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800,
                        color: '#0f172a', marginBottom: '16px',
                    }}>
                        Explore Our{' '}
                        <span style={{
                            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                        }}>Internship Domains</span>
                    </h1>
                    <p style={{ color: '#64748b', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                        Choose from our wide range of technology domains and start building your career today.
                    </p>
                </motion.div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {domains.map((domain, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                            className="glass-card"
                            style={{ padding: '32px' }}
                        >
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr auto',
                                gap: '24px',
                                alignItems: 'start',
                            }}>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                        <div style={{
                                            width: '10px', height: '10px', borderRadius: '50%',
                                            background: domain.color,
                                        }} />
                                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>
                                            {domain.name}
                                        </h3>
                                    </div>
                                    <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.7, marginBottom: '16px' }}>
                                        {domain.desc}
                                    </p>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                                        {domain.skills.map((skill, j) => (
                                            <span key={j} style={{
                                                padding: '4px 12px', borderRadius: '100px', fontSize: '0.78rem',
                                                fontWeight: 500, background: `${domain.color}12`, color: domain.color,
                                                border: `1px solid ${domain.color}20`,
                                            }}>
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                                        {[
                                            { icon: <HiClock />, text: domain.duration },
                                            { icon: <HiDesktopComputer />, text: domain.mode },
                                            { icon: <HiCurrencyRupee />, text: domain.fee },
                                            { icon: <HiCheckCircle />, text: 'Certificate Included' },
                                        ].map((info, j) => (
                                            <div key={j} style={{
                                                display: 'flex', alignItems: 'center', gap: '6px',
                                                fontSize: '0.82rem', color: '#64748b',
                                            }}>
                                                <span style={{ color: domain.color }}>{info.icon}</span>
                                                {info.text}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <Link href="/register" style={{ textDecoration: 'none' }}>
                                    <motion.button
                                        whileHover={{ scale: 1.04 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="btn-primary"
                                        style={{ whiteSpace: 'nowrap' }}
                                    >
                                        Apply <HiArrowRight />
                                    </motion.button>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}
