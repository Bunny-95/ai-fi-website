import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const GFGRegistration = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        college: '',
        year: '',
        branch: '',
        phone: '',
        email: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/register-gfg`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    college: formData.college === 'Other' ? formData.customCollege : formData.college,
                    branch: formData.branch === 'Other' ? formData.customBranch : formData.branch
                })
            });

            if (response.ok) {
                alert('Registration Successful!');
                navigate('/');
            } else {
                alert('Registration Failed.');
            }
        } catch (error) {
            console.error(error);
            alert('Error connecting to server.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div style={{ paddingTop: '100px', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
            <motion.div
                className="glass-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ width: '90%', maxWidth: '500px', padding: '2rem', height: 'fit-content' }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 className="text-gradient">GFG Contest Registration</h2>
                    <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>Close</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Full Name</label>
                        <input
                            required
                            value={formData.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: 'none', background: 'rgba(255,255,255,0.1)', color: '#fff' }}
                        />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>College</label>
                        <select
                            required
                            value={formData.college}
                            onChange={(e) => handleChange('college', e.target.value)}
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: 'none', background: 'rgba(255,255,255,0.1)', color: '#fff' }}
                        >
                            <option value="" style={{ color: '#000' }}>Select College</option>
                            <option value="REVA University" style={{ color: '#000' }}>REVA University</option>
                            <option value="Other" style={{ color: '#000' }}>Other</option>
                        </select>
                        {formData.college === 'Other' && (
                            <input
                                placeholder="Enter College Name"
                                value={formData.customCollege || ''}
                                onChange={(e) => handleChange('customCollege', e.target.value)}
                                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: 'none', background: 'rgba(255,255,255,0.1)', color: '#fff', marginTop: '0.5rem' }}
                            />
                        )}
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Year</label>
                        <select
                            required
                            value={formData.year}
                            onChange={(e) => handleChange('year', e.target.value)}
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: 'none', background: 'rgba(255,255,255,0.1)', color: '#fff' }}
                        >
                            <option value="" style={{ color: '#000' }}>Select Year</option>
                            <option value="1" style={{ color: '#000' }}>1st Year</option>
                            <option value="2" style={{ color: '#000' }}>2nd Year</option>
                            <option value="3" style={{ color: '#000' }}>3rd Year</option>
                            <option value="4" style={{ color: '#000' }}>4th Year</option>
                        </select>
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Branch</label>
                        <select
                            required
                            value={formData.branch}
                            onChange={(e) => handleChange('branch', e.target.value)}
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: 'none', background: 'rgba(255,255,255,0.1)', color: '#fff' }}
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
                        {formData.branch === 'Other' && (
                            <input
                                placeholder="Enter Branch Name"
                                value={formData.customBranch || ''}
                                onChange={(e) => handleChange('customBranch', e.target.value)}
                                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: 'none', background: 'rgba(255,255,255,0.1)', color: '#fff', marginTop: '0.5rem' }}
                            />
                        )}
                    </div>
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Phone Number</label>
                        <input
                            required
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            placeholder="+91 XXXXXXXXXX"
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: 'none', background: 'rgba(255,255,255,0.1)', color: '#fff' }}
                        />
                    </div> 
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
                        <input
                            required
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            placeholder="Enter Email"
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: 'none', background: 'rgba(255,255,255,0.1)', color: '#fff' }}
                        />
                    </div>

                     
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                            width: '100%',
                            background: '#2f8d46',
                            color: '#fff',
                            border: 'none',
                            padding: '12px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        {isSubmitting ? 'Registering...' : 'Confirm Registration'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default GFGRegistration;
