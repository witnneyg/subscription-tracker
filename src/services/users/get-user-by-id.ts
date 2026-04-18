import User from "../../models/user-model";

export async function GetUserByIdService(id: string) {
  return await User.findOne({ _id: id });
}
