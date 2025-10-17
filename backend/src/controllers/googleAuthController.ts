import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import UserModel from "../models/user.model";
import { signJwtToken } from "../utils/jwt";
import { Env } from "../config/env.config";
import { sendWelcomeEmail } from "../mailers/Welcomemail.mailer";

const client = new OAuth2Client(Env.GOOGLE_CLIENT_ID);

export const googleAuthController = async (req: Request, res: Response) => {
  try {
    const { id_token } = req.body;

    if (!id_token) {
      return res.status(400).json({ message: "Google ID token is required" });
    }

    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: Env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(400).json({ message: "Invalid Google token" });
    }

    const { email, name, picture } = payload;

    let user = await UserModel.findOne({ email });
    let isNewUser = false;

    // If user doesn’t exist → create and send welcome email
    if (!user) {
      isNewUser = true;
      user = new UserModel({
        name,
        email,
        provider: "google",
        profilePicture: picture || null,
      });
      await user.save();

      try {
        await sendWelcomeEmail({ to: user.email, name: user.name });
      } catch (emailError) {
        console.error("Failed to send welcome email:", emailError);
        // Don’t block signup if email fails
      }
    }

    // ✅ Create JWT for your app
    const { token, expiresAt } = signJwtToken({ userId: user.id });

    return res.status(200).json({
      message: isNewUser
        ? "Google signup successful"
        : "Google login successful",
      token,
      expiresAt,
      user: user.omitPassword(),
    });
  } catch (error) {
    console.error("Google auth error:", error);
    return res.status(500).json({ message: "Google authentication failed" });
  }
};
