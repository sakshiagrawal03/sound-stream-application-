import { log } from 'console';
import mongoose from 'mongoose';

function connectToDatabase(){

    mongoose.connect("mongodb://localhost:27017/n22-music-project").then(() => {

        console.log("Connected to the database successfully");
        
    }).catch((error) => {
        log("Error connecting to the database:", error);
    })
}


export default connectToDatabase;
