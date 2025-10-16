import { getEnv } from "../utils/get-env.ts";

const envConfig = () => ({
  NODE_ENV: getEnv("NODE_ENV", "development"),

  PORT: getEnv("PORT", "8000"),
  BASE_PATH: getEnv("BASE_PATH", "/api"),
  MONGO_URI: getEnv("MONGO_URI","mongodb+srv://garghimanshu778_db_user:vh9Icv6ZFccNV9r0@cluster0.bmriwtt.mongodb.net/finance_api_db?retryWrites=true&w=majority"),

  JWT_SECRET: getEnv("JWT_SECRET", "secert_jwt"),
  JWT_EXPIRES_IN: getEnv("JWT_EXPIRES_IN", "15m") as string,

  JWT_REFRESH_SECRET: getEnv("JWT_REFRESH_SECRET", "secert_jwt_refresh"),
  JWT_REFRESH_EXPIRES_IN: getEnv("JWT_REFRESH_EXPIRES_IN", "7d") as string,

  GEMINI_API_KEY: getEnv("GEMINI_API_KEY","AIzaSyCklYHkhuQyq0zKJ_7WGgpeYm3T3Mq6ujI"),

  CLOUDINARY_CLOUD_NAME: getEnv("CLOUDINARY_CLOUD_NAME","due03hup4"),
  CLOUDINARY_API_KEY: getEnv("CLOUDINARY_API_KEY","519811184352117"),
  CLOUDINARY_API_SECRET: getEnv("CLOUDINARY_API_SECRET","oSTr_iy1pb9Lkh8Ou1EOEs4Jn7c"),

  RESEND_API_KEY: getEnv("RESEND_API_KEY","re_PUVxe5Uc_3Ssaf5Vze8jKzCjqoDSRseg8"),
  RESEND_MAILER_SENDER: getEnv("RESEND_MAILER_SENDER", "onboarding@resend.dev"),

  FRONTEND_ORIGIN: getEnv("FRONTEND_ORIGIN", "localhost"),
  GOOGLE_CLIENT_ID: getEnv("GOOGLE_CLIENT_ID","56213459650-a01f8ako1fvaa4n7tb106kp5vvo0smk0.apps.googleusercontent.com"),
  GOOGLE_CLIENT_SECRET: getEnv("GOOGLE_CLIENT_SECRET","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"),
});

export const Env = envConfig();