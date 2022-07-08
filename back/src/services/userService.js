import { User } from "../db/index.js";

export default class UserService {
  static async userInfo(userId) {
    const user = await User.userInfo(userId);
    return user;
  }
}

export { UserService };
