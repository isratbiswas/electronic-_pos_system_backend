import { NextFunction, Request, Response } from "express";
import { CatchAsync } from "../../utils/CatchAsync";
import httpStatus from "http-status-codes";
import { AuthServices } from "./auth.service";
import { setAuthCookie } from "../../utils/setCookie";
import { sendResponse } from "../../utils/sendResponse";
import { envVars } from "../../config/env";
import ApiError from "../../errorHelpers/ApiError";

const credentialsLogin= CatchAsync(async(req:Request, res: Response,next:NextFunction) =>{
    const loginInfo = await AuthServices.credentialsLogin(req.body);
    console.log(loginInfo);
    setAuthCookie(res, {accessToken:loginInfo.accessToken, refreshToken:loginInfo.refreshToken});
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User Logged in Successfully",
        data: loginInfo
    })

})

const logout = CatchAsync(async(req:Request, res: Response, next:NextFunction) =>{
   res.clearCookie("accessToken", {
       httpOnly: true,
       secure:true,
       sameSite: "none"
   })
   res.clearCookie("refreshToken", {
       httpOnly: true,
       secure:true,
       sameSite: "none"
   })

   sendResponse(res, {
    success:true,
    statusCode:httpStatus.OK,
    message: "User Logged Out Successfully",
    data: null
   })
})

const getNewAccessToken = CatchAsync(async(req: Request, res: Response, next:NextFunction) =>{
   const refreshToken = req.cookies.refreshToken;
   if(!refreshToken){
       throw new ApiError(httpStatus.BAD_REQUEST, "No refresh token recieved from cookies")
   }
   const tokenInfo = await AuthServices.getNewAccessToken(refreshToken as string);
   setAuthCookie(res, tokenInfo);
   sendResponse(res, {
   success: true,
        statusCode: httpStatus.OK,
        message: "New Access Token Retrived Successfully",
        data: tokenInfo,

   })
})

export const AuthControllers = {
    credentialsLogin,
    logout,
    getNewAccessToken
}