import mongoose from "mongoose";
const connectDB = async () => {
    try {
        // connect to the database from .enc
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Connecting to Mongoose: ${conn.connection.host}`);
    } catch (err) {
        console.error(` error: ${err.message}`);
        process.exit(1);
    }
};

export default connectDB;