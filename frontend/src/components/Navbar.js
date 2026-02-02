import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { user, logout, isAdmin } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [showDemo, setShowDemo] = useState(true);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const isActive = (path) => location.pathname === path;

    // Smooth scroll handler
    const handleSmoothScroll = (e, targetId) => {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <>
            {/* Demo Credentials Banner */}
            {!user && showDemo && (
                <div className="demo-banner">
                    <div className="demo-content">
                        <span className="demo-icon">🎭</span>
                        <div className="demo-text">
                            <strong>Demo Credentials:</strong>
                            <span className="demo-email">admin@taskmanager.com / password123</span>
                        </div>
                    </div>
                    <button onClick={() => setShowDemo(false)} className="demo-close">×</button>
                </div>
            )}

            <nav className="navbar">
                <div className="container navbar-container">
                    <Link to="/" className="navbar-brand">
                        <span className="logo-icon">📋</span>
                        <span className="logo-text">Task<span className="text-gradient">Manager</span></span>
                    </Link>

                    <div className="navbar-menu">
                        {!user ? (
                            <>
                                <Link
                                    to="/"
                                    className={`nav-link ${isActive('/') ? 'active' : ''}`}
                                >
                                    Home
                                </Link>
                                <a
                                    href="#features"
                                    className="nav-link"
                                    onClick={(e) => handleSmoothScroll(e, 'features')}
                                >
                                    Features
                                </a>
                                <a
                                    href="#pricing"
                                    className="nav-link"
                                    onClick={(e) => handleSmoothScroll(e, 'pricing')}
                                >
                                    Pricing
                                </a>
                                <a
                                    href="#testimonials"
                                    className="nav-link"
                                    onClick={(e) => handleSmoothScroll(e, 'testimonials')}
                                >
                                    About
                                </a>
                                <a
                                    href="#cta"
                                    className="nav-link"
                                    onClick={(e) => handleSmoothScroll(e, 'cta')}
                                >
                                    Contact
                                </a>
                                <Link to="/login" className="btn btn-secondary">
                                    Login
                                </Link>
                                <Link to="/register" className="btn btn-primary">
                                    Sign Up Free
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/dashboard"
                                    className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
                                >
                                    📊 Dashboard
                                </Link>
                                <Link
                                    to="/tasks"
                                    className={`nav-link ${isActive('/tasks') ? 'active' : ''}`}
                                >
                                    ✅ Tasks
                                </Link>
                                {isAdmin() && (
                                    <Link
                                        to="/admin"
                                        className={`nav-link ${isActive('/admin') ? 'active' : ''}`}
                                    >
                                        👑 Admin
                                    </Link>
                                )}
                                <div className="nav-user">
                                    <span className={`badge badge-${user.role}`}>{user.role}</span>
                                    <span className="user-name">{user.name}</span>
                                    <button onClick={handleLogout} className="btn btn-secondary btn-sm">
                                        Logout
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
