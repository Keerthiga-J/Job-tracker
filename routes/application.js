const express = require("express");
const Application = require("../models/Application");
const jwt = require("jsonwebtoken");

const router = express.Router();

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Access denied" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        res.status(400).json({ error: "Invalid token" });
    }
};

router.post("/", authMiddleware, async (req, res) => {
    const application = new Application({ ...req.body, createdBy: req.user.id });
    try {
        const savedApp = await application.save();
        res.json(savedApp);
    } catch (err) {
        res.status(500).json({ error: "Could not save application" });
    }
});

router.get("/", authMiddleware, async (req, res) => {
    try {
        const applications = await Application.find({ createdBy: req.user.id });
        res.json(applications);
    } catch (err) {
        res.status(500).json({ error: "Could not fetch applications" });
    }
});

router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const updatedApp = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedApp);
    } catch (err) {
        res.status(500).json({ error: "Could not update application" });
    }
});

router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        await Application.findByIdAndDelete(req.params.id);
        res.json({ message: "Application deleted" });
    } catch (err) {
        res.status(500).json({ error: "Could not delete application" });
    }
});

module.exports = router;
