import express from 'express'
import { getMessages, sendMessage } from '../controllers/messageController.js'
import protectRoute from '../middleware/protectRoute.js'
import multer from 'multer'

const upload = multer()

const router = express.Router()

router.get("/:id", protectRoute, getMessages)
router.post("/send/:id", protectRoute, upload.single("image"), sendMessage)

export default router