import User from "../models/userModel.js";

export const getUsers = async (req, res) => {
    try {
        const loggedInUserId = req.user._id

        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password -verificationToken -email -lastVerificationEmailSentAt")


        return res.status(200).json(filteredUsers)
    } catch (error) {
        console.log("CRITICAL!!! getUsers Error", error.message);
        return res.status(500).json({ error: "Internal Server Error " })
    }
}