import { NextFunction, Request, Response } from "express";
import ApiError from "../errorHelpers/ApiError";
import { verifyToken } from "../utils/jwt";
import { envVars } from "../config/env";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/user/user.model";
import httpStatus from "http-status-codes";
import { IsActive } from "../modules/user/user.interface";

export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(authRoles, "user-0");
    try {
      const accessToken = req.cookies?.accessToken || req.headers.authorization;
      console.log(accessToken, "user-1");
      if (!accessToken) {
        throw new ApiError(403, "No token Recieved");
      }
      const verifiedToken = verifyToken(
        accessToken,
        envVars.JWT_ACCESS_SECRET
      ) as JwtPayload;
      console.log(verifiedToken, "user-2");
      const isUserExist = await User.findOne({ email: verifiedToken.email });
      console.log(isUserExist, "user-4");
      if (!isUserExist) {
        throw new ApiError(httpStatus.BAD_REQUEST, "User does not exist");
      }
      if (!isUserExist.isVerified) {
        throw new ApiError(httpStatus.BAD_REQUEST, "User is not verified");
      }
      if (
        isUserExist.isActive === IsActive.BLOCKED ||
        isUserExist.isActive === IsActive.INACTIVE
      ) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          `User is ${isUserExist.isActive}`
        );
      }
      if (isUserExist.isDeleted) {
        throw new ApiError(httpStatus.BAD_REQUEST, "User is deleted");
      }
      if (!authRoles.includes(verifiedToken.role)) {
        throw new ApiError(403, "You are not permitted to view this route!!!");
      }
      req.user = verifiedToken;
      next();
    } catch (error) {
      console.log("jwt error", error);
      next(error);
    }
  };
