import * as jwt from "jsonwebtoken";
import { RefreshToken, User } from "../entity";
import { v4 } from "uuid";
import * as moment from "moment";
import { RefreshTokenRepository } from "../database";

export class JWT {
  private static JWT_SECRET = "123456";
  private static async generateRefreshTokenForUserAndToken(user: User, jwtId: string) {
    const refreshToken = new RefreshToken();
    refreshToken.user = user;
    refreshToken.jwtId = jwtId;
    refreshToken.expiryDate = moment().add(10, "d").toDate();
    await RefreshTokenRepository.save(refreshToken);
    return refreshToken.id;
  }
  public static async generateTokenAndRefreshToken(user: User) {
    const payload = {
      id: user.id,
      email: user.email
    }
    /**
     * This `jwtId` for generate token and when token decoded, `it` called `jti`.
     * Also this is `property for refreshToken`
     */
    const jwtId = v4();
    const token = jwt.sign(payload, this.JWT_SECRET, {
      expiresIn: "1h", //  specify when does the token expires 1hour
      jwtid: jwtId, // specify jwtid (an id of that token ) (needed for the refresh token , as refresh token// only points to one single unique token  )
      subject: user.id.toString()  // the subject should be users id (primary key)
    })
    const refreshTokenId = await this.generateRefreshTokenForUserAndToken(user, jwtId)
    return {
      token,
      refreshTokenId
    }
  }
  public static isTokenValid(token: string) {
    try {
      jwt.verify(token, this.JWT_SECRET, { ignoreExpiration: false });
      return true;
    } catch (e) {
      return false;
    }
  }
  public static getTokenJwtId(token: string) {
    const decodedToken = jwt.decode(token) as IDecodedToken;
    return decodedToken.jti
  }
  public static getUserIdFromDecodedToken(token: string) {
    const decodedToken = jwt.decode(token) as IDecodedToken;
    return decodedToken.id
  }
}
interface IDecodedToken {
  id: number,
  email: string,
  iat: number,
  exp: number,
  sub: string,
  jti: string
}