import { IsDefined, IsEmail, Length, Matches } from 'class-validator';
import EnumErrorMessage from '../../../enums/error-messages.enum';
import Constant from '../../../helpers/constant.helper';

export default class RegisterRequest {
  @IsDefined()
  @IsEmail()
  email: string;
  @IsDefined()
  @Length(Constant.MIN_PASSWORD, Constant.MAX_PASSWORD, { message: EnumErrorMessage.PASSWORD_LENGTH })
  @Matches(Constant.PASSWORD_REGEX, { message: EnumErrorMessage.PASSWORD_WEAK })
  password: string;
}
