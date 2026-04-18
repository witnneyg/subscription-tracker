import User from "../../models/user-model";

export async function GetUsersService() {
  return await User.find();
}
