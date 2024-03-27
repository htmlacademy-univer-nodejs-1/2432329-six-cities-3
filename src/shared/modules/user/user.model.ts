import { Document, Schema, model } from 'mongoose';
import { User } from '../../types';

export interface UserDocument extends User, Document {}

const userSchema = new Schema({
  email: String,
  avatarPath: String,
  firstname: String,
  lastname: String,
});

export const UserModel = model<UserDocument>('User', userSchema);
