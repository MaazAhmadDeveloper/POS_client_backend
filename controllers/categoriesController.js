import Categories from "../models/categoriesModel.js";
import axios from "axios";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//for add or fetch
export const getCategoriesController = async (req, res) => {
    try {

        const categories = await Categories.find().sort({ createdAt: -1 });
        res.send(categories);

    } catch(error) {
        console.log(error);
    }
}

//for add
export const addCategoriesController = async (req, res) => {
    const imageUrl = `/uploads/${req.file.filename}`;
        try {
            const newCategories = new Categories({...req.body, image: imageUrl});
            await newCategories.save();
            res.send("Category Created Successfully!");
    
        } catch(error) {
            console.log("error");
        }


}
// for update
export const updateCategoriesController = async (req, res) => {
    const { productId, category } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;
    try {

        await Categories.findOneAndUpdate({_id: productId}, { category, image }, {new: true})
        res.status(201).json("Product Updated!");
    } catch(error) {
        res.status(400).send(error);
        console.log(error);
    }

}
// for delete
export const deleteCategoriesController = async (req, res) => {
    try {
        const fullPath = path.join(__dirname, "..", 'uploads', path.basename(req.body.imagePath));

        fs.unlink(fullPath, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error deleting the image.');
            }
        });
        await Categories.findOneAndDelete({_id: req.body.productId})
        res.status(200).json("Product Deleted!");
    } catch(error) {
        res.status(400).send(error);
        console.log(error);
    }
};