import dotenv from "dotenv";
import axios from 'axios';

dotenv.config();

export const uploadImageToImgur = async (image) => {
    try {
        const url = 'https://api.imgur.com/3/image';
        const clientId = process.env.IMGUR_API; // Using IMGUR_API environment variable
        const headers = {
            Authorization: `Client-ID ${clientId}`,
            'Content-Type': 'application/json'
        };
        const response = await axios.post(url, {
            image: image.buffer.toString('base64'), // Convert Buffer to base64
            type: 'base64',
            privacy: 'hidden' // Set image privacy to hidden
        }, { headers });

        return response.data.data.link; // Return the URL of the uploaded image
    } catch (error) {
        console.error('Error uploading image to Imgur:', error);
        throw new Error('Failed to upload image to Imgur');
    }
};
