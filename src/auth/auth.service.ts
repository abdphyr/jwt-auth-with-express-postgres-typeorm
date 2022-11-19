import { UserRepository, RefreshTokenRepository } from "../database";
import { User } from "../entity";
import { RefreshTokenRequestDTO, RegisterRequestDTO } from "./dtos";
import { JWT } from "../security";
import { CreateAuthDTOs, CreateAuthObjs } from "./utils";

export class AuthService {
  public static async registerUser(registerReqBody: RegisterRequestDTO) {
    const newUser = await CreateAuthObjs.createUser(registerReqBody);
    const savedUser = await UserRepository.save(newUser);
    const userDTO = CreateAuthDTOs.userEntityToDTO(newUser);
    const { token, refreshTokenId } = await JWT.generateTokenAndRefreshToken(newUser);
    const registerResponseDTO = CreateAuthDTOs.authResponseDTO(userDTO, token, refreshTokenId);
    return registerResponseDTO;
  }
  public static async loginUser(findedUser: User) {
    const userDTO = CreateAuthDTOs.userEntityToDTO(findedUser);
    const { token, refreshTokenId } = await JWT.generateTokenAndRefreshToken(findedUser);
    const loginResponseDTO = CreateAuthDTOs.authResponseDTO(userDTO, token, refreshTokenId);
    return loginResponseDTO;
  }
  public static async refreshTokenOfUser(refTokenReqBody: RefreshTokenRequestDTO) {
    await RefreshTokenRepository.update({ id: refTokenReqBody.refreshTokenId }, { used: true });
    const userId = JWT.getUserIdFromDecodedToken(refTokenReqBody.token);
    const user = await UserRepository.findOneBy({ id: userId });
    const userDTO = CreateAuthDTOs.userEntityToDTO(user);
    const { token, refreshTokenId } = await JWT.generateTokenAndRefreshToken(user);
    const refreshTokenResponseDTO = CreateAuthDTOs.authResponseDTO(userDTO, token, refreshTokenId);
    return refreshTokenResponseDTO;
  }
  public static async findUserByEmail(email: string) {
    return UserRepository.findOneBy({ email })
  }
}