import React, { useState, useEffect } from 'react';
import axios from 'axios';

// JobTracker Component (Main App)
function JobTracker() {
    const [form, setForm] = useState({ title: '', company: '', status: '', interviewDate: '' });
    const [applications, setApplications] = useState([]);

    // Fetch applications from the backend
    const fetchApplications = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/applications');
            setApplications(res.data);
        } catch (error) {
            console.error('Error fetching applications:', error);
        }
    };

    // Submit a new application
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/applications', form);
            setForm({ title: '', company: '', status: '', interviewDate: '' }); // Reset form
            fetchApplications(); // Refresh application list
        } catch (error) {
            console.error('Error adding application:', error);
        }
    };

    // Update application status
    const updateStatus = async (id, status) => {
        try {
            await axios.put(`http://localhost:5000/api/applications/${id}`, { status });
            fetchApplications(); // Refresh after update
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    useEffect(() => {
        fetchApplications(); // Fetch applications when component mounts
    }, []);

    return (
        <div>
            <h1>Job Tracker</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Job Title"
                    required
                />
                <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="Company"
                    required
                />
                <input
                    type="text"
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    placeholder="Status"
                    required
                />
                <input
                    type="date"
                    value={form.interviewDate}
                    onChange={(e) => setForm({ ...form, interviewDate: e.target.value })}
                />
                <button type="submit">Add Application</button>
            </form>

            <div>
                <h2>Applications</h2>
                <ul>
                    {applications.map((app) => (
                        <li key={app._id}>
                            {app.title} at {app.company} - {app.status} | Interview: {new Date(app.interviewDate).toLocaleDateString()}
                            <button onClick={() => updateStatus(app._id, 'Interviewed')}>Update Status to Interviewed</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default JobTracker;
