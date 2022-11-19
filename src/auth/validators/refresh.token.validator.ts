import * as Joi from "joi";
import { RefreshTokenRequestDTO } from "../dtos";
import * as moment from "moment";
import { JWT } from "../../security";
import { RefreshToken } from "../../entity";
import { RefreshTokenRepository } from "../../database";

export class RefreshTokenValidator {
  public static checkRequestPropertiesWithJoi(refTokenReqBody: RefreshTokenRequestDTO) {
    const refreshToken = Joi.object({
      token: Joi.string().min(10).required(),
      refreshTokenId: Joi.string().min(36).max(36).required()
    })
    const { error } = refreshToken.validate(refTokenReqBody);
    if (error) {
      throw new Error(JSON.stringify({ err: error.details[0].message, status: 400 }));
    }
  }
  private static checkTokenValid(token: string) {
    const isTokenValid = JWT.isTokenValid(token);
    if (!isTokenValid) {
      throw new Error(JSON.stringify({ err: "Unauthorized", status: 401 }));
    }
  }
  private static checkRefreshTokenValid(refreshToken: RefreshToken) {
    if (!refreshToken) {
      throw new Error(JSON.stringify({ err: "Refresh token doesn't exist", status: 400 }));
    }
  }
  private static checkRefreshTokenLinkedToToken(token: string, refreshToken: RefreshToken) {
    const tokenJwtId = JWT.getTokenJwtId(token)
    if (tokenJwtId !== refreshToken.jwtId) {
      throw new Error(JSON.stringify({ err: "Token doesn't match refresh token", status: 400 }));
    }
  }
  private static checkRefreshTokenExpired(refreshToken: RefreshToken) {
    if (moment().isAfter(refreshToken.expiryDate)) {
      throw new Error(JSON.stringify({ err: "Refresh token has expired", status: 400 }));
    }
  }
  private static checkRefreshTokenUsedOrInvalidated(refreshToken: RefreshToken) {
    if (refreshToken.used || refreshToken.invalidated) {
      throw new Error(JSON.stringify({ err: "Refresh token has used or invalidated", status: 400 }));
    }
  }
  public static async validate(refTokenReqBody: RefreshTokenRequestDTO) {
    try {
      this.checkRequestPropertiesWithJoi(refTokenReqBody);
      this.checkTokenValid(refTokenReqBody.token);
      const refreshToken = await RefreshTokenRepository.findOneBy({ id: refTokenReqBody.refreshTokenId });
      this.checkRefreshTokenValid(refreshToken);
      this.checkRefreshTokenLinkedToToken(refTokenReqBody.token, refreshToken);
      this.checkRefreshTokenExpired(refreshToken);
      this.checkRefreshTokenUsedOrInvalidated(refreshToken);
    } catch (e) {
      return e.message;
    }
  }
}