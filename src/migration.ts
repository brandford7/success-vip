import mongoose from "mongoose";
import User from "@/models/User"; // Adjust the path to your User model

// MongoDB connection URL
const MONGO_URI = process.env.MONGO_URI || "your-mongodb-connection-string";

async function dbMigration() {
  try {
    // Connect to the database
    await mongoose.connect(MONGO_URI, );

    console.log("Connected to MongoDB");

    // Update all users that don't have a role field
    const result = await User.updateMany(
      { customerId: { $exists: false } }, // Filter documents without a role field
      //{ $set: { role: "user" } } // Add default role
    );

    console.log(`Migration completed. Updated ${result.modifiedCount} users.`);
    mongoose.connection.close();
  } catch (error) {
    console.error("Migration failed:", error);
    mongoose.connection.close();
  }
}

dbMigration();
