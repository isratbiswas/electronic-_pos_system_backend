import mongoose from "mongoose";
import { TGenericErrorResponse } from "../interfaces/error.type";


export const handleCastError = (err: mongoose.Error.CastError) : TGenericErrorResponse =>{
    return {
        statusCode: 500,
        message: "Invalid mongodb ObjectId. Please provide a valid  id"
    }
}