// client/src/components/JobPostForm.jsx

import React, { useState } from 'react';
import axios from 'axios';

// The base URL is automatically handled by the proxy in package.json

const JobPostForm = () => {
    // 1. State for form data
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        wage: '',
        serviceType: 'Cleaning', // Default value
    });
    const [statusMessage, setStatusMessage] = useState('');

    // 2. State for the submit button
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 3. Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // 4. Handle form submission (The core logic)
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simple validation check
        if (!formData.title || !formData.description || !formData.wage) {
            setStatusMessage('Please fill in all required fields.');
            return;
        }

        setIsSubmitting(true); // Disable button during submission
        setStatusMessage('Submitting job request...');

        try {
            // CRITICAL: POST request to the backend. Assumes endpoint is /api/jobs
            const response = await axios.post('/api/jobs', formData);

            console.log('Success! Job Data:', response.data);
            setStatusMessage(`Job posted successfully! ID: ${response.data._id}`);
            
            // Clear the form for the next posting
            setFormData({ title: '', description: '', wage: '', serviceType: 'Cleaning' });
            
            // NOTE: If the backend needs a specific resident ID, you'll need to add it to formData.

        } catch (error) {
            console.error('API Error:', error.response ? error.response.data : error.message);
            setStatusMessage(`Error: ${error.response ? error.response.data.message : 'Could not connect to server.'}`);
        } finally {
            setIsSubmitting(false); // Re-enable button
        }
    };

    return (
        <div className="form-container">
            <h3>Post a New Service Request (Resident View)</h3>
            <form onSubmit={handleSubmit}>
                
                {/* Title */}
                <div>
                    <label>Job Title:</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                </div>

                {/* Description */}
                <div>
                    <label>Description:</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} required />
                </div>

                {/* Wage */}
                <div>
                    <label>Monthly Wage (INR):</label>
                    <input type="number" name="wage" value={formData.wage} onChange={handleChange} required />
                </div>

                {/* Service Type */}
                <div>
                    <label>Service Type:</label>
                    <select name="serviceType" value={formData.serviceType} onChange={handleChange}>
                        <option value="Cleaning">Cleaning</option>
                        <option value="Cooking">Cooking</option>
                        <option value="Caretaker">Caretaker</option>
                        <option value="Driver">Driver</option>
                    </select>
                </div>

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Posting...' : 'Submit Request'}
                </button>
            </form>
            {statusMessage && <p className="status-message">{statusMessage}</p>}
        </div>
    );
};

export default JobPostForm;