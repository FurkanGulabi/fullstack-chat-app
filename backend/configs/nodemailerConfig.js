import nodemailer from 'nodemailer'
import dotenv from 'dotenv';

dotenv.config(); // dotenv ile .env dosyasını yükleyin

const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // Outlook'un SMTP host bilgisi
    port: 587, // Genellikle 587 veya 465 portu kullanılır
    secure: false, // false ise TLS kullanılacak, true ise SSL kullanılacak
    auth: {
        user: process.env.MAIL_USER, // Gönderen e-posta adresi
        pass: process.env.MAIL_PASS, // Gönderen e-posta şifresi
    },
});

export default transporter