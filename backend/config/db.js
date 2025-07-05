import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://2022uee1098:Voxu9gGTQiUwxN54@cluster0.wncx4of.mongodb.net/food-del')
    .then(() => {
        console.log("MongoDB connected successfully");
    })
}