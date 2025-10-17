// import express from 'express';
// import {uploadSongController,getSongs,getSongById,searchSong} from '../controllers/song.controller.js';
// import multer from 'multer';// multer is used for handling form-data(in postman or fro frontend), which is primarily used for uploading files beacause express.json can not read audio,image files data it can only read raw data

// import jwt from 'jsonwebtoken';

// const router = express.Router();

// const storage = multer.memoryStorage();
// const uploadMiddleware = multer({ storage: storage }); 


// router.use((req,res,next)=>{
//     const token = req.cookies.token; //get token that was created when user loginned and stored in cookies

//     if(!token){
//         return res.status(401).json({
//             message:"Unauthorized"
//         })
//     }
//     try{                                       //then chrck the token is correct or not 
//         const decoded= jwt.verify(token,process.env.JWT_SECRET_KEY) ;
//         req.user=decoded;
//         next()
//     }
//     catch(err){
//         return  res.status(401).json({
//             message:"Unauthorized"
//          })
//     }

// })


// router.post('/upload', uploadMiddleware.single('audio'), uploadSongController);

// router.get('/get',getSongs)

// router.get('/search-songs',searchSong)

// router.get('/get-song/:mama',getSongById)


// export default router;
import express from 'express';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import {
  uploadSongController,
  getSongs,
  getSongById,
  searchSong,
} from '../controllers/song.controller.js';

const router = express.Router();

// Multer setup
const storage = multer.memoryStorage();
const uploadMiddleware = multer({ storage });

// ✅ JWT Auth Middleware (only for protected routes)
function authMiddleware(req, res, next) {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || "defaultsecret");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

// ✅ Routes
router.post('/upload', authMiddleware, uploadMiddleware.single('audio'), uploadSongController);

router.get('/get', getSongs);

router.get('/search-songs', searchSong);

router.get('/get-song/:id', getSongById); // ✅ changed from :mama to :id

export default router;