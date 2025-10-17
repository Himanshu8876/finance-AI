import mongoose, { Document, Schema } from "mongoose";
import { compareValue, hashValue } from "../utils/bcrypt";

export interface UserDocument extends Document {
  name: string;
  email: string;
  password?: string;
  provider: "local" | "google";
  profilePicture: string | null;
  createdAt: Date;
  updatedAt: Date;
  comparePassword: (password: string) => Promise<boolean>;
  omitPassword: () => Omit<UserDocument, "password">;
}

const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
      required: true,
    },
    profilePicture: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      select: true,
      // only required for local provider
      required: function (this: any) {
        return this.provider === "local";
      },
    },
  },
  {
    timestamps: true,
  }
);

// Hash password if modified and exists
userSchema.pre("save", async function (next) {
  if (this.isModified("password") && this.password) {
    this.password = await hashValue(this.password);
  }
  next();
});

userSchema.methods.omitPassword = function (): Omit<UserDocument, "password"> {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

userSchema.methods.comparePassword = async function (password: string) {
  if (!this.password) return false; // for google users
  return compareValue(password, this.password);
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);
export default UserModel;
