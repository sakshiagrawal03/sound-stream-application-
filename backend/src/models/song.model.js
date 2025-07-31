import mongoose from "mongoose";

const songSchema = new mongoose.Schema ({
    title:{
        type:String,
        required:true,
        unique:true,
        },
    artist:{
        required:true,
        type:String

    },
    poster:{
        type:String,
        default:"https://demo.tutorialzine.com/2015/03/html5-music-player/assets/img/default.png"
    },
    audio:{
        type:String,
        required:true,
    }
})

const songModel=mongoose.model("song",songSchema)

export default songModel;