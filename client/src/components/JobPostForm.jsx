// client/src/components/JobPostForm.jsx

import React, { useState } from 'react';
import axios from 'axios';
// Bootstrap CSS must be imported in client/src/index.js for these classes to work

const JobPostForm = () => {
    // 1. State for form data
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        wage: '',
        serviceType: 'Cleaning', // Default value
    });
    const [statusMessage, setStatusMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 2. Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // 3. Handle form submission (The core API call)
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simple validation check
        if (!formData.title || !formData.description || !formData.wage) {
            setStatusMessage('Please fill in all required fields.');
            return;
        }

        setIsSubmitting(true);
        setStatusMessage('Submitting job request...');

        try {
            // CRITICAL: POST request to the backend. Proxy handles the http://localhost:5000 part.
            const response = await axios.post('/api/jobs', formData);

            console.log('Success! Job Data:', response.data);
            setStatusMessage(`Success! Job posted. ID: ${response.data._id}`);
            
            // Clear the form after success
            setFormData({ title: '', description: '', wage: '', serviceType: 'Cleaning' });
            

        } catch (error) {
            console.error('API Error:', error.response ? error.response.data : error.message);
            const errorMessage = error.response?.data?.message || 'Could not connect to server. Check if backend is running.';
            setStatusMessage(`Error posting job: ${errorMessage}`);
        } finally {
            setIsSubmitting(false); // Re-enable button
        }
    };

    return (
        // Use Bootstrap container for centering and padding
        <div className="container mt-4"> 
            <div className="card shadow p-4 mx-auto" style={{ maxWidth: '600px' }}>
                <h3 className="card-title text-primary text-center mb-4">
                    Post a New Service Request
                </h3>
                
                <form onSubmit={handleSubmit}>
                    
                    {/* Title Input Group */}
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Job Title:</label>
                        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="form-control" placeholder="E.g., Daily Home Cleaning" required />
                    </div>

                    {/* Description Input Group */}
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description:</label>
                        <textarea id="description" name="description" value={formData.description} onChange={handleChange} className="form-control" rows="3" placeholder="Detailed tasks and timings required." required />
                    </div>

                    <div className="row mb-4">
                        {/* Wage Input Group */}
                        <div className="col-md-6 mb-3 mb-md-0">
                            <label htmlFor="wage" className="form-label">Monthly Wage (₹):</label>
                            <input type="number" id="wage" name="wage" value={formData.wage} onChange={handleChange} className="form-control" placeholder="12000" required />
                        </div>
                        
                        {/* Service Type Select Group */}
                        <div className="col-md-6">
                            <label htmlFor="serviceType" className="form-label">Service Type:</label>
                            <select id="serviceType" name="serviceType" value={formData.serviceType} onChange={handleChange} className="form-select">
                                <option value="Cleaning">Cleaning</option>
                                <option value="Cooking">Cooking</option>
                                <option value="Caretaker">Caretaker</option>
                                <option value="Driver">Driver</option>
                            </select>
                        </div>
                    </div>

                    <button type="submit" disabled={isSubmitting} className="btn btn-success w-100">
                        {isSubmitting ? 'Posting...' : 'Submit Request'}
                    </button>
                </form>
                
                {/* Status Message Display */}
                {statusMessage && (
                    <div className={`mt-4 p-3 rounded text-center ${statusMessage.includes('Success') ? 'bg-success text-white' : 'bg-danger text-white'}`}>
                        {statusMessage}
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobPostForm;