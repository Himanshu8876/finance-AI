import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middlerware";
import {
  findByIdUserService,
} from "../services/user.service";
import { HTTPSTATUS } from "../config/http.config";
//import { updateUserSchema } from "../validators/user.validator";


export const getCurrentUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req.user as { _id: string })._id;

    const user = await findByIdUserService(userId);
    return res.status(HTTPSTATUS.OK).json({
      message: "User fetched successfully",
      user,
    });
  }
);