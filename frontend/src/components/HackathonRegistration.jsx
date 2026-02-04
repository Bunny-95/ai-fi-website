import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

const HackathonRegistration = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        teamName: '',
        teamSize: 2,
        members: []
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleTeamSizeChange = (e) => {
        const size = parseInt(e.target.value);
        setFormData(prev => ({
            ...prev,
            teamSize: size,
            members: Array(size).fill({ name: '', college: '', year: '', branch: '', phone: '', email: '' })
        }));
    };

    const handleMemberChange = (index, field, value) => {
        const updatedMembers = [...formData.members];
        updatedMembers[index] = { ...updatedMembers[index], [field]: value };
        setFormData(prev => ({ ...prev, members: updatedMembers }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/register-hackathon`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    members: formData.members.map(m => ({
                        ...m,
                        college: m.college === 'Other' ? m.customCollege : m.college,
                        branch: m.branch === 'Other' ? m.customBranch : m.branch
                    }))
                })
            });

            if (response.ok) {
                alert('Registration Successful!');
                navigate('/');
            } else {
                alert('Registration Failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error connecting to server.');
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
    if (formData.members.length === 0) {
        setFormData(prev => ({
            ...prev,
            members: Array(prev.teamSize).fill({
                name: '',
                college: '',
                year: '',
                branch: '',
                phone: '',
                email: ''
            })
        }));
    }
}, [formData.members.length, formData.teamSize]);


    return (
        <div style={{ paddingTop: '100px', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
            <motion.div
                className="glass-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ width: '90%', maxWidth: '800px', padding: '2rem', height: 'fit-content' }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 className="text-gradient">Hackathon Registration</h2>
                    <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>Close</button>
                </div>

                <form onSubmit={(e) => e.preventDefault()}>
                    {step === 1 && (
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                        >
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Team Name</label>
                                <input
                                    type="text"
                                    value={formData.teamName}
                                    onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                                    style={{ width: '100%', padding: '10px', borderRadius: '5px', border: 'none', background: 'rgba(255,255,255,0.1)', color: '#fff' }}
                                    required
                                />
                            </div>
                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Team Size (2-4 Members)</label>
                                <select
                                    value={formData.teamSize}
                                    onChange={handleTeamSizeChange}
                                    style={{ width: '100%', padding: '10px', borderRadius: '5px', border: 'none', background: 'rgba(255,255,255,0.1)', color: '#fff' }}
                                >
                                    <option value={2} style={{ color: '#000' }}>2 Members</option>
                                    <option value={3} style={{ color: '#000' }}>3 Members</option>
                                    <option value={4} style={{ color: '#000' }}>4 Members</option>
                                </select>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <button
                                    onClick={() => formData.teamName && setStep(2)}
                                    style={{
                                        background: 'var(--primary-cyan)',
                                        color: '#000',
                                        border: 'none',
                                        padding: '10px 20px',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Next <ChevronRight size={16} style={{ verticalAlign: 'middle' }} />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                        >
                            <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary-cyan)' }}>Member Details</h3>
                            {formData.members.map((member, index) => (
                                <div key={index} style={{ marginBottom: '2rem', paddingBottom: '1rem', borderBottom: index < formData.teamSize - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
                                    <h4 style={{ marginBottom: '1rem' }}>Member {index + 1}</h4>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <input
                                            placeholder="Name"
                                            value={member.name}
                                            onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                                            style={{ padding: '10px', borderRadius: '5px', border: 'none', background: 'rgba(255,255,255,0.1)', color: '#fff' }}
                                        />
                                        <select
                                            value={member.college}
                                            onChange={(e) => handleMemberChange(index, 'college', e.target.value)}
                                            style={{ padding: '10px', borderRadius: '5px', border: 'none', background: 'rgba(255,255,255,0.1)', color: '#fff' }}
                                        >
                                            <option value="" style={{ color: '#000' }}>Select College</option>
                                            <option value="REVA University" style={{ color: '#000' }}>REVA University</option>
                                            <option value="Other" style={{ color: '#000' }}>Other</option>
                                        </select>
                                        {member.college === 'Other' && (
                                            <input
                                                placeholder="Enter College Name"
                                                value={member.customCollege || ''}
                                                onChange={(e) => handleMemberChange(index, 'customCollege', e.target.value)}
                                                style={{ padding: '10px', borderRadius: '5px', border: 'none', background: 'rgba(255,255,255,0.1)', color: '#fff', marginTop: '0.5rem', gridColumn: 'span 2' }}
                                            />
                                        )}
                                        <select
                                            value={member.year}
                                            onChange={(e) => handleMemberChange(index, 'year', e.target.value)}
                                            style={{ padding: '10px', borderRadius: '5px', border: 'none', background: 'rgba(255,255,255,0.1)', color: '#fff' }}
                                        >
                                            <option value="" style={{ color: '#000' }}>Select Year</option>
                                            <option value="1" style={{ color: '#000' }}>1st Year</option>
                                            <option value="2" style={{ color: '#000' }}>2nd Year</option>
                                            <option value="3" style={{ color: '#000' }}>3rd Year</option>
                                            <option value="4" style={{ color: '#000' }}>4th Year</option>
                                        </select>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            <select
                                                value={member.branch}
                                                onChange={(e) => handleMemberChange(index, 'branch', e.target.value)}
                                                style={{ padding: '10px', borderRadius: '5px', border: 'none', background: 'rgba(255,255,255,0.1)', color: '#fff', width: '100%' }}
                                            >
                                                <option value="" style={{ color: '#000' }}>Select Branch</option>
                                                <option value="CSE" style={{ color: '#000' }}>CSE</option>
                                                <option value="AI&DS" style={{ color: '#000' }}>AI & DS</option>
                                                <option value="AI&ML" style={{ color: '#000' }}>AI & ML</option>
                                                <option value="ISE" style={{ color: '#000' }}>ISE</option>
                                                <option value="ECE" style={{ color: '#000' }}>ECE</option>
                                                <option value="EEE" style={{ color: '#000' }}>EEE</option>
                                                <option value="Mechanical" style={{ color: '#000' }}>Mechanical</option>
                                                <option value="Civil" style={{ color: '#000' }}>Civil</option>
                                                <option value="Bio-Tech" style={{ color: '#000' }}>Bio-Tech</option>
                                                <option value="Robotics" style={{ color: '#000' }}>Robotics</option>
                                                <option value="Aerospace" style={{ color: '#000' }}>Aerospace</option>
                                                <option value="Other" style={{ color: '#000' }}>Other</option>
                                            </select>
                                            {member.branch === 'Other' && (
                                                <input
                                                    placeholder="Enter Branch Name"
                                                    value={member.customBranch || ''}
                                                    onChange={(e) => handleMemberChange(index, 'customBranch', e.target.value)}
                                                    style={{ padding: '10px', borderRadius: '5px', border: 'none', background: 'rgba(255,255,255,0.1)', color: '#fff', width: '100%' }}
                                                />
                                            )}
                                                <input
                                                    type="tel"
                                                    placeholder="Phone Number"
                                                    value={member.phone}
                                                    onChange={(e) => handleMemberChange(index, 'phone', e.target.value)}
                                                    pattern="[0-9]{10}"
                                                    required
                                                    style={{
                                                        padding: '10px',
                                                        borderRadius: '5px',
                                                        border: 'none',
                                                        background: 'rgba(255,255,255,0.1)',
                                                        color: '#fff',
                                                        width: '100%'
                                                      }}
                                                />
                                                <input
                                                      type="email"
                                                      placeholder="Email Address"
                                                      value={member.email}
                                                      onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
                                                      required
                                                      style={{
                                                        padding: '10px',
                                                        borderRadius: '5px',
                                                        border: 'none',
                                                        background: 'rgba(255,255,255,0.1)',
                                                        color: '#fff',
                                                        width: '100%'
                                                      }}
                                                    />


                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                                <button
                                    onClick={() => setStep(1)}
                                    style={{
                                        background: 'transparent',
                                        color: '#fff',
                                        border: '1px solid #fff',
                                        padding: '10px 20px',
                                        borderRadius: '5px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <ChevronLeft size={16} style={{ verticalAlign: 'middle' }} /> Back
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    style={{
                                        background: 'var(--primary-cyan)',
                                        color: '#000',
                                        border: 'none',
                                        padding: '10px 30px',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        fontWeight: 'bold',
                                        opacity: isSubmitting ? 0.7 : 1
                                    }}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </form>
            </motion.div>
        </div>
    );
};

export default HackathonRegistration;
