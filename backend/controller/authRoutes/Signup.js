const express = require('express');
const db = require('../../config/db');
const { createUserWithEmailAndPassword } = require('firebase/auth');
const {auth} = require('../../Firebase'); 
const rt = express.Router();

rt.post('/', async (req, res) => {
    const { email, password } = req.body;
    console.log("Firebase initialized:", auth);
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        const qr = `INSERT INTO customerinfo (email, password) VALUES (?, ?)`;
        await db.query(qr, [email, password]);

        return res.status(201).json({ message: "User created successfully." });
    } catch (error) {
        console.error(error);

        if (error.code === 'auth/email-already-in-use') {
            return res.status(400).json({ error: 'Email already in use.' });
        } else if (error.code === 'auth/invalid-email') {
            return res.status(400).json({ error: 'Invalid email.' });
        } else {
            return res.status(500).json({ error: 'An error occurred while processing.' });
        }
    }
});

module.exports = rt;





