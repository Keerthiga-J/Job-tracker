const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Setup express app
const app = express();

// Middleware
app.use(express.json());  // Parse incoming JSON
app.use(cors());          // Allow cross-origin requests
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/jobTracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Failed to connect to MongoDB", err));

// Define the Application schema and model
const applicationSchema = new mongoose.Schema({
    title: String,
    company: String,
    status: String,
    interviewDate: Date,
});

const Application = mongoose.model('Application', applicationSchema);

// Routes for CRUD operations

// Get all applications
app.get('/api/applications', async (req, res) => {
    try {
        const applications = await Application.find();
        res.json(applications);
    } catch (err) {
        res.status(500).send('Error fetching applications');
    }
});

// Create a new application
app.post('/api/applications', async (req, res) => {
    const { title, company, status, interviewDate } = req.body;
    try {
        const newApplication = new Application({ title, company, status, interviewDate });
        await newApplication.save();
        res.json(newApplication);
    } catch (err) {
        res.status(500).send('Error adding application');
    }
});

// Update application status
app.put('/api/applications/:id', async (req, res) => {
    const { status } = req.body;
    try {
        const updatedApplication = await Application.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json(updatedApplication);
    } catch (err) {
        res.status(500).send('Error updating status');
    }
});

// Start the server
app.listen(5000, () => {
    console.log("Backend server running on http://localhost:5000");
});
