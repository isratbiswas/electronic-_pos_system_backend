import ApiError from "../../errorHelpers/ApiError";
import { IUser } from "../user/user.interface"
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import { generateToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { createNewAccessTokenWithRefreshToken } from "../../utils/userToken";

const credentialsLogin = async(payload: Partial<IUser>) => {
    const {email, password} = payload;
    const  isUserExist = await User.findOne({email});
    if(!isUserExist){
         throw new ApiError(httpStatus.BAD_REQUEST, "Email does not exist"); 
    }
    const isPasswordMatched = await bcryptjs.compare(password as string, isUserExist.password as string)
  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid password");
  }
  const jwtPayload = {
    userId:isUserExist._id,
    email:isUserExist.email,
    role: isUserExist.role
  }
   console.log(jwtPayload, "bye");
   const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES)
   const refreshToken = generateToken(jwtPayload, envVars.JWT_REFRESH_SECRET, envVars.JWT_REFRESH_EXPIRES)
   console.log(accessToken, refreshToken, "hira");
   return {
    accessToken,
    refreshToken
   }

}

const getNewAccessToken = async(refreshToken:string) =>{
     const newAccessToken = await createNewAccessTokenWithRefreshToken(refreshToken);
     return {
        accessToken: newAccessToken
     }

}

export const AuthServices = {
    credentialsLogin,
    getNewAccessToken
}