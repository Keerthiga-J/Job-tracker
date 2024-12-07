import React from 'react';
import { useLocation } from 'react-router-dom';

function Success() {
    const location = useLocation();
    const { title, company, status, interviewDate } = location.state || {};

    return (
        <div>
            <h1>Application Added Successfully!</h1>
            <p>Your job application has been successfully submitted.</p>
            {title && company && status && interviewDate && (
                <div>
                    <h3>Application Details</h3>
                    <p><strong>Job Title:</strong> {title}</p>
                    <p><strong>Company:</strong> {company}</p>
                    <p><strong>Status:</strong> {status}</p>
                    <p><strong>Interview Date:</strong> {new Date(interviewDate).toLocaleDateString()}</p>
                </div>
            )}
        </div>
    );
}

export default Success;
