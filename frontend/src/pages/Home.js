import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Home.css';

const Home = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="home">
            {/* Hero Section with 3D Elements */}
            <section className="hero">
                <div className="container">
                    <div className="hero-content fade-in">
                        <div className="hero-badge">
                            ✨ #1 Task Management Platform
                        </div>
                        <h1 className="hero-title">
                            Transform Your
                            <span className="text-gradient"> Productivity</span>
                            <br />
                            With Smart Task Management
                        </h1>
                        <p className="hero-subtitle">
                            Experience the future of task management with AI-powered insights,
                            team collaboration, and enterprise-grade security. Built for teams that move fast.
                        </p>
                        <div className="hero-buttons">
                            {user ? (
                                <Link to="/dashboard" className="btn btn-primary">
                                    <span>Open Dashboard</span>
                                    <span className="btn-icon">→</span>
                                </Link>
                            ) : (
                                <>
                                    <Link to="/register" className="btn btn-primary">
                                        <span>Start Free Trial</span>
                                        <span className="btn-icon">→</span>
                                    </Link>
                                    <Link to="/login" className="btn btn-ghost">
                                        <span>Sign In</span>
                                    </Link>
                                </>
                            )}
                        </div>
                        <div className="hero-social-proof">
                            <div className="proof-item">
                                <div className="proof-number">10K+</div>
                                <div className="proof-label">Active Users</div>
                            </div>
                            <div className="proof-divider"></div>
                            <div className="proof-item">
                                <div className="proof-number">99.9%</div>
                                <div className="proof-label">Uptime</div>
                            </div>
                            <div className="proof-divider"></div>
                            <div className="proof-item">
                                <div className="proof-number">4.9/5</div>
                                <div className="proof-label">User Rating</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3D Floating Elements */}
                <div className="hero-visual">
                    <div className="floating-card card-1 float">
                        <div className="mini-icon">✓</div>
                        <div className="mini-text">Task Completed</div>
                    </div>
                    <div className="floating-card card-2 float" style={{ animationDelay: '0.5s' }}>
                        <div className="mini-icon">🎯</div>
                        <div className="mini-text">Goal Achieved</div>
                    </div>
                    <div className="floating-card card-3 float" style={{ animationDelay: '1s' }}>
                        <div className="mini-icon">📊</div>
                        <div className="mini-text">Analytics Ready</div>
                    </div>
                </div>

                {/* Gradient Background */}
                <div className="hero-gradient"></div>
                <div className="floating-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="shape shape-3"></div>
                    <div className="shape shape-4"></div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="container">
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon">⚡</div>
                            <div className="stat-value">10x</div>
                            <div className="stat-label">Faster Task Management</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">🚀</div>
                            <div className="stat-value">500K+</div>
                            <div className="stat-label">Tasks Completed</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">👥</div>
                            <div className="stat-value">50K+</div>
                            <div className="stat-label">Happy Teams</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">⭐</div>
                            <div className="stat-value">4.9</div>
                            <div className="stat-label">Average Rating</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section with Icons */}
            <section className="features" id="features">
                <div className="container">
                    <div className="section-head text-center">
                        <div className="section-badge">Features</div>
                        <h2 className="section-title">
                            Everything you need to
                            <span className="text-gradient"> succeed</span>
                        </h2>
                        <p className="section-description">
                            Powerful features designed for modern teams and individuals
                        </p>
                    </div>

                    <div className="features-grid">
                        <div className="feature-card card">
                            <div className="feature-icon-wrapper">
                                <div className="feature-icon gradient-1">🔐</div>
                            </div>
                            <h3>Enterprise Security</h3>
                            <p>Bank-grade encryption with JWT authentication, bcrypt hashing, and advanced protection</p>
                            <ul className="feature-list">
                                <li>256-bit AES encryption</li>
                                <li>Two-factor authentication</li>
                                <li>SOC 2 compliant</li>
                            </ul>
                        </div>

                        <div className="feature-card card">
                            <div className="feature-icon-wrapper">
                                <div className="feature-icon gradient-2">👥</div>
                            </div>
                            <h3>Team Collaboration</h3>
                            <p>Work together seamlessly with role-based access and real-time updates</p>
                            <ul className="feature-list">
                                <li>Role-based permissions</li>
                                <li>Real-time notifications</li>
                                <li>Team analytics</li>
                            </ul>
                        </div>

                        <div className="feature-card card">
                            <div className="feature-icon-wrapper">
                                <div className="feature-icon gradient-3">⚡</div>
                            </div>
                            <h3>Lightning Performance</h3>
                            <p>Optimized infrastructure delivering sub-100ms response times globally</p>
                            <ul className="feature-list">
                                <li>Global CDN</li>
                                <li>Smart caching</li>
                                <li>Auto-scaling</li>
                            </ul>
                        </div>

                        <div className="feature-card card">
                            <div className="feature-icon-wrapper">
                                <div className="feature-icon gradient-4">📊</div>
                            </div>
                            <h3>Advanced Analytics</h3>
                            <p>Get deep insights into productivity with AI-powered analytics and reporting</p>
                            <ul className="feature-list">
                                <li>Custom dashboards</li>
                                <li>Predictive insights</li>
                                <li>Export reports</li>
                            </ul>
                        </div>

                        <div className="feature-card card">
                            <div className="feature-icon-wrapper">
                                <div className="feature-icon gradient-5">🛡️</div>
                            </div>
                            <h3>DDoS Protection</h3>
                            <p>Built-in rate limiting and protection against malicious attacks</p>
                            <ul className="feature-list">
                                <li>API rate limiting</li>
                                <li>Brute force protection</li>
                                <li>24/7 monitoring</li>
                            </ul>
                        </div>

                        <div className="feature-card card">
                            <div className="feature-icon-wrapper">
                                <div className="feature-icon gradient-6">🚀</div>
                            </div>
                            <h3>Scalable Architecture</h3>
                            <p>Built to scale from startup to enterprise without compromise</p>
                            <ul className="feature-list">
                                <li>Microservices ready</li>
                                <li>Horizontal scaling</li>
                                <li>99.9% uptime SLA</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="pricing" id="pricing">
                <div className="container">
                    <div className="section-head text-center">
                        <div className="section-badge">Pricing</div>
                        <h2 className="section-title">
                            Choose the perfect
                            <span className="text-gradient"> plan</span>
                        </h2>
                        <p className="section-description">
                            Start free, scale as you grow
                        </p>
                    </div>

                    <div className="pricing-grid">
                        {/* Free Plan */}
                        <div className="pricing-card">
                            <div className="pricing-header">
                                <h3>Starter</h3>
                                <div className="price">
                                    <span className="currency">$</span>
                                    <span className="amount">0</span>
                                    <span className="period">/month</span>
                                </div>
                                <p>Perfect for individuals</p>
                            </div>
                            <ul className="feature-list">
                                <li>Up to 50 tasks</li>
                                <li>Basic analytics</li>
                                <li>Email support</li>
                                <li>Mobile app access</li>
                                <li>2GB storage</li>
                            </ul>
                            <Link to="/register" className="btn btn-secondary" style={{ width: '100%' }}>
                                Get Started Free
                            </Link>
                        </div>

                        {/* Pro Plan */}
                        <div className="pricing-card featured">
                            <div className="popular-badge">Most Popular</div>
                            <div className="pricing-header">
                                <h3>Professional</h3>
                                <div className="price">
                                    <span className="currency">$</span>
                                    <span className="amount">12</span>
                                    <span className="period">/month</span>
                                </div>
                                <p>For growing teams</p>
                            </div>
                            <ul className="feature-list">
                                <li>Unlimited tasks</li>
                                <li>Advanced analytics</li>
                                <li>Priority support</li>
                                <li>Team collaboration</li>
                                <li>50GB storage</li>
                                <li>Custom integrations</li>
                            </ul>
                            <Link to="/register" className="btn btn-primary" style={{ width: '100%' }}>
                                Start Free Trial
                            </Link>
                        </div>

                        {/* Enterprise Plan */}
                        <div className="pricing-card">
                            <div className="pricing-header">
                                <h3>Enterprise</h3>
                                <div className="price">
                                    <span className="currency">$</span>
                                    <span className="amount">49</span>
                                    <span className="period">/month</span>
                                </div>
                                <p>For large organizations</p>
                            </div>
                            <ul className="feature-list">
                                <li>Everything in Pro</li>
                                <li>Dedicated support</li>
                                <li>Custom SLA</li>
                                <li>Advanced security</li>
                                <li>Unlimited storage</li>
                                <li>On-premise option</li>
                                <li>API access</li>
                            </ul>
                            <Link to="/register" className="btn btn-secondary" style={{ width: '100%' }}>
                                Contact Sales
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="testimonials" id="testimonials">
                <div className="container">
                    <div className="section-head text-center">
                        <div className="section-badge">Testimonials</div>
                        <h2 className="section-title">
                            Loved by teams
                            <span className="text-gradient"> worldwide</span>
                        </h2>
                    </div>

                    <div className="testimonial-grid">
                        <div className="testimonial-card card">
                            <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
                            <p className="testimonial-text">
                                "TaskManager transformed our team's productivity. The intuitive interface and powerful features make task management a breeze!"
                            </p>
                            <div className="testimonial-author">
                                <div className="author-avatar">SM</div>
                                <div>
                                    <div className="author-name">Sarah Mitchell</div>
                                    <div className="author-title">Product Manager, TechCorp</div>
                                </div>
                            </div>
                        </div>

                        <div className="testimonial-card card">
                            <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
                            <p className="testimonial-text">
                                "The best task management tool we've used. The security features and role-based access are exactly what we needed."
                            </p>
                            <div className="testimonial-author">
                                <div className="author-avatar">JD</div>
                                <div>
                                    <div className="author-name">James Davis</div>
                                    <div className="author-title">CTO, StartupXYZ</div>
                                </div>
                            </div>
                        </div>

                        <div className="testimonial-card card">
                            <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
                            <p className="testimonial-text">
                                "Incredible performance and reliability. Our team's efficiency has increased by 40% since switching to TaskManager."
                            </p>
                            <div className="testimonial-author">
                                <div className="author-avatar">EL</div>
                                <div>
                                    <div className="author-name">Emily Lopez</div>
                                    <div className="author-title">Operations Lead, GlobalCo</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tech Stack */}
            <section className="tech-stack">
                <div className="container">
                    <div className="section-head text-center">
                        <div className="section-badge">Technology</div>
                        <h2 className="section-title">Built with cutting-edge tech</h2>
                    </div>
                    <div className="tech-grid">
                        <div className="tech-badge">Node.js</div>
                        <div className="tech-badge">React</div>
                        <div className="tech-badge">MongoDB</div>
                        <div className="tech-badge">Express</div>
                        <div className="tech-badge">JWT</div>
                        <div className="tech-badge">Docker</div>
                        <div className="tech-badge">Redis</div>
                        <div className="tech-badge">Swagger</div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta" id="cta">
                <div className="container">
                    <div className="cta-content card">
                        <h2>Ready to supercharge your productivity?</h2>
                        <p>Join thousands of teams already using TaskManager to achieve more</p>
                        {!user && (
                            <div className="cta-buttons">
                                <Link to="/register" className="btn btn-primary">
                                    <span>Start Free Trial</span>
                                    <span className="btn-icon">→</span>
                                </Link>
                                <Link to="/login" className="btn btn-ghost">
                                    Watch Demo
                                </Link>
                            </div>
                        )}
                        <p className="cta-note">No credit card required • 14-day free trial • Cancel anytime</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
