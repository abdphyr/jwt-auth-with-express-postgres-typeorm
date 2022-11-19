import { AuthResponseDTO } from "./auth.dto";

export class RegisterRequestDTO {
  username: string;
  password: string;
  repeatPassword: string;
  email: string;
  age: number;
}

export class RegisterResponseDTO extends AuthResponseDTO { };