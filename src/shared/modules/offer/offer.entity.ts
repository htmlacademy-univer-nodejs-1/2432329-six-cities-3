import {
  Ref,
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
} from '@typegoose/typegoose';
import { Amenities, City, Location, OfferType } from '../../types';
import { UserEntity } from '../user';

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
  },
})
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ required: true, minlength: 10, maxlength: 100, type: () => String })
  public title: string;

  @prop({ required: true, minlength: 20, maxlength: 1024, type: () => String })
  public description: string;

  @prop({ required: true, type: () => Date })
  public publishDate: Date;

  @prop({ required: true, type: () => String })
  public city: City;

  @prop({ required: true, type: () => String })
  public previewImage: string;

  @prop({ required: true, type: () => Array })
  public images: string[];

  @prop({ required: true, type: () => Boolean })
  public isPremium: boolean;

  @prop({ required: true, type: () => Boolean })
  public isFavorite: boolean;

  @prop({ required: true, min: 1, max: 5, type: () => Number })
  public rating: number;

  @prop({ required: true, type: () => String })
  public type: OfferType;

  @prop({ required: true, min: 1, max: 8, type: () => Number })
  public bedrooms: number;

  @prop({ required: true, min: 1, max: 10, type: () => Number })
  public maxAdults: number;

  @prop({ required: true, min: 100, max: 100_000, type: () => Number })
  public price: number;

  @prop({ required: true, type: () => Array })
  public goods: Amenities[];

  @prop({ required: true, ref: UserEntity })
  public host: Ref<UserEntity>;

  public commentsCount: number;

  @prop({ required: true, type: () => Object })
  public location: Location;
}

export const OfferModel = getModelForClass(OfferEntity);
