import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import { getReciverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: reciverId } = req.params
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, reciverId] }
        })
        if (!message) {
            return res.status(500).json({ error: "No message" })
        }
        if (!reciverId) {
            return res.status(500).json({ error: "No reciverId" })
        }
        if (!senderId) {
            return res.status(500).json({ error: "No senderId" })
        }

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, reciverId],
            })
        }

        const newMessage = new Message({
            senderId,
            reciverId,
            message
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id)
        }

        await Promise.all([conversation.save(), newMessage.save()])
        res.status(201).json(newMessage)
        //socket io :)
        const reciverSocketId = getReciverSocketId(reciverId)
        if (reciverSocketId) {
            io.to(reciverSocketId).emit("newMessage", newMessage)
        }








    } catch (error) {
        console.log("CRITICAL!!! sendMessage Error", error.message);
        return res.status(500).json({ error: "Internal Server Error " })
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params
        const senderId = req.user._id
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate("messages");

        if (!conversation) return res.status(200).json([])

        const messages = conversation.messages
        res.status(200).json(messages)

    } catch (error) {
        console.log("CRITICAL!!! getMessage Error", error.message);
        return res.status(500).json({ error: "Internal Server Error " })
    }
}
