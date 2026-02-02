/**
 * Task Model
 * Secondary entity for CRUD operations
 */

const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a task title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'Description cannot be more than 500 characters']
    },
    status: {
        type: String,
        enum: {
            values: ['pending', 'in-progress', 'completed'],
            message: '{VALUE} is not a valid status'
        },
        default: 'pending'
    },
    priority: {
        type: String,
        enum: {
            values: ['low', 'medium', 'high'],
            message: '{VALUE} is not a valid priority'
        },
        default: 'medium'
    },
    dueDate: {
        type: Date
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Task must belong to a user']
    },
    completedAt: {
        type: Date
    }
}, {
    timestamps: true
});

// Indexes for performance
TaskSchema.index({ user: 1, status: 1 });
TaskSchema.index({ createdAt: -1 });
TaskSchema.index({ dueDate: 1 });

// Automatically set completedAt when status changes to completed
TaskSchema.pre('save', function (next) {
    if (this.isModified('status') && this.status === 'completed' && !this.completedAt) {
        this.completedAt = new Date();
    }
    next();
});

// Static method to get user's task statistics
TaskSchema.statics.getUserTaskStats = async function (userId) {
    const stats = await this.aggregate([
        {
            $match: { user: mongoose.Types.ObjectId(userId) }
        },
        {
            $group: {
                _id: '$status',
                count: { $sum: 1 }
            }
        }
    ]);

    return stats;
};

// Instance method to check if task is overdue
TaskSchema.methods.isOverdue = function () {
    if (!this.dueDate || this.status === 'completed') {
        return false;
    }
    return new Date() > this.dueDate;
};

module.exports = mongoose.model('Task', TaskSchema);
