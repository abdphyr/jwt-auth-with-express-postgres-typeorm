import { Router } from "express";
import { AuthRouter } from "./auth";
import { BookRouter } from "./book";
import { authmiddleware } from "./middlewares";

export const publicRoutes = Router()
  .use("/auth", AuthRouter.routes)

export const protectedRoutes = Router()
  .use(authmiddleware)
  .use("/book", BookRouter.routes)

