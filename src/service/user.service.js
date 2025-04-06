

import User from "./../models/user.model.js";
import ApiError from "../lib/ApiError.js";


const getUserByEmail = async (email, throwError = true) => {
    const user = await User.findOne({
        email: email
    })
    if (!user && throwError){
        throw new ApiError("user by this email not found", 404)
    }
    return user;
}

const getUserById = async (id, throwError = true) => {
    const user = await User.findOne({
        _id: id
    })
    if (!user && throwError){
        throw new ApiError("user by this email not found", 404)
    }
    return user;
}

const updateUser = async (id, updateData, throwError = true) => {
    try {
        const user = await User.findByIdAndUpdate(
            id,
            { $set: updateData }, 
            { new: true} 
        );

        if (!user && throwError) {
            throw new ApiError("User not found for update", 404);
        }

        return user;
    } catch (error) {
        throw new ApiError("Error while updating user", 500);
    }
};


export const UserService = {
    getUserByEmail,
    getUserById,
    updateUser
}