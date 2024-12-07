import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StatusUpdate() {
    const [applications, setApplications] = useState([]);
    const [status, setStatus] = useState('');
    const [selectedAppId, setSelectedAppId] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));

    // Fetch all applications
    const fetchApplications = async () => {
        if (token) {
            const res = await axios.get('http://localhost:5000/api/applications', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setApplications(res.data);
        }
    };

    // Handle status change for selected application
    const handleStatusChange = async () => {
        if (selectedAppId && status) {
            await axios.put(
                `http://localhost:5000/api/applications/${selectedAppId}`,
                { status },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchApplications(); // Refresh the list after status update
        }
    };

    // Filter applications to show reminders for upcoming interviews
    const today = new Date();
    const reminders = applications.filter((app) => new Date(app.interviewDate) >= today);

    useEffect(() => {
        fetchApplications();
    }, [token]);

    return (
        <div className="status-update">
            <h1>Status Update & Interview Reminders</h1>

            <h2>Upcoming Interview Reminders</h2>
            <ul>
                {reminders.length === 0 ? (
                    <p>No upcoming interviews</p>
                ) : (
                    reminders.map((app) => (
                        <li key={app._id}>
                            {app.title} at {app.company} - Interview on {new Date(app.interviewDate).toLocaleDateString()}
                        </li>
                    ))
                )}
            </ul>

            <h2>Update Application Status</h2>
            {/* Dropdown to select application */}
            <select onChange={(e) => setSelectedAppId(e.target.value)} value={selectedAppId}>
                <option value="">Select Application</option>
                {applications.map((app) => (
                    <option key={app._id} value={app._id}>
                        {app.title} at {app.company}
                    </option>
                ))}
            </select>

            {selectedAppId && (
                <div>
                    <input
                        type="text"
                        placeholder="Enter new status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    />
                    <button onClick={handleStatusChange}>Update Status</button>
                </div>
            )}

            <h2>All Applications</h2>
            <ul>
                {applications.map((app) => (
                    <li key={app._id}>
                        {app.title} at {app.company} - {app.status} | Interview: {new Date(app.interviewDate).toLocaleDateString()}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default StatusUpdate;
