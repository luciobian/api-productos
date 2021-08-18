import { IsDefined, IsEmail } from 'class-validator';

export default class LoginRequest {
  @IsEmail()
  @IsDefined()
  email: string;
  @IsDefined()
  password: string;
}
