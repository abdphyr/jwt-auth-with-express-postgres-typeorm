import { RequestHandler } from "express";

export class BookController {
  public static getAllBooks: RequestHandler = (req, res) => {
    res.send("get all books from database");
  }
}