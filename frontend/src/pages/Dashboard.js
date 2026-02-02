import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import { toast } from 'react-toastify';
import './Dashboard.css';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState(null);
    const [recentTasks, setRecentTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const [statsRes, tasksRes] = await Promise.all([
                api.get('/tasks/stats/me'),
                api.get('/tasks?limit=5')
            ]);

            setStats(statsRes.data.data.stats);
            setRecentTasks(tasksRes.data.data.tasks);
        } catch (error) {
            console.error('Dashboard data error:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="dashboard">
            <div className="container">
                {/* Welcome Header */}
                <div className="dashboard-header fade-in">
                    <div>
                        <h1>Welcome back, {user.name}! 👋</h1>
                        <p className="dashboard-subtitle">Here's what's happening with your tasks today</p>
                    </div>
                    <Link to="/tasks" className="btn btn-primary">
                        View All Tasks
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="stats-grid">
                    <div className="stat-card card">
                        <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                            📊
                        </div>
                        <div className="stat-content">
                            <h3>{stats?.total || 0}</h3>
                            <p>Total Tasks</p>
                        </div>
                    </div>

                    <div className="stat-card card">
                        <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                            ⏳
                        </div>
                        <div className="stat-content">
                            <h3>{stats?.pending || 0}</h3>
                            <p>Pending</p>
                        </div>
                    </div>

                    <div className="stat-card card">
                        <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                            🔄
                        </div>
                        <div className="stat-content">
                            <h3>{stats?.['in-progress'] || 0}</h3>
                            <p>In Progress</p>
                        </div>
                    </div>

                    <div className="stat-card card">
                        <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
                            ✅
                        </div>
                        <div className="stat-content">
                            <h3>{stats?.completed || 0}</h3>
                            <p>Completed</p>
                        </div>
                    </div>
                </div>

                {/* Recent Tasks */}
                <div className="recent-tasks">
                    <div className="section-header">
                        <h2>Recent Tasks</h2>
                        <Link to="/tasks" className="view-all-link">
                            View All →
                        </Link>
                    </div>

                    {recentTasks.length === 0 ? (
                        <div className="empty-state card">
                            <div className="empty-icon">📝</div>
                            <h3>No tasks yet</h3>
                            <p>Create your first task to get started!</p>
                            <Link to="/tasks" className="btn btn-primary">
                                Create Task
                            </Link>
                        </div>
                    ) : (
                        <div className="tasks-list">
                            {recentTasks.map((task) => (
                                <div key={task._id} className="task-item card">
                                    <div className="task-header">
                                        <h4>{task.title}</h4>
                                        <div className="task-badges">
                                            <span className={`badge badge-${task.status}`}>
                                                {task.status}
                                            </span>
                                            <span className={`badge badge-${task.priority}`}>
                                                {task.priority}
                                            </span>
                                        </div>
                                    </div>
                                    {task.description && (
                                        <p className="task-description">{task.description}</p>
                                    )}
                                    <div className="task-footer">
                                        <span className="task-date">
                                            {new Date(task.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="quick-actions">
                    <h2>Quick Actions</h2>
                    <div className="actions-grid">
                        <Link to="/tasks" className="action-card card">
                            <div className="action-icon">➕</div>
                            <h4>Create New Task</h4>
                            <p>Add a new task to your list</p>
                        </Link>

                        {user.role === 'admin' && (
                            <Link to="/admin" className="action-card card">
                                <div className="action-icon">👑</div>
                                <h4>Admin Panel</h4>
                                <p>Manage users and system settings</p>
                            </Link>
                        )}

                        <a href="http://localhost:5000/api-docs" target="_blank" rel="noopener noreferrer" className="action-card card">
                            <div className="action-icon">📚</div>
                            <h4>API Documentation</h4>
                            <p>View Swagger API docs</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
