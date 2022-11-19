import { UserDTO } from "./user.dto";

export class AuthResponseDTO {
  token: string;
  refreshTokenId: string;
  user: UserDTO;
}