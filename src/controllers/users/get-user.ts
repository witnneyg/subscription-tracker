import { Request, Response } from "express";
import { GetUsersService } from "../../services/users/get-users-service";
import { GetUserService } from "../../services/users/get-user-service";
import { GetUserByIdService } from "../../services/users/get-user-by-id";

export async function GetUser(req: Request, res: Response) {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(404).send("params is required");
    }

    const users = await GetUserByIdService(userId as string);

    res.status(200).send({ message: "success", data: users });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
}
