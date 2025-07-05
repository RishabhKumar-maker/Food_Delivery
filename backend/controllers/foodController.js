import foodModel from "../models/foodModel.js";
import fs from "fs";

const addFood = async(req, res) => {
    let image_filename = `${req.file.filename}`;
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: image_filename,
        category: req.body.category
    })

    try {
        await food.save();
        res.json({success: true, message: "Food item added successfully"});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error in adding food item"});
    }
}

const listFood = async(req, res) => {
    try {
        const foodItems = await foodModel.find({});
        res.json({success: true, foodItems});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error in fetching food items"});
        
    }
}

const removeFood = async(req, res) => {
    try {
        const foodItem = await foodModel.findById(req.body.id);
        if (foodItem) {
            // Remove the image file from the server
            fs.unlink(`uploads/${foodItem.image}`, ()=>{});
            await foodModel.findByIdAndDelete(req.body.id);
            res.json({success: true, message: "Food item removed successfully"});
        } else {
            res.json({success: false, message: "Food item not found"});
        }
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error in removing food item"});
    }
}


export {addFood, listFood, removeFood}