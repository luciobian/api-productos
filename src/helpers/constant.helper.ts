export default class Constant {
  static PER_PAGE = 10;
  static DESC: 'DESC';
  static PASSWORD_REGEX: RegExp = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[a-z]).*$/;
  static MIN_PASSWORD = 8;
  static MAX_PASSWORD = 20;
  static ROLE_ADMIN: number = 1;
  static TOKEN_REGEX: RegExp = /^Bearer/;
}
