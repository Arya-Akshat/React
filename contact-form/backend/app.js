// backend/app.js
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const port = 5001; // Keep the port that works for you
const MESSAGES_FILE = path.join(__dirname, 'messages.json');

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- API Route ---
app.post('/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newSubmission = {
            name,
            email,
            message,
            submittedAt: new Date().toISOString()
        };

        // --- This is the file-saving logic that was missing ---
        let messages = [];
        try {
            const data = await fs.readFile(MESSAGES_FILE, 'utf8');
            messages = JSON.parse(data);
        } catch (error) {
            if (error.code !== 'ENOENT') throw error;
        }

        messages.push(newSubmission);
        await fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2));
        // ----------------------------------------------------

        console.log('New contact form submission:', newSubmission);
        res.status(200).json({ status: 'ok', message: 'Message received!' });

    } catch (error) {
        console.error('Error processing contact form:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});