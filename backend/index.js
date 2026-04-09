import express from "express"; 
import dotenv from "dotenv"; 
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app,server } from "./socket/socket.js";
dotenv.config({});

 
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json()); 
app.use(cookieParser());
const corsOption={
    origin:[
      'https://chatapp-frontend-nu-sand.vercel.app',
      'https://chatapp-frontend-git-main-devashishs-projects-b9180a99.vercel.app',
      'http://localhost:3000',
      'http://localhost:3001'
    ],
    credentials:true
};
app.use(cors(corsOption));
app.options('*', cors(corsOption)); 


// routes
app.use("/api/v1/user",userRoute); 
app.use("/api/v1/message",messageRoute);
 

server.listen(PORT, ()=>{
    connectDB();
    console.log(`Server listen at prot ${PORT}`);
});

