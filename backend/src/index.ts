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
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.route";
import { passportAuthenticateJwt } from "./config/passport.config";
import transactionRoutes from "./routes/transaction.route";

const app = express();
const BASE_PATH = Env.BASE_PATH;
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use(
  cors({
    origin: Env.FRONTEND_ORIGIN,
    credentials: true,
  })
);

app.get(
  "/",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    throw new BadRequestException("This is a test error"),
    res.status(HTTPSTATUS.OK).json({
      message: "Hello Subcribe to the channel",
    });
  })
);
app.use(`${BASE_PATH}/auth`,authRoutes);
app.use(`${BASE_PATH}/user`,passportAuthenticateJwt,userRoutes);
app.use(`${BASE_PATH}/transaction`,passportAuthenticateJwt,transactionRoutes);
app.use(errorHandler)

app.listen(Env.PORT, async () => {
  
  await connctDatabase();
  if (Env.NODE_ENV === "development") {
    // await initializeCrons();
  }

  console.log(`Server is running on port ${Env.PORT} in ${Env.NODE_ENV} mode`);
});



