const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    status: { type: String, default: "Pending" },
    interviewDates: { type: [Date], default: [] },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Application", ApplicationSchema);
