import { Router } from "express";
import { BookController } from "./book.controller";

export class BookRouter {
  private static _router = Router();
  public static get routes() {
    this._router.get("/", BookController.getAllBooks)
    return this._router;
  }
}