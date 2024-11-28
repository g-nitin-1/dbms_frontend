import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';
import studentLogo from '../assets/img/student-logo.png';
import adminLogo from '../assets/img/admin-logo.png';
import companyLogo from '../assets/img/company-logo.png';

const Login = () => {
    const [role, setRole] = useState('student');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [companyName, setCompanyName] = useState('');
    const [profile, setProfile] = useState('');
    const [city, setCity] = useState('');
    const history = useHistory();

    const handleLogin = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    role,
                    username,
                    password,
                }),
            });

            if (!response.ok) {
                throw new Error('Incorrect username or password');
            }

            const { token: newToken } = await response.json();
            localStorage.setItem('token', newToken);

            // Redirect based on role
            if (role === 'admin') {
                history.push('/a');
            } else if (role === 'company') {
                history.push('/c');
            } else {
                history.push('/s');
            }
        } catch (error) {
            alert(error.message);
            setUsername('');
            setPassword('');
        }
    };

    const handleRegister = async () => {
        // Check if any of the registration fields are empty
        if (!companyName || !profile || !city || !username || !password) {
            alert('All fields are required!');
            return; // Stop the function from proceeding further
        }
        
        try {
            const response = await fetch('http://localhost:3000/registerCompany', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    companyName,
                    profile,
                    city,
                    username,
                    password,
                }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to register company');
            }

            const jsonData = await response.json();
            
            console.log(jsonData);
            alert('Company registered successfully with user id :' + jsonData['cid']);

            history.push('/login');
        } catch (error) {
            alert(error.message);
        }

        setCompanyName('');
        setProfile('');
        setCity('');
        setUsername('');
        setPassword('');
    };
    

    return (
        <div className="login-wrapper">
            {/* Portal title */}
            <div className="portal-title">
                <h2>Student Placement Portal</h2>
            </div>

            {/* Login container */}
            <div className="login-container">
                {/* Login and Register toggle */}
                <div className="login-register-toggle">
                    <button
                        className={`toggle-btn ${isLogin ? 'active' : ''}`}
                        onClick={() => setIsLogin(true)}
                    >
                        Login
                    </button>
                    <button
                        className={`toggle-btn ${!isLogin ? 'active' : ''}`}
                        onClick={() => setIsLogin(false)}
                    >
                        Register Company
                    </button>
                </div>

                {isLogin ? (
                    // Login form
                    <div className="login-form">
                        <div className="role-icons">
                            <div
                                className={`role-icon ${role === 'student' && 'selected'}`}
                                onClick={() => setRole('student')}
                            >
                                <img
                                    src={studentLogo}
                                    alt="Student"
                                    className={`role-logo ${role === 'student' && 'selected-logo'}`}
                                />
                                <p className="role-text">Student</p>
                            </div>
                            <div
                                className={`role-icon ${role === 'admin' && 'selected'}`}
                                onClick={() => setRole('admin')}
                            >
                                <img
                                    src={adminLogo}
                                    alt="Admin"
                                    className={`role-logo ${role === 'admin' && 'selected-logo'}`}
                                />
                                <p className="role-text">Admin</p>
                            </div>
                            <div
                                className={`role-icon ${role === 'company' && 'selected'}`}
                                onClick={() => setRole('company')}
                            >
                                <img
                                    src={companyLogo}
                                    alt="Company"
                                    className={`role-logo ${role === 'company' && 'selected-logo'}`}
                                />
                                <p className="role-text">Company</p>
                            </div>
                        </div>

                        {/* Username and Password inputs */}
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {/* Login button */}
                        <button onClick={handleLogin}>Login</button>
                    </div>
                ) : (
                    // Registration form for companies
                    <div className="register-form">
                        <input
                            type="text"
                            placeholder="Company Name"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Profile"
                            value={profile}
                            onChange={(e) => setProfile(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {/* Register button */}
                        <button onClick={handleRegister}>Register</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;


