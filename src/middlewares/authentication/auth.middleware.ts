import { RequestHandler } from "express";
import { JWT } from "../../security";

export const authmiddleware: RequestHandler = (req, res, next) => {
  try {
    const token = req.headers.authorization.slice(7);
    if (!token) {
      throw new Error("Unauthorized !");
    }
    const isTokenValid = JWT.isTokenValid(token);
    if (!isTokenValid) {
      throw new Error("Unauthorized !");
    }
    next();
  } catch (e) {
    res.status(401).send(e.message)
  }
}