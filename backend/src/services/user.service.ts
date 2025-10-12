import UserModel from "../models/user.model";
import { NotFoundException } from "../utils/app-error";

export const findByIdUserService = async (userId: string) => {
  const user = await UserModel.findById(userId);
  return user?.omitPassword();
};