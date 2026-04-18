import User from "../../models/user-model";

export function DeleteUserService(userId: string) {
  return User.findByIdAndDelete(userId);
}
