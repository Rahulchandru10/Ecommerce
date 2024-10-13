import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, provider, db } from '../Firebase'; 
import Loginalert from '../alerts/Loginalert';
import '../styles/login.css';
import axios from 'axios';
import { AuthContext } from '../authcontext/AuthContext';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState(null);
    const nav = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/auth/signin', { email, password });
            if (response.status !== 200) {
                throw new Error('Login failed');
            }
            setAlert({ message: 'Login successful', type: 'success' });
            login();
            nav('/', { replace: true });
        } catch (err) {
            console.error("Login Error: ", err);
            setAlert({ message: 'Login failed. Please check your credentials.', type: 'danger' });
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            if (!auth || !provider) {
                throw new Error('Firebase Auth or Provider not initialized');
            }
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                provider: 'Google',
                created: new Date().toISOString(),
                signedIn: new Date().toISOString(),
                userId: user.uid,
            }, { merge: true });

            login();
            nav('/', { replace: true });
        } catch (error) {
            console.error('Google Sign-In Error:', error);
            setAlert({ message: 'Google sign-in failed. Please try again.', type: 'danger' });
        }
    };

    return (
        <div className="login">
            <h2>Login</h2>
            <div style={{ width: "360px" }}>
                {alert && <Loginalert message={alert.message} type={alert.type} />}
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success">Login</button>
                <button type="button" className="btn btn-info" onClick={handleGoogleSignIn}>
                    Sign in with Google
                </button>
                <Link to='/Signup' className="btn btn-info">Don't have an account?</Link>
            </form>
        </div>
    );
};

export default Login;
