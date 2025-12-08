import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
    PORT: string
    DB_URL:string
    NODE_ENV:string
    FRONTEND_URL:string,
    BCRYPT_SALT_ROUND: string
    JWT_ACCESS_SECRET: string
    JWT_ACCESS_EXPIRES: string
    JWT_REFRESH_SECRET: string
    JWT_REFRESH_EXPIRES: string
     SUPER_ADMIN_EMAIL: string
    SUPER_ADMIN_PASSWORD: string
    REDIS_HOST: string;
    REDIS_PORT: string;
    REDIS_USERNAME: string;
    REDIS_PASSWORD: string;
     CLOUDINARY: {
        CLOUDINARY_CLOUD_NAME: string;
        CLOUDINARY_API_KEY: string;
        CLOUDINARY_API_SECRET: string;
    };

}

const loadEnvVariables = () : EnvConfig =>{
    const requiredEnvVariables: string[] = ["port", "DB_URL", "NODE_ENV", "BCRYPT_SALT_ROUND", "JWT_ACCESS_EXPIRES", "JWT_ACCESS_SECRET", "SUPER_ADMIN_EMAIL", "SUPER_ADMIN_PASSWORD", "JWT_REFRESH_SECRET", "JWT_REFRESH_EXPIRES", 
        "REDIS_HOST",
        "REDIS_PORT",
        "REDIS_USERNAME",
        "REDIS_PASSWORD",
    "CLOUDINARY_CLOUD_NAME",
        "CLOUDINARY_API_KEY",
        "CLOUDINARY_API_SECRET",
    "FRONTEND_URL"]
    requiredEnvVariables.forEach(key => {
        if(!process.env[key]){
            throw new Error (`Missing require environment variable ${key}`)
        }
    })
    return {
        PORT: process.env.PORT as string,
        DB_URL: process.env.DB_URL!,
         JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
        JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES as string,
        NODE_ENV: process.env.NODE_ENV!, BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
        FRONTEND_URL:process.env.FRONTEND_URL as string,
        JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES as string,
        SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
        SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string,
         REDIS_HOST: process.env.REDIS_HOST as string,
        REDIS_PORT: process.env.REDIS_PORT as string,
        REDIS_USERNAME: process.env.REDIS_USERNAME as string,
        REDIS_PASSWORD: process.env.REDIS_PASSWORD as string,
           CLOUDINARY: {
            CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME as string,
            CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY as string,
            CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET as string,
        },

    }
}

export const envVars = loadEnvVariables()