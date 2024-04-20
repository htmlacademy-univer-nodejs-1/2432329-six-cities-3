import { Expose } from 'class-transformer';
import { City, Location, OfferType, User } from '../../../types';

export class OfferRdo {
  @Expose()
  public id: string;

  @Expose()
  public price: number;

  @Expose()
  public rating: number;

  @Expose()
  public title: string;

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public city: City;

  @Expose()
  public location: Location;

  @Expose()
  public previewImage: string;

  @Expose()
  public type: OfferType;

  @Expose()
  public bedrooms: number;

  @Expose()
  public description: string;

  @Expose()
  public goods: string[];

  @Expose()
  public host: User;

  @Expose()
  public images: string[];

  @Expose()
  public maxAdults: number;
}
