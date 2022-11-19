import { RequestHandler } from "express";
import {
  RegisterRequestDTO,
  RegisterResponseDTO,
  LoginRequestDTO,
  LoginResponseDTO,
  RefreshTokenRequestDTO,
  RefreshTokenResponseDTO
} from "../dtos";

export type RegisterControllerType = RequestHandler<
  {},
  RegisterResponseDTO | { message: string },
  RegisterRequestDTO
>

export type LoginControllerType = RequestHandler<
  {},
  LoginResponseDTO | { message: string },
  LoginRequestDTO
>

export type RefreshTokenControllerType = RequestHandler<
  {},
  RefreshTokenResponseDTO | { message: string },
  RefreshTokenRequestDTO
>