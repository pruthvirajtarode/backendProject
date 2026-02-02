import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import './Auth.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);

    const { login, user } = useContext(AuthContext);
    const navigate = useNavigate();

    // Redirect if already logged in
    if (user) {
        navigate('/dashboard');
        return null;
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await login(formData.email, formData.password);
            toast.success('Login successful!');
            navigate('/dashboard');
        } catch (error) {
            console.error('Login error:', error);
            // Error toast is handled by axios interceptor
        } finally {
            setLoading(false);
        }
    };

    // Quick demo login functions
    const handleDemoLogin = (role) => {
        const credentials = role === 'admin'
            ? { email: 'admin@taskmanager.com', password: 'password123' }
            : { email: 'user@taskmanager.com', password: 'password123' };

        setFormData(credentials);
        // Auto-submit after a brief moment
        setTimeout(() => {
            login(credentials.email, credentials.password)
                .then(() => {
                    toast.success(`Logged in as ${role}!`);
                    navigate('/dashboard');
                })
                .catch(err => console.error('Demo login error:', err));
        }, 300);
    };

    const fillDemoCredentials = (role) => {
        const credentials = role === 'admin'
            ? { email: 'admin@taskmanager.com', password: 'password123' }
            : { email: 'user@taskmanager.com', password: 'password123' };
        setFormData(credentials);
    };

    return (
        <div className="auth-page">
            <div className="auth-container fade-in">
                <div className="auth-card card">
                    <div className="auth-header">
                        <h1>Welcome Back</h1>
                        <p>Sign in to your account to continue</p>
                    </div>

                    {/* Quick Demo Login Buttons */}
                    <div className="demo-login-buttons">
                        <button
                            onClick={() => handleDemoLogin('admin')}
                            className="btn btn-primary demo-login-btn"
                            type="button"
                        >
                            🚀 Quick Demo - Admin Login
                        </button>
                        <button
                            onClick={() => handleDemoLogin('user')}
                            className="btn btn-secondary demo-login-btn"
                            type="button"
                        >
                            👤 Quick Demo - User Login
                        </button>
                    </div>

                    <div className="divider">
                        <span>or sign in manually</span>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-input"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Enter your email"
                                autoComplete="email"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="form-input"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                minLength="6"
                            />
                        </div>

                        {/* Auto-fill buttons */}
                        <div className="autofill-buttons">
                            <button
                                type="button"
                                onClick={() => fillDemoCredentials('admin')}
                                className="btn-link"
                            >
                                Fill Admin Credentials
                            </button>
                            <button
                                type="button"
                                onClick={() => fillDemoCredentials('user')}
                                className="btn-link"
                            >
                                Fill User Credentials
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary auth-btn"
                            disabled={loading}
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>
                            Don't have an account?{' '}
                            <Link to="/register" className="auth-link">Create one</Link>
                        </p>
                    </div>

                    {/* Demo Credentials Info */}
                    <div className="demo-credentials">
                        <p className="demo-title">📝 Demo Credentials:</p>
                        <p><strong>Admin:</strong> admin@taskmanager.com / password123</p>
                        <p><strong>User:</strong> user@taskmanager.com / password123</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
