import React from 'react';
import { motion } from 'framer-motion';
import { useAnimation } from '../context/AnimationContext';

const Hero = () => {
    const { triggerWarp } = useAnimation();
    return (
        <section style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '2rem'
        }}>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-gradient" style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    AIFi – THE AIML CLUB
                </h1>
                <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem', marginBottom: '2rem' }}>
                    SCHOOL OF COMPUTER SCIENCE AND ENGINEERING<br />
                    REVA UNIVERSITY, BENGALURU, INDIA
                </p>
            </motion.div>

            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="neon-border"
                style={{
                    borderRadius: '50%',
                    padding: '10px',
                    width: '220px',
                    height: '220px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(5, 5, 16, 0.8)',
                    marginBottom: '2rem'
                }}
            >
                <img
                    src="/logo.jpg"
                    alt="AIFi Logo"
                    style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%' }}
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
            >
                <p style={{ fontSize: '1.5rem', marginBottom: '2rem', letterSpacing: '2px' }}>
                    Innovate. Learn. Lead.
                </p>
                <button
                    onClick={() => {
                        triggerWarp();
                        const element = document.getElementById('upcoming-events');
                        if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }}
                    style={{
                        background: 'var(--primary-cyan)',
                        color: 'var(--bg-space)',
                        border: 'none',
                        padding: '12px 30px',
                        fontSize: '1.2rem',
                        borderRadius: '30px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        boxShadow: 'var(--glow-cyan)'
                    }}
                    className="hover-effect"
                >
                    Explore Events
                </button>
            </motion.div>
        </section>
    );
};

export default Hero;
