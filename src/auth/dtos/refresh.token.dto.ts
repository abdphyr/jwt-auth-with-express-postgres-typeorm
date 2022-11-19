import { AuthResponseDTO } from "./auth.dto";

export class RefreshTokenRequestDTO {
  token: string;
  refreshTokenId: string;
}

export class RefreshTokenResponseDTO extends AuthResponseDTO { };