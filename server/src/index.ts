import express from "express";
import cors from "cors";
import connectDB from "./util/mongoose";
import authRouter from "./router/auth.router";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);

connectDB();

app.listen(5000, () => console.log("Server running on port 5000"));
