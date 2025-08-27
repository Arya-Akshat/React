// backend/app.js
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors'); // Import CORS

const app = express();
const port = 5000;
const MESSAGES_FILE = path.join(__dirname, 'messages.json');

// --- Middleware ---
// Use CORS to allow requests from your frontend's origin
app.use(cors({
    origin: 'http://localhost:3000' 
}));
app.use(express.json()); // To parse JSON request bodies

// --- API Route ---
app.post('/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Basic validation
        if (!name || !email || !message) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newSubmission = {
            name,
            email,
            message,
            submittedAt: new Date().toISOString()
        };

        // --- Save to file ---
        let messages = [];
        try {
            const data = await fs.readFile(MESSAGES_FILE, 'utf8');
            messages = JSON.parse(data);
        } catch (error) {
            // If the file doesn't exist, we'll start with an empty array
            if (error.code !== 'ENOENT') throw error;
        }

        messages.push(newSubmission);
        await fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2));

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
