import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import UserModel from "../models/user.model";
import { signJwtToken } from "../utils/jwt";
import { Env } from "../config/env.config";

const client = new OAuth2Client(Env.GOOGLE_CLIENT_ID);

export const googleAuthController = async (req: Request, res: Response) => {
  try {
    const { id_token } = req.body;

    if (!id_token) {
      return res.status(400).json({ message: "ID token missing" });
    }

    // This method verifies the signature, checks the audience, and crucially, 
    // checks the 'exp' (expiration) claim of the ID token.
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: Env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(400).json({ message: "Invalid Google token" });
    }

    const { email, name, picture } = payload;

    // ✅ Check if user already exists
    let user = await UserModel.findOne({ email });

    // ✅ Create new user if not exists
    if (!user) {
      user = new UserModel({
        name,
        email,
        password: "", // Not needed for Google-auth users
        profilePicture: picture,
      });
      await user.save();
    }

    // ✅ Create JWT for your app
    const { token, expiresAt } = signJwtToken({ userId: user.id });

    return res.status(200).json({
      message: "Google login successful",
      token,
      expiresAt,
      user: user.omitPassword(),
    });
  } catch (error) {
    console.error("Google auth error:", error);
    // The error 'Invalid token signature' is being thrown right here, 
    // indicating the token is either expired or tampered with.
    return res.status(500).json({ message: "Google login failed" });
  }
};
