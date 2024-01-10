import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  name?: string;
  username?: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },

  username: {
    type: String,
    required: true,
    unique: true,
  },

  password: { type: String, required: true },
});

export const User = mongoose.model<IUser>("User", userSchema);
