import Bills from "../models/billsModel.js";
import axios from "axios";

//for add or fetch
export const getBillsController = async (req, res) => {
    try {

        const bills = await Bills.find().sort({ createdAt: -1 });
        res.send(bills);

    } catch(error) {
        console.log(error);
    }
}

//for update
export const updateBillController = async (req, res) => {

        try {
            console.log(req.body);
            const respo = await Bills.findOneAndUpdate({_id: req.body._id}, { ...req.body }, {new: true})
            res.send("Bills Updated!");
    
        } catch(error) {
            console.log("error");
        }
};

//for add
export const addBillsController = async (req, res) => {

        try {
            const newBills = new Bills(req.body);
            await newBills.save();
            res.send("Bill Created Successfully!");
    
        } catch(error) {
            console.log("error");
        }
};