import userModel from "../models/user.model.js" 
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


export async function registerUser(req,res){
    const{username,password} = req.body;

    const isUserExists= await userModel.findOne({username})

    if(isUserExists){
        return res.status(400).json({
            message: "User already exists",
        })}

        const hashedPassword = await bcrypt.hash(password, 10);

        const user=await userModel.create({
            username,
            password: hashedPassword,
        });

        const token= jwt.sign({
            id:user._id},
             process.env.JWT_SECRET_KEY,
            {expiresIn: "1d"})    //1day

            res.cookie("token", token, {
                httpOnly: true,
                secure: true,       // must be true on HTTPS
                sameSite: "none",   // allows cross-site cookies
                maxAge: 24 * 60 * 60 * 1000, // 1 day
                });

            //set cookie in response

        //Response send krne se phle token generate krege 
        return res.status(201).json({
            messsage: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
            },
            token})
        }

            export async function loginUser(req,res){
                const {username,password}=req.body
                
                const user = await userModel.findOne({username})

                if(!user){
                    return res.status(400).json({
                        message: "Invalid username or password",
                    })
                }
            

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if(!isPasswordValid){
                return res.status(400).json({
                    message: "Invalid username or password",
                });
            }

            const token = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "1d" }
            );
            
            res.cookie("token", token, {
            httpOnly: true,
            secure: true,       // MUST be true for HTTPS (Vercel)
            sameSite: "none",   // MUST be none for cross-domain
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            });


            return res.status(200).json({
                
                message: "User logged in successfully",
                user: {
                    id: user._id,
                    username: user.username,
                },
                token
            });
        }

        export async function me(req,res){
            const token =req.cookies.token
            
            if (!token){
                
                return res.status(401).json({
                    message: "Unauthorized"
                });
            }
            try {
               const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
                const user = await userModel.findById(decoded.id);

                return res.status(200).json({
                user: {
                    id: user._id,
                    username: user.username,
                },
                message: "User authenticated successfully"
                });

    }
            catch (error) {
                return res.status(401).json({
                    message: "unauthorized",
                });
            }
        }
            