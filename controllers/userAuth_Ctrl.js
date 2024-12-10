import Users from "../models/userAuthModel.js";
import mongoose from "mongoose";
import axios from "axios";
import { adminBaseUrl } from "../utils/variables.js";

//for add or fetch
export const getUserController = async (req, res) => {
    try {

        const user = await Users.findOne({});
        res.status(200).send(user);
    } catch(error) {
        console.log(error);
    }
}
//for check verification 
export const checkUserController = async (req, res) => {
    const {_email} = req.params;
    try {
        const user = await Users.findOne({email: _email});

        if (!user){
            return res.status(200).send({verification_code: 2});
        }
        const initialDate = new Date(user.start_time);
        const currentDate = new Date();
        const timeElapsed = currentDate - initialDate;
        // const reassignmentDuration = (user.time_in_days * 30 * 24 * 60 * 60 * 1000);
        const reassignmentDuration = user.time_in_days * 60 * 1000;
        if (timeElapsed >= reassignmentDuration) {
            await Users.findOneAndDelete({ email: _email });
            const response = await axios.post(`${adminBaseUrl}/api/users/userexpired/${_email}`);

            if (response.data.server_code === 0) {
                return res.status(200).json({message: `Dear Customer, Admin Deleted you please contact with support. `,verification_code: 0}); 
            }else if (response.data.server_code === 1) {
                return res.status(200).json({message: `Dear ${response.data.user.userName}, Your POS time Expired please contact to support! `,verification_code: 0});
            }
        }else {
            return res.status(200).send({user, verification_code: 1});
        }
    } catch(error) {
        console.log(error);
    }
}

//Add new user
export const addUserController = async (req, res) => {
    const { loginStatus, email, name, start_time, time_in_days } = req.body.userData;
    
    try {
        // Construct the user object
        const userObj = {
            userName: name,
            email,
            time_in_days,
            loginStatus,
            start_time,
        };

        // Check if a user with the same email already exists
        const existingUser = await Users.findOne({ email });

        if (existingUser) {
            // If the user exists, update the existing document with the new data
            await Users.updateOne({ email }, { $set: userObj });
            res.status(200).send("User Updated Successfully!");
        } else {
            // If the user does not exist, create a new user document
            const adduserForAuth = new Users(userObj);
            await adduserForAuth.save();
            res.status(200).send("User Added Successfully!");
        }

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};


//for update
// export const updateUserController = async (req, res) => {
//     try {

//         await Users.findOneAndUpdate({_id: req.body.productId}, req.body, {new: true})
//         res.status(201).json("Product Updated!");
//     } catch(error) {
//         res.status(400).send(error);
//         console.log(error);
//     }
// }

//for delete
export const deleteUserController = async (req, res) => {
    const {_email} = req.params;
    try {9
        await Users.findOneAndDelete({ email: _email });
        res.status(200).json("User Deleted!");
      } catch (error) {
        res.status(400).send(error);
        console.log(error);
      }
};