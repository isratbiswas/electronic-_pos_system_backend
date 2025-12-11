import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser"
import cors from "cors"
import { globalErrorHandler } from "./app/middlewares/globalErrorHandle";
import notFound from "./app/middlewares/notFound";
import { router } from "./app/routes";
import { envVars } from "./app/config/env";
const app : Application =express();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
   origin:envVars.FRONTEND_URL,
   credentials: true,
}))
app.use('/api/v1', router);
app.get("/", (req:Request, res: Response) =>{
    res.status(200).json({
        message: "Welcome to POS System Backend"
    })
})

app.use(globalErrorHandler)
app.use(notFound)
export default app