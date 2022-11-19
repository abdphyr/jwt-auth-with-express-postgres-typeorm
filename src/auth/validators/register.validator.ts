import * as Joi from "joi";
import { AuthService } from "../auth.service";
import { RegisterRequestDTO } from "../dtos";

export class RegisterValidator {
  private static checkRequestPropertiesWithJoi(regReqBody: RegisterRequestDTO) {
    const register = Joi.object({
      username: Joi.string().min(1).max(100).required(),
      password: Joi.string().min(5).max(100).required(),
      repeatPassword: Joi.string().min(5).max(100).required(),
      email: Joi.string().email().min(5).max(100).required(),
      age: Joi.number().positive().required()
    })
    const { error } = register.validate(regReqBody);
    if (error) {
      throw new Error(JSON.stringify({ err: error.details[0].message, status: 400 }));
    }
  }
  private static checkPasswordAndRepeatPasswordEqual(regReqBody: RegisterRequestDTO) {
    if (regReqBody.password !== regReqBody.repeatPassword) {
      throw new Error(JSON.stringify({ err: "Repeat password does not match the password", status: 400 }));
    }
  }
  private static async checkUserEmailUnique(email: string) {
    const findedUser = await AuthService.findUserByEmail(email);
    if (findedUser) {
      throw new Error(JSON.stringify({ err: "Email is already being used", status: 400 }));
    }
  }
  public static async validate(regReqBody: RegisterRequestDTO) {
    try {
      this.checkRequestPropertiesWithJoi(regReqBody);
      this.checkPasswordAndRepeatPasswordEqual(regReqBody);
      await this.checkUserEmailUnique(regReqBody.email);
    } catch (e) {
      return e.message;
    }
  }
}