import { NextFunction, Request, Response } from "express";
import { CatchAsync } from "../../utils/CatchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { UserService } from "./user.service";
import { JwtPayload } from "jsonwebtoken";
import httpStatus from "http-status-codes";
import ApiError from "../../errorHelpers/ApiError";

const createUser = CatchAsync(async(req:Request, res:Response, next: NextFunction) =>{
    const user= await UserService.createUser(req.body);
   
    sendResponse(res,{
        success:true,
        message: "User created successfully",
        statusCode: 201,
        data: user
    })
})

const getMe = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user as JwtPayload;
    console.log(decodedToken, "getMe");
    const result = await UserService.getMe(decodedToken.userId);
    console.log(result , "getMe-1");
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User retrived successfully",
      data: result.data,
    });
  }
);

const updateUser = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const verifiedToken = req.user;
    const payload = req.body;
    const user = await UserService.updateUser(userId, payload, verifiedToken);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User updated successfully",
      data: user,
    });
  }
);

const updateProfile = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req.user as JwtPayload).userId;
    if (!userId) {
      throw new ApiError(400, "User not found");
    }
    const profile = await UserService.updateProfile(userId, req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "user profile updated successfully",
      data: profile,
    });
  }
);

export const UserController = {
    createUser,
    getMe,
    updateProfile,
    updateUser

}