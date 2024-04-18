import express from 'express'
import { loginUser, registerUser, logoutUser, reAuth } from '../controllers/authController.js'
import protectRoute from '../middleware/protectRoute.js'

const router = express.Router()

router.post("/register", registerUser)

router.post("/login", loginUser)

router.post("/logout", logoutUser)

router.get("/re-auth", protectRoute, reAuth)


export default router