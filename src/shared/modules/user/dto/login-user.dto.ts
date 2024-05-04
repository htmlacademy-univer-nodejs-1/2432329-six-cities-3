import { IsEmail, MaxLength, MinLength } from 'class-validator';
import { LoginUserValidationMessage } from './login-user.messages';

export class LoginUserDto {
  @IsEmail({}, { message: LoginUserValidationMessage.email.invalidFormat })
  public email: string;

  @MinLength(6, { message: LoginUserValidationMessage.password.minLength })
  @MaxLength(12, { message: LoginUserValidationMessage.password.maxLength })
  public password: string;
}
