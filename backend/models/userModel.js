import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    profilePic: {
        type: String,
        default: ""
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String,
    },
    lastVerificationEmailSentAt: {
        type: Date,
        default: null,
    },
}, { timestamps: true });

// Create a model based on the schema
const User = mongoose.model("User", userSchema);

export default User;
