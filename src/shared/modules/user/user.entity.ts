import { defaultClasses, getModelForClass, prop } from '@typegoose/typegoose';
import { User, UserType } from '../../types';

export interface UserEntity extends defaultClasses.Base {}

export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({ required: true, minlength: 1, maxlength: 15 })
  public name: string;

  @prop({ unique: true, required: true })
  public email: string;

  @prop({ required: false })
  public avatarUrl?: string;

  @prop({ required: true, minlength: 6, maxlength: 12 })
  public password: string;

  @prop({ required: true })
  public userType: UserType;
}

export const UserModel = getModelForClass(UserEntity);
