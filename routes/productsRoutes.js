import express from "express";
import fs from "fs";
import path from "path";
import { getProductController, addProductController, updateProductController, deleteProductController } from "../controllers/productController.js";
import multer from "multer";
const productRouter = express.Router();

// Multer setup to handle image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads/';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });
productRouter.get("/getproducts", getProductController);

productRouter.post("/addproducts", upload.single('image'), addProductController);

productRouter.put("/updateproducts", upload.single('image'), updateProductController);

productRouter.post("/deleteproducts", deleteProductController);

export default productRouter;