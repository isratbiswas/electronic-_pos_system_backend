import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandle";
import notFound from "./app/middlewares/notFound";
import { router } from "./app/routes";
import { envVars } from "./app/config/env";
const app: Application = express();

app.use(express.json());
app.use(cookieParser());
// app.use(
//   cors({
//     origin: envVars.FRONTEND_URL || "http://localhost:3000",
//     credentials: true,
//   })
// );

const allowedOrigins = [
  "http://localhost:3000",
  "https://pos-system-seven-pi.vercel.app",
  "https://www.pos-system-seven-pi.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // VERY IMPORTANT if using cookies/JWT
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // allow all HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // allow headers used in requests
  })
);
app.use("/api/v1", router);
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to POS System Backend",
  });
});

app.use(globalErrorHandler);
app.use(notFound);
export default app;
