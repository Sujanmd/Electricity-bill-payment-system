const mongoose = require("mongoose");
const connectDB = require("./config/db");
const User = require("./models/User");

// Default Admin Credentials
const adminUser = {
    name: "System Admin",
    email: "admin@example.com",
    password: "admin123", // Ideally hashed, but plain text for this project as per existing login logic
    role: "admin"
};

const seedAdmin = async () => {
    try {
        await connectDB();

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: adminUser.email });

        if (existingAdmin) {
            console.log("\n⚠️  Admin already exists!");
            console.log(`Email: ${existingAdmin.email}`);
            console.log(`Password: (Use the one you set originally)`);
        } else {
            const newAdmin = new User(adminUser);
            await newAdmin.save();
            console.log("\n✅ Admin created successfully!");
            console.log(`Email: ${adminUser.email}`);
            console.log(`Password: ${adminUser.password}`);
        }

        process.exit();
    } catch (error) {
        console.error("\n❌ Error creating admin:", error);
        process.exit(1);
    }
};

seedAdmin();
