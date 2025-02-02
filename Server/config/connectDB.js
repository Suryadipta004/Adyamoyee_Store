import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

if(!process.env.MONGODB_URL){
    throw new Error("Please provide a mongodb url in .env file")
}

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.error("Error while connecting to MongoDB",error)
        process.exit(1)
    }
}

export default connectDB