import {
  Ref,
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
} from '@typegoose/typegoose';
import { UserEntity } from '../user/index.js';
import { OfferEntity } from '../offer/index.js';

export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments',
  },
})
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({ required: true, minlength: 5, maxlength: 1024, type: () => String })
  public comment: string;

  @prop({ required: true, type: () => Date })
  public date: Date;

  @prop({ required: true, min: 1, max: 5, type: () => Number })
  public rating: number;

  @prop({ required: true, ref: OfferEntity })
  public offerId: Ref<OfferEntity>;

  @prop({ required: true, ref: () => UserEntity })
  public user: Ref<UserEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
