import { Amenities, City, Coordinates, OfferType, User } from '../../../types';

export class UpdateOfferDto {
  public title: string;
  public description: string;
  public publishDate: Date;
  public city: City;
  public imagePreview: string;
  public photos: string[];
  public isPremium: boolean;
  public isFavorite: boolean;
  public rating: number;
  public type: OfferType;
  public roomCount: number;
  public guestCount: number;
  public rentPrice: number;
  public amenities: Amenities[];
  public author: User;
  public coordinates: Coordinates;
}
