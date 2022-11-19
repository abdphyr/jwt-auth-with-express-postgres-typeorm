import { Router } from "express";
import { AuthController } from "./auth.controller";

export class AuthRouter {
  private static readonly _routes = Router()
  public static get routes() {
    this._routes
      .post("/register", AuthController.register)
      .post("/login", AuthController.login)
      .post("/refreshToken", AuthController.refreshToken);
    return this._routes;
  }
}