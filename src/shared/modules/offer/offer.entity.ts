import { defaultClasses, prop } from '@typegoose/typegoose';
import {
  Amenities,
  City,
  Coordinates,
  Offer,
  OfferType,
  User,
} from '../../types';

export interface OfferEntity extends defaultClasses.Base {}

export class OfferEntity extends defaultClasses.TimeStamps implements Offer {
  @prop({ required: true, minlength: 10, maxlength: 100 })
  public title: string;

  @prop({ required: true, minlength: 20, maxlength: 1024 })
  public description: string;

  @prop({ required: true })
  public publishDate: Date;

  @prop({ required: true })
  public city: City;

  @prop({ required: true })
  public imagePreview: string;

  @prop({ required: true })
  public photos: string[];

  @prop({ required: true })
  public isPremium: boolean;

  @prop({ required: true })
  public isFavorite: boolean;

  @prop({ required: true, min: 1, max: 5 })
  public rating: number;

  @prop({ required: true })
  public type: OfferType;

  @prop({ required: true, min: 1, max: 8 })
  public roomCount: number;

  @prop({ required: true, min: 1, max: 10 })
  public guestCount: number;

  @prop({ required: true, min: 100, max: 100_000 })
  public rentPrice: number;

  @prop({ required: true })
  public amenities: Amenities[];

  @prop({ required: true })
  public author: User;

  public commentsCount: number;

  @prop({ required: true })
  public coordinates: Coordinates;
}
