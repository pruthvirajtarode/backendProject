/**
 * Seed Script - Create Demo Users
 * Run this to create demo users for testing
 */

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const seedUsers = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected');

        const users = [
            {
                name: 'Admin User',
                email: 'admin@taskmanager.com',
                password: 'password123',
                role: 'admin'
            },
            {
                name: 'Demo User',
                email: 'user@taskmanager.com',
                password: 'password123',
                role: 'user'
            },
            {
                name: 'Pruthviraj Tarode',
                email: 'pruthvirajtarode456@gmail.com',
                password: 'password123',
                role: 'admin'
            }
        ];

        for (const userData of users) {
            const existingUser = await User.findOne({ email: userData.email });

            if (!existingUser) {
                await User.create(userData);
                console.log(`✅ Created: ${userData.email} (${userData.role})`);
            } else {
                console.log(`ℹ️  Exists: ${userData.email}`);
            }
        }

        console.log('\n🎉 All demo users ready!');
        console.log('\n📝 Demo Credentials:');
        console.log('   Admin: admin@taskmanager.com / password123');
        console.log('   User:  user@taskmanager.com / password123');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

seedUsers();
