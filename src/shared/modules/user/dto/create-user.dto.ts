import { UserType } from '../../../types';

export class CreateUserDto {
  public name: string;
  public email: string;
  public type: UserType;
}
