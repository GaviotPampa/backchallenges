import { createHash, isValidPassword } from "../utils.js";
import { UserModel } from "./models/user.model.js";

export default class UserDao {
  async registerUser(user) {
    try {
      const { email, password } = user;
      const existUser = await UserModel.findOne({ email });
      //findOne return null si no encuentra nada y si viene como null crea el usuario
      console.log("existUser::", existUser);
      if (!existUser) {
        if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
          const newUser = await UserModel.create({
            ...user,
            password: createHash(password),
            role: "admin",
          });
          return newUser;
        }
        const newUser = await UserModel.create(user);
        return newUser;
      } else return false;
    } catch (error) {
      console.log(error);
    }
  }

  async loginUser(user) {
    try {
      const { email, password } = user;
      const userExist = await UserModel.findOne({ email,password });
      if (userExist) {
        const passValid = isValidPassword(userExist, password);
        if (passValid) return userExist;
        else return false;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
