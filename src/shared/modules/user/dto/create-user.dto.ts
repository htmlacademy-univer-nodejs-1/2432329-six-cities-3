import { IsEmail, IsEnum, MaxLength, MinLength } from 'class-validator';
import { UserType } from '../../../types';
import { CreateUserValidationMessage } from './create-user.messages';

export class CreateUserDto {
  @MinLength(1, { message: CreateUserValidationMessage.name.minLength })
  @MaxLength(15, { message: CreateUserValidationMessage.name.maxLength })
  public name: string;

  @IsEmail({}, { message: CreateUserValidationMessage.email.invalidFormat })
  public email: string;

  @IsEnum(UserType, { message: CreateUserValidationMessage.type.invalidFormat })
  public type: UserType;
}
