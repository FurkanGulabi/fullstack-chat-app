import mongoose from "mongoose";

const MongoDBConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("MongoDB'ye bağlandı");
    } catch (error) {
        console.log("MongoDB bağlantı hatası: ", error.message);
    }
}

export default MongoDBConnect