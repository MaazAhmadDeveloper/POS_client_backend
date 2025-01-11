import mongoose from "mongoose";

//for create table into db
const billsSchema = new mongoose.Schema({

    billNumber: { type: String, required: true },
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    customerAddress: { type: String, required: true },
    subTotal: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    discount: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    servicetType: { type: String, required: true },
    serviceTax: { type: Number },
    deliveryFee: { type: Number },
    perHead: { type: Number },
    handler: { type: String, required: true },
    cartItems: { type: Array, required: true }

}, {
    //for date
    timestamps: true
});

const Bills = mongoose.model("Bills", billsSchema);
export default Bills;