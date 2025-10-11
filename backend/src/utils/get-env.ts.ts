// src/utils/get-env.ts
import dotenv from "dotenv";

// Load .env file at startup
dotenv.config();

export const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if (!value) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value;
};
