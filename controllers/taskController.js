/**
 * Task Controller
 * CRUD operations for tasks (secondary entity)
 */

const Task = require('../models/Task');
const logger = require('../utils/logger');

/**
 * @desc    Get all tasks
 * @route   GET /api/v1/tasks
 * @access  Private
 */
exports.getAllTasks = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Build query - users see only their tasks, admins see all
        const query = req.user.role === 'admin' ? {} : { user: req.user.id };

        // Add filters
        if (req.query.status) {
            query.status = req.query.status;
        }
        if (req.query.priority) {
            query.priority = req.query.priority;
        }

        // Sorting
        let sortBy = { createdAt: -1 }; // Default: newest first
        if (req.query.sortBy) {
            const parts = req.query.sortBy.split(':');
            sortBy = { [parts[0]]: parts[1] === 'desc' ? -1 : 1 };
        }

        const tasks = await Task.find(query)
            .populate('user', 'name email')
            .limit(limit)
            .skip(skip)
            .sort(sortBy);

        const total = await Task.countDocuments(query);

        res.status(200).json({
            success: true,
            count: tasks.length,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            },
            data: { tasks }
        });
    } catch (error) {
        logger.error(`Get all tasks error: ${error.message}`);
        next(error);
    }
};

/**
 * @desc    Get single task
 * @route   GET /api/v1/tasks/:id
 * @access  Private
 */
exports.getTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id).populate('user', 'name email');

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        // Make sure user owns the task or is admin
        if (task.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to access this task'
            });
        }

        res.status(200).json({
            success: true,
            data: { task }
        });
    } catch (error) {
        logger.error(`Get task error: ${error.message}`);
        next(error);
    }
};

/**
 * @desc    Create new task
 * @route   POST /api/v1/tasks
 * @access  Private
 */
exports.createTask = async (req, res, next) => {
    try {
        // Add user to task
        req.body.user = req.user.id;

        const task = await Task.create(req.body);

        logger.info(`Task created by user ${req.user.email}: ${task.title}`);

        res.status(201).json({
            success: true,
            message: 'Task created successfully',
            data: { task }
        });
    } catch (error) {
        logger.error(`Create task error: ${error.message}`);
        next(error);
    }
};

/**
 * @desc    Update task
 * @route   PUT /api/v1/tasks/:id
 * @access  Private
 */
exports.updateTask = async (req, res, next) => {
    try {
        let task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        // Make sure user owns the task or is admin
        if (task.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this task'
            });
        }

        task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        logger.info(`Task updated by user ${req.user.email}: ${task.title}`);

        res.status(200).json({
            success: true,
            message: 'Task updated successfully',
            data: { task }
        });
    } catch (error) {
        logger.error(`Update task error: ${error.message}`);
        next(error);
    }
};

/**
 * @desc    Delete task
 * @route   DELETE /api/v1/tasks/:id
 * @access  Private
 */
exports.deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        // Make sure user owns the task or is admin
        if (task.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this task'
            });
        }

        await task.deleteOne();

        logger.info(`Task deleted by user ${req.user.email}: ${task.title}`);

        res.status(200).json({
            success: true,
            message: 'Task deleted successfully'
        });
    } catch (error) {
        logger.error(`Delete task error: ${error.message}`);
        next(error);
    }
};

/**
 * @desc    Get task statistics
 * @route   GET /api/v1/tasks/stats/me
 * @access  Private
 */
exports.getTaskStats = async (req, res, next) => {
    try {
        const stats = await Task.getUserTaskStats(req.user.id);

        const formatted = {
            total: 0,
            pending: 0,
            'in-progress': 0,
            completed: 0
        };

        stats.forEach(stat => {
            formatted[stat._id] = stat.count;
            formatted.total += stat.count;
        });

        res.status(200).json({
            success: true,
            data: { stats: formatted }
        });
    } catch (error) {
        logger.error(`Get task stats error: ${error.message}`);
        next(error);
    }
};
