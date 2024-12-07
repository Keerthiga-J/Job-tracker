import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
    const [applications, setApplications] = useState([]);
    const [newApplication, setNewApplication] = useState({
        title: "",
        company: "",
        status: "",
        interviewDate: "",
    });

    useEffect(() => {
        const fetchApplications = async () => {
            const response = await axios.get("http://localhost:5000/api/applications");
            setApplications(response.data);
        };
        fetchApplications();
    }, []);

    const handleAddApplication = async () => {
        if (!newApplication.title || !newApplication.company || !newApplication.status || !newApplication.interviewDate) {
            alert("Please fill in all fields!");
            return;
        }
        try {
            const response = await axios.post("http://localhost:5000/api/applications", newApplication);
            setApplications([...applications, newApplication]);
            setNewApplication({ title: "", company: "", status: "", interviewDate: "" });
        } catch (error) {
            console.error("There was an error adding the application!", error);
        }
    };

    return (
        <div>
            <h2>Job Applications</h2>

            <div>
                <h3>Add New Application</h3>
                <input
                    type="text"
                    placeholder="Title"
                    value={newApplication.title}
                    onChange={(e) => setNewApplication({ ...newApplication, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Company"
                    value={newApplication.company}
                    onChange={(e) => setNewApplication({ ...newApplication, company: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Status"
                    value={newApplication.status}
                    onChange={(e) => setNewApplication({ ...newApplication, status: e.target.value })}
                />
                <input
                    type="date"
                    value={newApplication.interviewDate}
                    onChange={(e) => setNewApplication({ ...newApplication, interviewDate: e.target.value })}
                />
                <button onClick={handleAddApplication}>Add Application</button>
            </div>

            <h3>Applications</h3>
            {applications.length === 0 ? (
                <p>No job applications available.</p>
            ) : (
                <ul>
                    {applications.map((application, index) => (
                        <li key={index}>
                            <h4>{application.title}</h4>
                            <p>Company: {application.company}</p>
                            <p>Status: {application.status}</p>
                            <p>Interview Date: {application.interviewDate}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dashboard;
