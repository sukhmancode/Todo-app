import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const connectDb = async() => {
    try {
        const mongoURI = process.env.MONGO_URL
        if (!mongoURI) {
            throw new Error("MongoDB URI is not defined in the environment variables");
          }
        await mongoose.connect(mongoURI);
        console.log("mongo connected")
    }
    catch(err) {
        console.log(err);
    }
}
export default connectDb;