import { User } from "../../entity";
import { AuthResponseDTO, UserDTO } from "../dtos";

export class CreateAuthDTOs {
  public static userEntityToDTO(user: User) {
    const userDTO = new UserDTO()
    userDTO.id = user.id;
    userDTO.username = user.username;
    userDTO.email = user.email;
    userDTO.age = user.age;
    return userDTO;
  }
  public static authResponseDTO(
    userDTO: UserDTO,
    token: string,
    refreshTokenId: string
  ) {
    const authResponseDTO = new AuthResponseDTO();
    authResponseDTO.user = userDTO;
    authResponseDTO.token = token;
    authResponseDTO.refreshTokenId = refreshTokenId;
    return authResponseDTO;
  }
}