import User from "../../models/user-model";

export async function GetUserWithPasswordService(email: string) {
  return await User.findOne({ email }).select("+password");
}
