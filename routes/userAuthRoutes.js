import express from "express";
import { addUserController, checkUserController, deleteUserController, getUserController } from "../controllers/userAuth_Ctrl.js";

const userAuthRoutes = express.Router();

userAuthRoutes.get("/getUser", getUserController);
userAuthRoutes.get("/checkUser/:_email", checkUserController);
userAuthRoutes.post("/addUser", addUserController);
userAuthRoutes.delete("/deleteUser/:_email", deleteUserController);

export default userAuthRoutes;