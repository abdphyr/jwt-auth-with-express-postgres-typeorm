import * as Joi from "joi";
import { User } from "../../entity";
import { LoginRequestDTO } from "../dtos";
import { PasswordHash } from "../../security";

export class LoginValidator {
  private static checkRequestPropertiesWithJoi(logReqBody: LoginRequestDTO) {
    const login = Joi.object({
      email: Joi.string().email().min(5).max(100).required(),
      password: Joi.string().min(5).max(100).required()
    })
    const { error } = login.validate(logReqBody);
    if (error) {
      throw new Error(JSON.stringify({ err: error.details[0].message, status: 400 }));
    }
  }
  private static checkUserExistWithEmail(findedUser: User) {
    if (!findedUser) {
      throw new Error(JSON.stringify({ err: "User not found", status: 404 }));
    }
  }
  private static async checkUserPasswordTrue(logReqBody: LoginRequestDTO, findedUser: User) {
    const isPasswordTrue = await PasswordHash.isPasswordTrue(logReqBody.password, findedUser.password);
    if (!isPasswordTrue) {
      throw new Error(JSON.stringify({ err: "Invalid password", status: 400 }));
    }
  }
  public static async validate(logReqBody: LoginRequestDTO, findedUser: User) {
    try {
      this.checkRequestPropertiesWithJoi(logReqBody);
      this.checkUserExistWithEmail(findedUser);
      await this.checkUserPasswordTrue(logReqBody, findedUser)
    } catch (e) {
      return e.message;
    }
  }
}