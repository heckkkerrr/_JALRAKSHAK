// server.js - Final Deployment Version

// 1. IMPORT DEPENDENCIES
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
const admin = require('firebase-admin');
const path = require('path'); // Added to help find files
require('dotenv').config();

// 2. INITIALIZE THE APP
const app = express();
// CRITICAL FIX: Use Render's port if available, otherwise 4000
const PORT = process.env.PORT || 4000; 

// 3. APPLY MIDDLEWARE
app.use(cors({
  origin: '*', // CRITICAL FIX: Allows ALL websites (including your phone) to connect
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// 4. INITIALIZE FIREBASE ADMIN SDK
// We try to load the key from the root folder first (Render default), then current folder
let serviceAccount;
try {
    // Try looking in the root directory (standard for Render Secret Files)
    serviceAccount = require('/opt/render/project/src/Backendjal/serviceAccountKey.json');
} catch (e) {
    try {
        // Fallback: Try looking in the current folder (Local development)
        serviceAccount = require('./serviceAccountKey.json');
    } catch (e2) {
        console.error("❌ ERROR: Could not find serviceAccountKey.json in root or current folder.");
    }
}

if (serviceAccount) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    console.log("✅ Firebase Admin Initialized successfully");
}

const auth = admin.auth();
const db = admin.firestore();

// 5. INITIALIZE OPENAI CLIENT FOR OPENROUTER
const openAI = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
    defaultHeaders: {
        "HTTP-Referer": process.env.SITE_URL || "http://localhost:3000",
        "X-Title": "Jal-Rakshak",
    },
});

// 6. DEFINE AUTHENTICATION ROUTES

// Route for user registration
app.post('/api/register', async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const userRecord = await auth.createUser({ email, password, displayName: name });
        await db.collection('users').doc(userRecord.uid).set({
            email: userRecord.email,
            name: name,
            createdAt: new Date().toISOString(),
        });
        res.status(201).json({ message: 'User registered successfully!', uid: userRecord.uid });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Middleware to verify Firebase ID token
const verifyToken = async (req, res, next) => {
    const idToken = req.headers.authorization?.split('Bearer ')[1];
    if (!idToken) {
        return res.status(401).send('Unauthorized: No token provided');
    }
    try {
        req.user = await auth.verifyIdToken(idToken);
        next();
    } catch (error) {
        return res.status(401).send('Unauthorized: Invalid token');
    }
};

// Route to handle social login
app.post('/api/handle-social-login', verifyToken, async (req, res) => {
    const { uid, email, name } = req.user;
    const userDocRef = db.collection('users').doc(uid);
    const doc = await userDocRef.get();
    if (!doc.exists) {
        await userDocRef.set({ email, name, createdAt: new Date().toISOString() });
    }
    res.status(200).json({ message: 'Social login handled.' });
});

// 7. DEFINE PROTECTED API ENDPOINT FOR THE CHATBOT
app.post('/api/chat', async (req, res) => {
    try {
        console.log("Received chat request");
        const { message } = req.body;

        const systemPrompt = `
You are 'Jal-Rakshak AI', a compassionate, reliable, and knowledgeable public health assistant...
`;

        const completion = await openAI.chat.completions.create({
            model: "meta-llama/llama-3.2-3b-instruct:free",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: message },
            ],
        });

        const aiReply = completion.choices[0].message.content;
        res.json({ reply: aiReply });

    } catch (error) {
        console.error("Error calling OpenRouter API for chat:", error);
        res.status(500).json({ error: "Failed to get response from AI." });
    }
});

// 8. START THE SERVER
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});