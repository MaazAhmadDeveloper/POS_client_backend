import Product from "../models/productModel.js";
import mongoose from "mongoose";
import axios from "axios";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//for add or fetch
export const getProductController = async (req, res) => {
    try {

        const products = await Product.find().sort({ createdAt: -1 });
        res.status(200).send(products);

    } catch(error) {
        console.log(error);
    }
}

//for add
export const addProductController = async (req, res) => {
    // const imageUrl = `/uploads/${req.file.filename}`;
    try {

        const newProducts = new Product({...req.body});
        await newProducts.save();
        res.status(200).send("Products Created Successfully!");

    } catch(error) {
        console.log(error);
    }

}

//for update
export const updateProductController = async (req, res) => {
    try {
        const { productId, name, category, price } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

        await Product.findOneAndUpdate({_id: productId}, { name, category, price, image }, {new: true})
        res.status(201).json("Product Updated!");
    } catch(error) {
        res.status(400).send(error);
        console.log(error);
    }
}

//for delete
export const deleteProductController = async (req, res) => {

    if (Array.isArray(req.body.productsIdArray) ) {

        // to delete all products by deleting one category 
        try {

            const objectIdsToDelete = req.body.productsIdArray.map(id => mongoose.Types.ObjectId(id));
            await Product.deleteMany({ _id: { $in: objectIdsToDelete } });
        
            res.status(200).json("All Products of one category Deleted!");
          } catch (error) {
            console.error("Error deleting documents:", error);
          }
    }else{
        // to delete one product by products sections
        try {
            const fullPath = path.join(__dirname, "..", 'uploads', path.basename(req.body.imagePath));

            fs.unlink(fullPath, (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error deleting the image.');
                }
            });
            await Product.findOneAndDelete({_id: req.body.productId});
            res.status(200).json("Product Deleted!");
        } catch(error) {
            res.status(400).send(error);
            console.log(error);
        }
    }
};