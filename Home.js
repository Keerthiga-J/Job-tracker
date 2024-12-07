import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
    const [form, setForm] = useState({ title: '', company: '', status: '', interviewDate: '' });
    const [applications, setApplications] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token'));

    const fetchApplications = async () => {
        if (token) {
            const res = await axios.get('http://localhost:5000/api/applications', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setApplications(res.data);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/api/applications', form, {
            headers: { Authorization: `Bearer ${token}` },
        });
        fetchApplications(); // Fetch updated applications after adding one
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        fetchApplications();
    }, [token]);

    return (
        <div>
            <h1>Job Tracker</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Job Title" required />
                <input type="text" name="company" value={form.company} onChange={handleChange} placeholder="Company" required />
                <input type="text" name="status" value={form.status} onChange={handleChange} placeholder="Status" required />
                <input type="date" name="interviewDate" value={form.interviewDate} onChange={handleChange} />
                <button type="submit">Add Application</button>
            </form>

            <h2>Applications</h2>
            <ul>
                {applications.map((app) => (
                    <li key={app._id}>
                        {app.title} at {app.company} - {app.status} | Interview: {new Date(app.interviewDate).toLocaleDateString()}
                    </li>
                ))}
            </ul>

            {/* Link to Status Update page */}
            <Link to="/status">
                <button>Go to Status Update & Reminders</button>
            </Link>
        </div>
    );
}

export default Home;
