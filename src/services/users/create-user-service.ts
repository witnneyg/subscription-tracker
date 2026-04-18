import { ClientSession } from "mongoose";
import User from "../../models/user-model";

interface CreateUserProps {
  name: string;
  email: string;
  password: string;
}

export async function CreateUserService(
  user: CreateUserProps,
  session: ClientSession,
) {
  return await User.create([user], { session });
}
