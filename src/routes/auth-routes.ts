import { Router } from "express";
import { SignUp } from "../controllers/auth/sign-up";
import { SignIn } from "../controllers/auth/sign-in";
import { SignOut } from "../controllers/auth/sign-out";

const authRouter = Router();

authRouter.post("/sign-up", SignUp);
authRouter.post("/sign-in", SignIn);
authRouter.post("/sign-out", SignOut);

export default authRouter;
