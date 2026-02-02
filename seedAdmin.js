/**
 * Seed Script - Create Admin User
 * Run this to create the demo admin user
 */

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const seedAdmin = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected');

        // Check if admin exists
        const existingAdmin = await User.findOne({ email: 'admin@taskmanager.com' });

        if (existingAdmin) {
            console.log('ℹ️  Admin user already exists');
            process.exit(0);
        }

        // Create admin user
        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@taskmanager.com',
            password: 'password123',
            role: 'admin'
        });

        console.log('✅ Admin user created successfully!');
        console.log('📧 Email: admin@taskmanager.com');
        console.log('🔑 Password: password123');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

seedAdmin();
