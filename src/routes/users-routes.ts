import { Router } from "express";
import { GetUsers } from "../controllers/users/get-users";
import { DeleteUser } from "../controllers/users/delete-user";
import { UpdateUser } from "../controllers/users/update-user";
import { GetUser } from "../controllers/users/get-user";
import { authMiddleware } from "../middlewares/auth-middleware";

const userRouter = Router();

userRouter.get("/", GetUsers);

userRouter.get("/:id", authMiddleware, GetUser);

// userRouter.post("/", CreateUser);

userRouter.delete("/:id", DeleteUser);

userRouter.put("/:id", UpdateUser);

export default userRouter;
