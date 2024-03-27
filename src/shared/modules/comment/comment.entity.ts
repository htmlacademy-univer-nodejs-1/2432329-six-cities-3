import { defaultClasses, getModelForClass, prop } from '@typegoose/typegoose';
import { Comment, User } from '../../types';

export interface CommentEntity extends defaultClasses.Base {}

export class CommentEntity
  extends defaultClasses.TimeStamps
  implements Comment {
  @prop({ required: true, minlength: 5, maxlength: 1024 })
  public text: string;

  @prop({ required: true })
  public publishDate: Date;

  @prop({ required: true, min: 1, max: 5 })
  public rating: number;

  @prop({ required: true })
  public author: User;
}

export const CommentModel = getModelForClass(CommentEntity);
