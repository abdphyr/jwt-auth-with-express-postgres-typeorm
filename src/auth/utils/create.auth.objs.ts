import { User } from "../../entity";
import { RegisterRequestDTO } from "../dtos";
import { PasswordHash } from "../../security";

export class CreateAuthObjs {
  public static async createUser(registerReqBody: RegisterRequestDTO) {
    const user = new User();
    user.username = registerReqBody.username;
    user.email = registerReqBody.email;
    user.password = await PasswordHash.hashPassword(registerReqBody.password);
    user.age = registerReqBody.age;
    return user;
  }
}