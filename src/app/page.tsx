'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnimatedBackground from '../components/AnimatedBackground';
import {
  HiShieldCheck, HiCode, HiLightningBolt, HiAcademicCap,
  HiDesktopComputer, HiChartBar, HiGlobe, HiUserGroup,
  HiArrowRight, HiStar, HiClock, HiBriefcase,
} from 'react-icons/hi';

const domains = [
  { name: 'Cyber Security', icon: <HiShieldCheck size={28} />, color: '#ef4444', desc: 'Learn ethical hacking, penetration testing & security protocols' },
  { name: 'Artificial Intelligence', icon: <HiLightningBolt size={28} />, color: '#f59e0b', desc: 'Build intelligent systems with neural networks & deep learning' },
  { name: 'Machine Learning', icon: <HiChartBar size={28} />, color: '#10b981', desc: 'Predictive modeling, data analysis & algorithm development' },
  { name: 'Data Science', icon: <HiChartBar size={28} />, color: '#3b82f6', desc: 'Extract insights from data using statistical methods' },
  { name: 'Web Development', icon: <HiGlobe size={28} />, color: '#8b5cf6', desc: 'Build modern websites with cutting-edge technologies' },
  { name: 'Full Stack Development', icon: <HiCode size={28} />, color: '#ec4899', desc: 'Master both frontend and backend development' },
  { name: 'Python Development', icon: <HiDesktopComputer size={28} />, color: '#06b6d4', desc: 'Build applications, APIs & automation with Python' },
  { name: 'Java Development', icon: <HiDesktopComputer size={28} />, color: '#f97316', desc: 'Enterprise software, Android apps & Spring Boot' },
];

const features = [
  { icon: <HiAcademicCap size={24} />, title: 'Expert Mentorship', desc: 'Learn from industry professionals with years of experience' },
  { icon: <HiBriefcase size={24} />, title: 'Real Projects', desc: 'Work on production-grade projects for your portfolio' },
  { icon: <HiStar size={24} />, title: 'Certificate', desc: 'Receive industry-recognized certification upon completion' },
  { icon: <HiClock size={24} />, title: 'Flexible Schedule', desc: 'Online & hybrid modes to fit your schedule' },
  { icon: <HiUserGroup size={24} />, title: 'Community', desc: 'Join a thriving community of 5000+ interns' },
  { icon: <HiGlobe size={24} />, title: 'Global Exposure', desc: 'Collaborate with peers from across the country' },
];

const stats = [
  { value: '5000+', label: 'Students Trained' },
  { value: '12+', label: 'Domains' },
  { value: '95%', label: 'Placement Rate' },
  { value: '4.9★', label: 'Average Rating' },
];

export default function HomePage() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <AnimatedBackground />
      <Navbar />

      <main style={{ flexGrow: 1 }}>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        zIndex: 1,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px 60px',
      }}>
        <div style={{ maxWidth: '900px', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span style={{
              display: 'inline-block',
              padding: '8px 20px',
              background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(168,85,247,0.1))',
              borderRadius: '100px',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#6366f1',
              marginBottom: '24px',
              border: '1px solid rgba(99,102,241,0.15)',
            }}>
              ✨ Applications Open for Summer 2K26
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 4rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: '24px',
              color: '#0f172a',
            }}
          >
            Launch Your Tech Career with{' '}
            <span style={{
              background: 'linear-gradient(135deg, #6366f1, #a855f7, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200% 200%',
              animation: 'gradient-shift 3s ease infinite',
            }}>
              QubitEdge
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{
              fontSize: '1.15rem',
              color: '#475569',
              lineHeight: 1.7,
              maxWidth: '650px',
              margin: '0 auto 40px',
            }}
          >
            Gain real-world experience in Cyber Security, AI, Machine Learning, Web Development,
            and more. Work on production projects with expert mentors.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Link href="/register" style={{ textDecoration: 'none' }}>
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary"
                style={{ padding: '16px 36px', fontSize: '1.05rem' }}
              >
                Register Now <HiArrowRight />
              </motion.button>
            </Link>
            <Link href="/internship" style={{ textDecoration: 'none' }}>
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="btn-secondary"
                style={{ padding: '16px 36px', fontSize: '1.05rem' }}
              >
                View Internships
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '40px',
              marginTop: '60px',
              flexWrap: 'wrap',
            }}
          >
            {stats.map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '1.8rem',
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ position: 'relative', zIndex: 1, padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
            Why Choose QubitEdge?
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.05rem' }}>
            Everything you need to kickstart your tech career
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
        }}>
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass-card"
              style={{
                padding: '28px',
                display: 'flex',
                gap: '16px',
                alignItems: 'flex-start',
              }}
            >
              <div style={{
                width: '48px', height: '48px', borderRadius: '14px',
                background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(168,85,247,0.1))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#6366f1', flexShrink: 0,
              }}>
                {feature.icon}
              </div>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#1e293b', marginBottom: '6px' }}>
                  {feature.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.6 }}>
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Domains Section */}
      <section style={{ position: 'relative', zIndex: 1, padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
            Internship Domains
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.05rem' }}>
            Choose from 12+ cutting-edge technology domains
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px',
        }}>
          {domains.map((domain, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="domain-card"
            >
              <div style={{
                width: '52px', height: '52px', borderRadius: '14px',
                background: `${domain.color}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: domain.color, marginBottom: '14px',
              }}>
                {domain.icon}
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#1e293b', marginBottom: '6px' }}>
                {domain.name}
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.6 }}>
                {domain.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginTop: '48px' }}
        >
          <Link href="/register" style={{ textDecoration: 'none' }}>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary"
              style={{ padding: '16px 40px', fontSize: '1.05rem' }}
            >
              Start Your Application <HiArrowRight />
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section style={{ position: 'relative', zIndex: 1, padding: '80px 24px', maxWidth: '800px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card"
          style={{
            padding: '48px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(168,85,247,0.08))',
          }}
        >
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>
            Ready to Begin Your Journey?
          </h2>
          <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '32px', lineHeight: 1.7 }}>
            Join thousands of students who have transformed their careers through our internship program.
            Limited seats available for Summer 2K26!
          </p>
          <Link href="/register" style={{ textDecoration: 'none' }}>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary"
              style={{ padding: '16px 40px', fontSize: '1.05rem' }}
            >
              Apply Now — It&apos;s Free to Register <HiArrowRight />
            </motion.button>
          </Link>
        </motion.div>
      </section>
      </main>

      <Footer />
    </div>
  );
}
