import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import passport from "passport";
import "dotenv/config";
import { Env } from "./config/env.config";
import { HTTPSTATUS } from "./config/http.config";
import { error } from "console";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { BadRequestException } from "./utils/app-error";
import { asyncHandler } from "./middlewares/asyncHandler.middlerware";
import connctDatabase from "./config/database.config";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import { passportAuthenticateJwt } from "./config/passport.config";
import transactionRoutes from "./routes/transaction.route";
import { initializeCrons } from "./cron";
import reportRoutes from "./routes/report.route";
import analyticsRoutes from "./routes/analytics.route";
const app = express();
const BASE_PATH = Env.BASE_PATH;
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,              
  })
);
app.get(
  "/",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    throw new BadRequestException("This is a test error"),
    res.status(HTTPSTATUS.OK).json({
      message: "Website created by Himanshu garg",
    });
  })
);
app.use(`${BASE_PATH}/auth`,authRoutes);
app.use(`${BASE_PATH}/user`,passportAuthenticateJwt,userRoutes);
app.use(`${BASE_PATH}/transaction`,passportAuthenticateJwt,transactionRoutes);
app.use(`${BASE_PATH}/report`,passportAuthenticateJwt,reportRoutes);
app.use(`${BASE_PATH}/analytics`,passportAuthenticateJwt,analyticsRoutes);
app.use(errorHandler)

app.listen(Env.PORT, async () => {
  
  await connctDatabase();
  if (Env.NODE_ENV === "development") {
    await initializeCrons();
  }

  console.log(`Server is running on port ${Env.PORT} in ${Env.NODE_ENV} mode`);
});



