import * as bcrypt from 'bcrypt';

export class BcryptAdapter {
  private salt: number;
  constructor(salt = 12) {
    this.salt = salt;
  }

  async encrypt(plainText: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(plainText, this.salt);
    return hashedPassword;
  }

  async checkPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }
}
