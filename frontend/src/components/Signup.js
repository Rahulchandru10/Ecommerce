import React, { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loginalert from '../alerts/Loginalert';
import '../styles/signup.css';
import { AuthContext } from '../authcontext/AuthContext';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { login } = useContext(AuthContext);
    const [alert, setAlert] = useState(null);
    const nav = useNavigate();
    
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const submit = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setAlert({ message: 'Invalid email type', type: 'danger' });
            return;
        }
        
        if(password.length<6){
            setAlert({ message: 'Passwords should contain atleast 6 letters', type: 'danger' });
            return;
        }

        if (password !== confirmPassword) {
            setAlert({ message: 'Passwords do not match', type: 'danger' });
            return;
        }

        try {
            await axios.post("http://localhost:3001/auth/signup",{email,password})
            nav('/', { replace: true });
            login()
        } catch (error) {
            console.error("Signup Error: ", error);
            setAlert({ message: 'User already exists.', type: 'danger' });
        }
    };

    return (
        <div className="signup">
            <h2 style={{ marginBottom: '3%' }}>Sign Up!!</h2>
            <div style={{width:"320px"}}>
             {alert && <Loginalert message={alert.message} type={alert.type} />}
            </div>
            <form onSubmit={submit}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
            </form>
        </div>
    );
};

export default Signup;
