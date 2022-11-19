import { AuthResponseDTO } from "./auth.dto";

export class LoginRequestDTO {
  email: string;
  password: string;
}

export class LoginResponseDTO extends AuthResponseDTO { };