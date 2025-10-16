import mongoose from "mongoose";
import UserModel from "../models/user.model";
import { NotFoundException, UnauthorizedException } from "../utils/app-error";
import {
  LoginSchemaType,
  RegisterSchemaType,
} from "../validators/auth.validator";
import ReportSettingModel, {
  ReportFrequencyEnum,
} from "../models/report-setting.model";
import { calulateNextReportDate } from "../utils/helper";
import { signJwtToken } from "../utils/jwt";
import { sendWelcomeEmail } from "../mailers/Welcomemail.mailer"; 

export const registerService = async (body: RegisterSchemaType) => {
  const { email, name } = body;
  const session = await mongoose.startSession();
  let newUser: any = null;

  try {
    await session.withTransaction(async () => {
      const existingUser = await UserModel.findOne({ email }).session(session);
      if (existingUser) throw new UnauthorizedException("User already exists");

      newUser = new UserModel({ ...body });
      await newUser.save({ session });

      const reportSetting = new ReportSettingModel({
        userId: newUser._id,
        frequency: ReportFrequencyEnum.MONTHLY,
        isEnabled: true,
        nextReportDate: calulateNextReportDate(),
        lastSentDate: null,
      });
      await reportSetting.save({ session });
    });

    // ✅ Send welcome email AFTER successful transaction
    if (newUser && newUser.email && newUser.name) {
      try {
        await sendWelcomeEmail({ to: newUser.email, name: newUser.name });
        console.log(`✅ Welcome email sent to ${newUser.email}`);
      } catch (emailError) {
        console.error(`⚠️ Failed to send welcome email:`, emailError);
        // Don’t throw, as registration should still succeed
      }
    }

    return { user: newUser?.omitPassword() };

  } catch (error) {
    throw error;
  } finally {
    await session.endSession();
  }
};

export const loginService = async (body: LoginSchemaType) => {
  const { email, password } = body;
  const user = await UserModel.findOne({ email });
  if (!user) throw new NotFoundException("Email/password not found");

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid)
    throw new UnauthorizedException("Invalid email/password");

  const { token, expiresAt } = signJwtToken({ userId: user.id });

  const reportSetting = await ReportSettingModel.findOne(
    {
      userId: user.id,
    },
    { _id: 1, frequency: 1, isEnabled: 1 }
  ).lean();

  return {
    user: user.omitPassword(),
    accessToken: token,
    expiresAt,
    reportSetting,
  };
};