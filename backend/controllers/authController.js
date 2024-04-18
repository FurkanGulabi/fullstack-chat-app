import User from '../models/userModel.js'
import crypto from 'crypto'
import bcryptjs from 'bcryptjs'
import generateTokenAndSetCookie from '../utils/JWTToken.js'

export const registerUser = async (req, res) => {
    try {
        const { username, email, password, confirmPassword, gender } = req.body
        if (!username || !email || !password || !confirmPassword || !gender) {
            return res.status(400).json({ error: "Eksik veri" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Şifreler Uyuşmuyor" })
        }
        const checkForUsername = await User.findOne({ username })
        if (checkForUsername) {
            return res.status(400).json({ error: "Kullanıcı adı zaten alınmış" })
        }
        const checkForEmail = await User.findOne({ email })
        if (checkForEmail) {
            return res.status(400).json({ error: "E-posta zaten kullanılıyor" })
        }
        const validUsernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
        if (!validUsernameRegex.test(username)) {
            return res.status(400).json({ error: "Kullanıcı adı geçersiz karakterler içeriyor" });
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const verificationToken = crypto.randomBytes(8).toString('hex');

        if (!verificationToken) {
            return res.status(400).json({ error: "Kullanıcı tokeni oluştururken bir hata oluştu, lütfen sayfayı yenileyip tekrar kayıt olmayı deneyiniz." })
        }

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
            verificationToken
        })


        if (newUser) {
            await generateTokenAndSetCookie(newUser._id, res)
            await newUser.save()

            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                profilePic: newUser.profilePic,
                isVerified: newUser.isVerified,
                createdAt: newUser.createdAt
            })

        } else {
            console.log("CRITICAL!!! newUser Register Error", error.message);
            return res.status(500).json({ error: "Internal Server Error " })
        }


    } catch (error) {
        console.log("CRITICAL!!! Register Error", error.message);
        return res.status(500).json({ error: "Internal Server Error " })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        const isPasswordCorrect = await bcryptjs.compare(password, user?.password || "")

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "E-posta ya da şifre yanlış !" })
        }
        generateTokenAndSetCookie(user._id, res)

        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePic: user.profilePic,
            isVerified: user.isVerified,
            createdAt: user.createdAt
        })

    } catch (error) {
        console.log("CRITICAL!!! Login Error", error.message);
        return res.status(500).json({ error: "Internal Server Error " })
    }
}

export const logoutUser = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        return res.status(200).json({ message: "Başarılı bir şekilde çıkış yapıldı" })
    } catch (error) {
        console.log("CRITICAL!!! Logout Error", error.message);
        return res.status(500).json({ error: "Internal Server Error " })
    }
}

export const reAuth = async (req, res) => {
    try {
        const senderId = await req.user._id;

        if (!senderId) {
            return res.status(500).json({ error: "No senderId" })
        }

        const user = await User.findOne(senderId)

        if (!user) {
            return res.status(500).json({ error: "No User" })
        }
        if (res.headersSent) {
            // Response zaten gönderildiyse tekrar gönderme
            return;
        }
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePic: user.profilePic,
            isVerified: user.isVerified,
            createdAt: user.createdAt
        })
    } catch (error) {
        console.log("CRITICAL!!! reauth Error", error.message);
        return res.status(500).json({ error: "Internal Server Error " })
    }
}