import { Request, Response } from "express";
import { GetUsersService } from "../../services/users/get-users-service";

export async function GetUsers(req: Request, res: Response) {
  try {
    const users = await GetUsersService();

    res.status(200).send({ message: "success", body: users });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
}
