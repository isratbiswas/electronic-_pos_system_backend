import { NextFunction, Request, Response } from "express";
import { TErrorSources } from "../interfaces/error.type";
import { handleDuplicateError } from "../helpers/handleDuplicateError";
import { handleCastError } from "../helpers/handleCastError";
import { handleValidationError } from "../helpers/handleValidationError";
import { handlerZodError } from "../helpers/handleZodError";
import ApiError from "../errorHelpers/ApiError";
import { envVars } from "../config/env";


export const globalErrorHandler = async(err:any, req:Request, res:Response, next: NextFunction) =>{
   
    let errorSources : TErrorSources[] = []
    let statusCode = 500
    let message = "Something went wrong"

    //Duplicate Error 
    if(err.code ===11000){
        const simplifiedError = handleDuplicateError(err)
        statusCode = simplifiedError.statusCode;
        message= simplifiedError.message
    }

    // Object ID or Cast Error
    else if(err.name === "CastError"){
        const simplifiedError = handleCastError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message
    }

    // Validation error 
     else if(err.name === "ValidationError"){
        const simplifiedError = handleValidationError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message
        errorSources = simplifiedError.errorSources as TErrorSources[]
     }
     // zod error
     else if(err.name === "ZodError"){
        const simplifiedError =  handlerZodError(err)
        statusCode = simplifiedError.statusCode;
        message= simplifiedError.message;
        errorSources = simplifiedError.errorSources as TErrorSources[]
     }

     else if (err instanceof ApiError){
        statusCode = err.statusCode;
        message = err.message
     }
     else if (err instanceof Error) {
         statusCode = 500;
         message = err.message
     }
     res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        err: envVars.NODE_ENV === "development" ? err : null,
        stack: envVars.NODE_ENV === "development" ? err.stack : null
     })
}