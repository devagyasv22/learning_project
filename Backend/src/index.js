import dotenv from "dotenv"; // Import dotenv
import connectDB from "./config/database.js";
import app from "./app.js";

// Load environment variables
dotenv.config(); // Automatically loads .env from the root directory

const startServer = async () => {
  try {
    // Debug log to verify MONGODB_URI is loaded
    console.log("MONGODB_URI:", process.env.MONGODB_URI);

    // Connect to MongoDB first
    await connectDB();

    // After DB connects, start server
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();