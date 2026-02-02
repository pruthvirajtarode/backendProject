import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';
import './AdminPanel.css';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await api.get('/users');
            setUsers(res.data.data.users);
        } catch (error) {
            console.error('Fetch users error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateUser = async (userId, updates) => {
        try {
            await api.put(`/users/${userId}`, updates);
            toast.success('User updated successfully!');
            fetchUsers();
            setEditingUser(null);
        } catch (error) {
            console.error('Update user error:', error);
        }
    };

    const handleDeleteUser = async (userId) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;

        try {
            await api.delete(`/users/${userId}`);
            toast.success('User deleted successfully!');
            fetchUsers();
        } catch (error) {
            console.error('Delete user error:', error);
        }
    };

    const toggleUserStatus = async (user) => {
        await handleUpdateUser(user._id, { isActive: !user.isActive });
    };

    const changeUserRole = async (user) => {
        const newRole = user.role === 'user' ? 'admin' : 'user';
        await handleUpdateUser(user._id, { role: newRole });
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="admin-panel">
            <div className="container">
                <div className="admin-header">
                    <div>
                        <h1>👑 Admin Panel</h1>
                        <p>Manage users and system settings</p>
                    </div>
                    <div className="admin-stats">
                        <div className="stat-badge">
                            <span className="stat-value">{users.length}</span>
                            <span className="stat-label">Total Users</span>
                        </div>
                        <div className="stat-badge">
                            <span className="stat-value">{users.filter(u => u.role === 'admin').length}</span>
                            <span className="stat-label">Admins</span>
                        </div>
                        <div className="stat-badge">
                            <span className="stat-value">{users.filter(u => u.isActive).length}</span>
                            <span className="stat-label">Active</span>
                        </div>
                    </div>
                </div>

                <div className="users-table-container card">
                    <h2>User Management</h2>
                    <div className="table-responsive">
                        <table className="users-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Joined</th>
                                    <th>Last Login</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id} className={!user.isActive ? 'inactive-row' : ''}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <span className={`badge badge-${user.role}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`status-indicator ${user.isActive ? 'active' : 'inactive'}`}>
                                                {user.isActive ? '● Active' : '○ Inactive'}
                                            </span>
                                        </td>
                                        <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            {user.lastLogin
                                                ? new Date(user.lastLogin).toLocaleDateString()
                                                : 'Never'}
                                        </td>
                                        <td>
                                            <div className="table-actions">
                                                <button
                                                    className="btn-icon"
                                                    onClick={() => changeUserRole(user)}
                                                    title={`Change to ${user.role === 'user' ? 'Admin' : 'User'}`}
                                                >
                                                    👤
                                                </button>
                                                <button
                                                    className="btn-icon"
                                                    onClick={() => toggleUserStatus(user)}
                                                    title={user.isActive ? 'Deactivate' : 'Activate'}
                                                >
                                                    {user.isActive ? '🔓' : '🔒'}
                                                </button>
                                                <button
                                                    className="btn-icon btn-icon-danger"
                                                    onClick={() => handleDeleteUser(user._id)}
                                                    title="Delete User"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="admin-info-grid">
                    <div className="info-card card">
                        <h3>🔐 API Documentation</h3>
                        <p>View and test all API endpoints with Swagger</p>
                        <a
                            href="http://localhost:5000/api-docs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary btn-sm"
                        >
                            Open API Docs
                        </a>
                    </div>

                    <div className="info-card card">
                        <h3>📊 System Health</h3>
                        <p>Check the health and status of the backend server</p>
                        <a
                            href="http://localhost:5000/health"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary btn-sm"
                        >
                            Check Health
                        </a>
                    </div>

                    <div className="info-card card">
                        <h3>🛡️ Security</h3>
                        <p>
                            • JWT Authentication<br />
                            • Password Hashing (bcrypt)<br />
                            • Rate Limiting<br />
                            • Input Validation
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
