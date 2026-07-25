import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not defined in .env");
  process.exit(1);
}

async function testConnection() {
  try {
    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Successfully connected to MongoDB via Mongoose!");
    
    // Close the connection immediately after success
    await mongoose.connection.close();
    console.log("Connection closed successfully.");
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:");
    console.error(error);
    process.exit(1);
  }
}

testConnection();
