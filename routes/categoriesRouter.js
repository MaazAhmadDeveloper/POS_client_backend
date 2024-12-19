import express from "express";
import { getCategoriesController, addCategoriesController, updateCategoriesController, deleteCategoriesController } from "../controllers/categoriesController.js"; 
import fs from "fs";
import path from "path";
import multer from "multer";
const categoriesRouter = express.Router();

// Multer setup to handle image uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const dir = './uploads/';
//     if (!fs.existsSync(dir)) {
//       fs.mkdirSync(dir);
//     }
//     cb(null, dir);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage: storage });

categoriesRouter.post("/addCategories",  addCategoriesController);

categoriesRouter.get("/getCategories", getCategoriesController);

categoriesRouter.put("/updateCategories", updateCategoriesController);
// categoriesRouter.put("/updateCategories", upload.single('image'), updateCategoriesController);

categoriesRouter.put("/deleteCategories", deleteCategoriesController);

export default categoriesRouter;