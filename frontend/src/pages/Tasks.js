import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import { toast } from 'react-toastify';
import './Tasks.css';

const Tasks = () => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [filters, setFilters] = useState({
        status: '',
        priority: ''
    });
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'pending',
        priority: 'medium',
        dueDate: ''
    });

    useEffect(() => {
        fetchTasks();
    }, [filters]);

    const fetchTasks = async () => {
        try {
            const params = new URLSearchParams();
            if (filters.status) params.append('status', filters.status);
            if (filters.priority) params.append('priority', filters.priority);

            const res = await api.get(`/tasks?${params.toString()}`);
            setTasks(res.data.data.tasks);
        } catch (error) {
            console.error('Fetch tasks error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const openModal = (task = null) => {
        if (task) {
            setEditingTask(task);
            setFormData({
                title: task.title,
                description: task.description || '',
                status: task.status,
                priority: task.priority,
                dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
            });
        } else {
            setEditingTask(null);
            setFormData({
                title: '',
                description: '',
                status: 'pending',
                priority: 'medium',
                dueDate: ''
            });
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingTask(null);
        setFormData({
            title: '',
            description: '',
            status: 'pending',
            priority: 'medium',
            dueDate: ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingTask) {
                await api.put(`/tasks/${editingTask._id}`, formData);
                toast.success('Task updated successfully!');
            } else {
                await api.post('/tasks', formData);
                toast.success('Task created successfully!');
            }

            closeModal();
            fetchTasks();
        } catch (error) {
            console.error('Task submit error:', error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this task?')) return;

        try {
            await api.delete(`/tasks/${id}`);
            toast.success('Task deleted successfully!');
            fetchTasks();
        } catch (error) {
            console.error('Delete task error:', error);
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
        <div className="tasks-page">
            <div className="container">
                {/* Header */}
                <div className="tasks-header">
                    <div>
                        <h1>My Tasks</h1>
                        <p>Manage and track all your tasks</p>
                    </div>
                    <button className="btn btn-primary" onClick={() => openModal()}>
                        ➕ Create Task
                    </button>
                </div>

                {/* Filters */}
                <div className="filters-bar card">
                    <div className="filter-group">
                        <label>Status:</label>
                        <select
                            name="status"
                            value={filters.status}
                            onChange={handleFilterChange}
                            className="form-select"
                        >
                            <option value="">All</option>
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Priority:</label>
                        <select
                            name="priority"
                            value={filters.priority}
                            onChange={handleFilterChange}
                            className="form-select"
                        >
                            <option value="">All</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                </div>

                {/* Tasks Grid */}
                {tasks.length === 0 ? (
                    <div className="empty-state card">
                        <div className="empty-icon">📝</div>
                        <h3>No tasks found</h3>
                        <p>Create your first task or adjust your filters</p>
                        <button className="btn btn-primary" onClick={() => openModal()}>
                            Create Task
                        </button>
                    </div>
                ) : (
                    <div className="tasks-grid">
                        {tasks.map((task) => (
                            <div key={task._id} className="task-card card">
                                <div className="task-card-header">
                                    <h3>{task.title}</h3>
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

                                <div className="task-meta">
                                    {task.dueDate && (
                                        <div className="meta-item">
                                            <span className="meta-label">📅 Due:</span>
                                            <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                                        </div>
                                    )}
                                    <div className="meta-item">
                                        <span className="meta-label">📅 Created:</span>
                                        <span>{new Date(task.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                <div className="task-actions">
                                    <button
                                        className="btn btn-secondary btn-sm"
                                        onClick={() => openModal(task)}
                                    >
                                        ✏️ Edit
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(task._id)}
                                    >
                                        🗑️ Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Modal */}
                {showModal && (
                    <div className="modal-overlay" onClick={closeModal}>
                        <div className="modal-content card" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h2>{editingTask ? 'Edit Task' : 'Create New Task'}</h2>
                                <button className="modal-close" onClick={closeModal}>✕</button>
                            </div>

                            <form onSubmit={handleSubmit} className="modal-form">
                                <div className="form-group">
                                    <label htmlFor="title" className="form-label">Title *</label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        className="form-input"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Enter task title"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        className="form-textarea"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        placeholder="Enter task description"
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="status" className="form-label">Status</label>
                                        <select
                                            id="status"
                                            name="status"
                                            className="form-select"
                                            value={formData.status}
                                            onChange={handleInputChange}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="in-progress">In Progress</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="priority" className="form-label">Priority</label>
                                        <select
                                            id="priority"
                                            name="priority"
                                            className="form-select"
                                            value={formData.priority}
                                            onChange={handleInputChange}
                                        >
                                            <option value="low">Low</option>
                                            <option value="medium">Medium</option>
                                            <option value="high">High</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="dueDate" className="form-label">Due Date</label>
                                    <input
                                        type="date"
                                        id="dueDate"
                                        name="dueDate"
                                        className="form-input"
                                        value={formData.dueDate}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="modal-actions">
                                    <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        {editingTask ? 'Update Task' : 'Create Task'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Tasks;
