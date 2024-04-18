import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import { sendVerificationEmail, verifyUser } from '../controllers/verifyEmailController.js';

const router = express.Router();

// Kullanıcıya doğrulama e-postasını gönderme
router.get("/", protectRoute, sendVerificationEmail);

// Kullanıcının doğrulama bağlantısını tıklamasını işleme
router.get("/:token", verifyUser);

export default router;
