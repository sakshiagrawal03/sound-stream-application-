// import { log } from 'console';
// import mongoose from 'mongoose'
// import dotenv from "dotenv";

// dotenv.config();

// function connectToDatabase(){
// mongoose.connect(process.env.MONGODB_URL).then(() => {

//     // mongoose.connect("mongodb://localhost:27017/n22-music-project").then(() => {

//         console.log("Connected to the database successfully");
        
//     }).catch((error) => {
//         log("Error connecting to the database:", error);
//     })
// }


// export default connectToDatabase;
import mongoose from 'mongoose';

const connectToDatabase = async () => {
    try {
        mongoose.connection.on('connected', () => console.log("MongoDB connected successfully"))
        await mongoose.connect(`${process.env.MONGODB_URL}/steam`)
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); // Exit the process with failure
    }
}

export default connectToDatabase;
