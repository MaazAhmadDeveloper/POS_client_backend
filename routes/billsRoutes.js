import express from "express";
import { addBillsController, getBillsController, updateBillController } from "../controllers/billsController.js";

const billsRouter = express.Router();

billsRouter.post("/addbills", addBillsController);
billsRouter.patch("/updatebill", updateBillController);

billsRouter.get("/getbills", getBillsController);

export default billsRouter;