import {
  Ref,
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
} from '@typegoose/typegoose';
import { UserEntity } from '../user';

export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments',
  },
})
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({ required: true, minlength: 5, maxlength: 1024 })
  public text: string;

  @prop({ required: true })
  public publishDate: Date;

  @prop({ required: true, min: 1, max: 5 })
  public rating: number;

  @prop({ required: true })
  public author: Ref<UserEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);