import { log } from 'node:console';
import app from './src/app.js'     //app.js likhna zruri hain kyuki pakage.json me module rkha hain 
import connectToDatabase from './src/db/db.js'

connectToDatabase();

app.listen(3000,()=>{
    console.log("server is running on http://localhost:3000");
    
})