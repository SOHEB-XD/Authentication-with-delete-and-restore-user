const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const dbURI = process.env.MONGO_URI;
        if (!dbURI) {
            throw new Error('MONGO_URI is not defined. Please set it in your .env file.');
        }

        await mongoose.connect(dbURI);
        console.log("Database connected")
    } catch (error) {
        console.log("Error in connecting to database:", error)
        process.exit(1) // Exit process with failure
    }
}

module.exports = connectDB