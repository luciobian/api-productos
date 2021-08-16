import * as crypto from 'crypto';
export default class HelperToken {
  public static generateToken(): string {
    return crypto.randomBytes(32).toString('base64');
  }
}
