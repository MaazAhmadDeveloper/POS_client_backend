// categoriesModel.js
import mongoose from "mongoose";

// Define the schema for categories
const categoriesSchema = new mongoose.Schema({
    category: { type: String, required: true },
    image: { type: String, default: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/1280px-Placeholder_view_vector.svg.png" }
}, {
    timestamps: true // Include timestamps
});

// Define the model with the correct name "Categories"
const Categories = mongoose.model("Categories", categoriesSchema);

export default Categories;
