import User from "../../models/user-model";

export async function GetUserService(email: string) {
  return await User.findOne({ email });
}
