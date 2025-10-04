import { log } from 'console';
import mongoose from 'mongoose'
import dotenv from "dotenv";

dotenv.config();

function connectToDatabase(){
mongoose.connect(process.env.MONGODB_URL).then(() => {

    // mongoose.connect("mongodb://localhost:27017/n22-music-project").then(() => {

        console.log("Connected to the database successfully");
        
    }).catch((error) => {
        log("Error connecting to the database:", error);
    })
}


export default connectToDatabase;
