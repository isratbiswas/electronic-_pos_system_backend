import ApiError from "../../errorHelpers/ApiError";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";


const createUser = async(payload: Partial<IUser>) =>{
    const {email, password, role, ...rest} = payload;
    const isUserExist = await User.findOne({email})
    if(isUserExist){
     throw new ApiError(httpStatus.BAD_REQUEST, "User Already Exist")
    }
    const hashedPassword = await bcryptjs.hash(password as string , Number(envVars.BCRYPT_SALT_ROUND));
    const authProvider :IAuthProvider = {provider: "credentials", providerId: email as string}
    const user = await User.create({
        email,
        password: hashedPassword,
        auths: [authProvider],
        role,
        ...rest
    });
    return user;
}

const updateUser = async (
  userId: string,
  payload: Partial<IUser>,
  decodedToken: JwtPayload
) => {
  // if (decodedToken.role === Role.CASHIER || decodedToken.role === Role.STAFF) {
  //   if (userId !== decodedToken.userId) {
  //     throw new ApiError(401, "You are not authorized");
  //   }
  // }

  const isUserExist = await User.findById(userId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  if (
    decodedToken.role === Role.ADMIN &&
    isUserExist.role === Role.SUPER_ADMIN
  ) {
    throw new ApiError(401, "You are not authorized");
  }

//   if (payload.role) {
//     if (decodedToken.role === Role.DRIVER || decodedToken.role === Role.RIDER) {
//       throw new ApiError(httpStatus.FORBIDDEN, "You are not authorized");
//     }
//   }

  const newUpdatedUser = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });
  return newUpdatedUser;
};
const getMe = async (userId: string) => {
 
  const user = await User.findById(userId);
  console.log(user, "getMe-3");
  return {
    data: user,
  };
};
const updateProfile = async (userId: string, payload: Partial<IUser>) => {
  if (payload.password) {
    const hashedPassword = await bcryptjs.hash(
      payload.password,
      Number(envVars.BCRYPT_SALT_ROUND)
    );
    payload.password = hashedPassword;
  }
  const profile = await User.findByIdAndUpdate(
    userId,
    { $set: payload },
    { new: true, runValidators: true }
  ).select("-password");
  return profile;
};
export const UserService = {
    createUser,
    getMe,
    updateUser,
    updateProfile
}