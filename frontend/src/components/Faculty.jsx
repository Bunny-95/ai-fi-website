import React from 'react';
import { motion } from 'framer-motion';
import drRashmiImage from '../assets/dr-rashmi.jpg';

const Faculty = () => {
    return (
        <section className="section-container">
            <h2 className="text-gradient heading-md">
                Faculty Coordinator
            </h2>
            <motion.div
                className="glass-card neon-border"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{
                    maxWidth: '450px',
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <div style={{
                    width: 'min(150px, 40vw)',
                    height: 'min(150px, 40vw)',
                    borderRadius: '50%',
                    background: 'var(--bg-space)',
                    border: '2px solid var(--primary-cyan)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                    overflow: 'hidden'
                }}>
                    <img
                        src={drRashmiImage}
                        alt="Dr. Rashmi C"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Dr. Rashmi C</h3>
                <p style={{ color: 'var(--primary-cyan)', marginBottom: '1rem', fontWeight: 'bold' }}>Faculty Coordinator - AIFi</p>
                <div style={{ color: 'var(--text-dim)', fontSize: '0.9rem', textAlign: 'left', width: '100%' }}>
                    <p style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                        School of Computer Science & Engineering<br />
                        REVA University
                    </p>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <h4 style={{ color: 'var(--primary-cyan)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Areas Of Interest</h4>
                        <p style={{ lineHeight: '1.4' }}>Machine Learning, Natural Language Processing, Social Network Analysis</p>
                        <p style={{ fontSize: '0.85rem', marginTop: '0.3rem' }}>Guided more than 20 UG projects and 5 PG projects</p>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <h4 style={{ color: 'var(--primary-cyan)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Research Publication</h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff' }}>18</span>
                            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.85rem' }}>
                                <li>• Conferences: 20</li>
                                <li>• Seminars: 10</li>
                                <li>• Workshops: 8</li>
                            </ul>
                        </div>
                    </div>

                    <p style={{ color: 'var(--secondary-purple)', fontWeight: 'bold', marginBottom: '1rem', fontSize: '0.85rem', lineHeight: '1.4' }}>
                        🏆 Got best IEEE Award - 2 Project Proposals funded by Indian Government
                    </p>

                    <a href="mailto:rashmi.c@reva.edu.in" style={{
                        color: 'var(--primary-cyan)',
                        textDecoration: 'none',
                        display: 'block',
                        wordBreak: 'break-all',
                        textAlign: 'center',
                        marginTop: '1rem',
                        padding: '0.5rem',
                        border: '1px solid rgba(0, 242, 255, 0.2)',
                        borderRadius: '8px'
                    }}>
                        rashmi.c@reva.edu.in
                    </a>
                </div>
            </motion.div>
        </section>
    );
};

export default Faculty;
