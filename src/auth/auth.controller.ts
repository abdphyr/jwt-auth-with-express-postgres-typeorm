import type {
	RegisterControllerType,
	LoginControllerType,
	RefreshTokenControllerType
} from "./types";
import {
	LoginValidator,
	RefreshTokenValidator,
	RegisterValidator
} from "./validators";
import { AuthService } from "./auth.service";

export class AuthController {

	public static register: RegisterControllerType = async (req, res) => {
		const error = await RegisterValidator.validate(req.body)
		if (error) {
			const { err, status } = JSON.parse(error) as { err: string, status: number };
			return res.status(status).send({ message: err });
		}
		const registerResponseDTO = await AuthService.registerUser(req.body);
		res.status(201).send(registerResponseDTO)
	}

	public static login: LoginControllerType = async (req, res) => {
		const findedUser = await AuthService.findUserByEmail(req.body.email);
		const error = await LoginValidator.validate(req.body, findedUser);
		if (error) {
			const { err, status } = JSON.parse(error) as { err: string, status: number };
			return res.status(status).send({ message: err });
		}
		const loginResponseDTO = await AuthService.loginUser(findedUser);
		res.status(200).send(loginResponseDTO);
	}

	public static refreshToken: RefreshTokenControllerType = async (req, res) => {
		const error = await RefreshTokenValidator.validate(req.body);
		if (error) {
			const { err, status } = JSON.parse(error) as { err: string, status: number };
			return res.status(status).send({ message: err });
		}
		const refreshTokenResponseDTO = await AuthService.refreshTokenOfUser(req.body);
		res.status(200).send(refreshTokenResponseDTO)
	}
}