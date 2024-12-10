import mongoose from "mongoose";

//for create table into db
const usersSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    time_in_days: { type: String, required: true },
    loginStatus: { type: String, required: true },
    start_time: { type: String, required: true },

}, {
    //for date
    timestamps: true
});

const Users = mongoose.model("Users", usersSchema);
export default Users;