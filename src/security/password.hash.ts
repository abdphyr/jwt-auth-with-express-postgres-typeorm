import * as bcrypt from "bcrypt";

export class PasswordHash {
  /**
   * @param plainPassword plain password
   * @returns hashed password
   */
  public static async hashPassword(plainPassword: string) {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(plainPassword, salt)
    return hashedPassword
  }
  public static async isPasswordTrue(plainPassword: string, hashedPassword: string) {
    return bcrypt.compare(plainPassword, hashedPassword)
  }
}