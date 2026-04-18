import { Request, Response } from "express";
import { DeleteUserService } from "../../services/users/delete-user-service";

export async function DeleteUser(req: Request, res: Response) {
  try {
    if (!req.params.id) {
      throw new Error("");
    }

    const user = await DeleteUserService(req.params.id as string);

    res.status(200).send({ message: "success", body: user });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
}
