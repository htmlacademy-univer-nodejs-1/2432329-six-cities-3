import { Expose } from 'class-transformer';
import { UserType } from '../../../types';

export class UserRdo {
  @Expose()
  public name: string;

  @Expose()
  public email: string;

  @Expose()
  public avatar: string;

  @Expose()
  public type: UserType;
}
