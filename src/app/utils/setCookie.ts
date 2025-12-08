import { Response } from "express";
// import { envVars } from "../config/env";


export interface AuthTokens {
    accessToken?: string,
    refreshToken?: string,

}

export const setAuthCookie = (res:Response, tokenInfo: AuthTokens) =>{
    if(tokenInfo.accessToken){
        res.cookie("accessToken", tokenInfo.accessToken,{
        secure: true,
        httpOnly: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60
        })
    }
    if(tokenInfo.refreshToken){
        res.cookie("refreshToken", tokenInfo.refreshToken,{
          secure: true,
          httpOnly: true,
           sameSite: "none",
           maxAge: 1000 * 60 * 60 * 24 * 90
        })
    }
}