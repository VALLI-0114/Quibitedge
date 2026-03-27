'use client';

import Link from 'next/link';
import { FaLinkedin, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';

export default function Footer() {
    return (
        <footer style={{
            background: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(20px)',
            color: '#334155',
            marginTop: '80px',
        }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '60px 24px 30px' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '40px',
                    marginBottom: '40px',
                }}>
                    {/* Brand */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                            <img 
                                src="https://qubitedge.in/wp-content/uploads/2025/07/logo-shorter.png" 
                                alt="QubitEdge Logo"
                                style={{ height: '36px', width: 'auto', objectFit: 'contain' }}
                            />
                        </div>
                        <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: '1.7', maxWidth: '260px' }}>
                            Empowering the next generation of tech leaders through immersive summer internship experiences.
                        </p>
                        <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                            {[FaLinkedin, FaTwitter, FaInstagram, FaGithub].map((Icon, i) => (
                                <a key={i} href="#" style={{
                                    width: '36px', height: '36px', borderRadius: '10px',
                                    background: 'rgba(255,255,255,0.08)', display: 'flex',
                                    alignItems: 'center', justifyContent: 'center',
                                    color: '#64748b', transition: 'all 0.2s',
                                    textDecoration: 'none',
                                }}
                                    onMouseEnter={(e) => { e.currentTarget.style.background = '#6366f1'; e.currentTarget.style.color = 'white'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#94a3b8'; }}
                                >
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '16px', color: 'white' }}>Quick Links</h4>
                        {[
                            { name: 'Home', href: '/' },
                            { name: 'Internships', href: '/internship' },
                            { name: 'Register', href: '/register' },
                            { name: 'Track Status', href: '/status' },
                            { name: 'Admin', href: '/admin' },
                        ].map((link) => (
                            <Link key={link.name} href={link.href} style={{
                                display: 'block', padding: '6px 0', color: '#64748b',
                                fontSize: '0.85rem', textDecoration: 'none', transition: 'color 0.2s',
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.color = '#818cf8'}
                                onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Domains */}
                    <div>
                        <h4 style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '16px', color: 'white' }}>Internship Domains</h4>
                        {['Cyber Security', 'Artificial Intelligence', 'Web Development', 'Data Science', 'Full Stack Dev'].map((d) => (
                            <p key={d} style={{ padding: '6px 0', color: '#64748b', fontSize: '0.85rem' }}>{d}</p>
                        ))}
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '16px', color: 'white' }}>Contact Us</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {[
                                { icon: <HiMail />, text: 'internships@qubitedge.com' },
                                { icon: <HiPhone />, text: '+91 98765 43210' },
                                { icon: <HiLocationMarker />, text: 'Hyderabad, India' },
                            ].map((item, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#64748b', fontSize: '0.85rem' }}>
                                    <span style={{ color: '#818cf8' }}>{item.icon}</span>
                                    {item.text}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div style={{
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                    paddingTop: '24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '12px',
                }}>
                    <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
                        © 2026 QubitEdge. All rights reserved. | Designed by <a href="https://www.linkedin.com/in/kundum-pravallika-4a1249296/" target="_blank" rel="noopener noreferrer" style={{ color: '#818cf8', textDecoration: 'none', fontWeight: 600 }}>Pravallika</a>
                    </p>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((t) => (
                            <a key={t} href="#" style={{ fontSize: '0.8rem', color: '#64748b', textDecoration: 'none' }}
                                onMouseEnter={(e) => e.currentTarget.style.color = '#818cf8'}
                                onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
                            >{t}</a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
