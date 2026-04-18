import { Router } from "express";
import { GetUsers } from "../controllers/users/get-users";
import { DeleteUser } from "../controllers/users/delete-user";
import { UpdateUser } from "../controllers/users/update-user";

const userRouter = Router();

userRouter.get("/", GetUsers);

// userRouter.get("/:id", GetUser);

// userRouter.post("/", CreateUser);

userRouter.delete("/:id", DeleteUser);

userRouter.put("/:id", UpdateUser);

export default userRouter;
