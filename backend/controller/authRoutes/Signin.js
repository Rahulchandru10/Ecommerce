const express = require('express');
const { auth } = require('../../Firebase'); 
const { signInWithEmailAndPassword } = require('firebase/auth');

const router = express.Router();

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    try {
        await signInWithEmailAndPassword(auth, email, password);
        return res.status(200).json({ message: "Credentials matched" });
    } catch (error) {
        if (error.code === 'auth/invalid-credential') {
            return res.status(401).json({ error: "Invalid credential" });
        } else if (error.code === 'auth/user-not-found') {
            return res.status(404).json({ error: "User not found" });
        } else {
            return res.status(500).json({ error: 'An error occurred during sign-in.' });
        }
    }
});

module.exports = router;