import User from "../models/userModel.js";
import nodemailer from 'nodemailer'
import transporter from "../configs/nodemailerConfig.js";
import dotenv from 'dotenv';
import moment from 'moment'; // moment kütüphanesini import et


dotenv.config(); // dotenv ile .env dosyasını yükleyin

export const sendVerificationEmail = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        // Kullanıcıyı ID'ye göre bul
        const user = await User.findById(loggedInUserId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const userEmail = user.email;
        const verifyToken = user.verificationToken;
        const username = user.username

        // Son gönderme zamanını kontrol etmek için
        const lastSent = user.lastVerificationEmailSentAt;

        // Eğer son gönderme zamanı varsa ve bir saat içinde ise hata döndür
        if (lastSent && moment().diff(lastSent, 'hours') < 1) {
            return res.status(429).json({ error: "Please wait before sending another verification email." });
        }

        const mailOptions = {
            from: process.env.MAIL_USER,
            to: userEmail,
            subject: 'Account Verification',
            html: `
                <html>
                    <head>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f4f4f4;
                                padding: 20px;
                                margin: 0;
                            }
                            .container {
                                max-width: 600px;
                                margin: 0 auto;
                                background-color: #fff;
                                padding: 40px;
                                border-radius: 5px;
                                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                            }
                            h1 {
                                color: #333;
                            }
                            p {
                                margin-bottom: 20px;
                                color: #555;
                            }
                            .btn {
                                display: inline-block;
                                background-color: #007bff;
                                color: #fff;
                                padding: 10px 20px;
                                text-decoration: none;
                                border-radius: 3px;
                            }
                            .btn:hover {
                                background-color: #0056b3;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h1>Merhaba, ${username}</h1>
                            <p>Hesabınızı doğrulamak için aşağıdaki bağlantıyı kullanabilirsiniz:</p>
                            <p><a class="btn" href="http://localhost:3000/api/verify/${verifyToken}">Hesabı Doğrula</a></p>
                            <p>Eğer bu e-postayı talep etmedinizse, bu e-postayı görmezden gelebilirsiniz.</p>
                        </div>
                    </body>
                </html>
            `,
        };


        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Error sending email:", error);
                return res.status(500).json({ error: "Error sending email" });
            }
            console.log("Email sent:", info.response);

            // Gönderme başarılı olduğunda son gönderme zamanını güncelle
            user.lastVerificationEmailSentAt = new Date();
            user.save();

            return res.json({ message: "Verification email sent successfully" });
        });

    } catch (error) {
        console.log("CRITICAL!!! sendVerificationEmail Error", error.message);
        return res.status(500).json({ error: "Internal Server Error " });
    }
}
export const verifyUser = async (req, res) => {
    try {
        const token = req.params.token;
        console.log(token);
        if (!token) {
            return res.status(404).json({ error: "No Token Found" });
        }

        // Token'e sahip olan kullanıcıyı bul
        const user = await User.findOne({ verificationToken: token });

        if (!user) {
            return res.status(404).json({ error: "User not found or already verified" });
        }

        // Kullanıcı zaten doğrulanmışsa
        if (user.isVerified) {
            return res.status(400).json({ error: "User already verified" });
        }

        // Kullanıcıyı doğrula
        user.isVerified = true;
        user.verificationToken = undefined; // Token'i kaldır
        await user.save();

        return res.redirect('https://chat-app-zyzo.onrender.com/profile/?verified=true');
    } catch (error) {
        console.log("CRITICAL!!! verifyUser Error", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};