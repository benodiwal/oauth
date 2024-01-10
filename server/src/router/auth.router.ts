import express from "express";
import { oAuthLogin } from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.post("/google/callback", oAuthLogin);

export default authRouter;
