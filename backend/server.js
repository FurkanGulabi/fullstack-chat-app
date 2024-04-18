import express from "express"
import cors from 'cors'
import logger from 'morgan'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"
import path from "path"; // Import the 'path' module

import MongoDBConnect from "./db/MongoDBConnect.js"

import authRoutes from './routes/authRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import userRoutes from './routes/userRoutes.js'
import verifyEmailRoute from './routes/verifyEmailRoute.js'
import { app, server } from "./socket/socket.js"

dotenv.config()

const port = process.env.PORT
const __dirname = path.resolve()



app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5000', // İzin vermek istediğiniz kök URL
    credentials: true, // Credentials (örneğin, Cookie'leri) ile kullanılacaksa true olmalı
}));
app.use(express.urlencoded({ extended: false }));
app.use(logger("tiny"))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "/frontend/dist")))
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})


//middleware
app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)
app.use("/api/verify", verifyEmailRoute)


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend/dist/index.html"))
})


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend/dist/index.html"))
})








server.listen(port, () => {
    MongoDBConnect()
    console.log(`Sunucu ${port} portunda çalışıyor`);
})