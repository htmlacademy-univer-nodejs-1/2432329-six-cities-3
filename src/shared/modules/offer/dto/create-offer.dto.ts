import { Amenities, City, Coordinates, OfferType, User } from '../../../types';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public city: City;
  public imagePreview: string;
  public photos: string[];
  public isFavorite: boolean;
  public type: OfferType;
  public roomCount: number;
  public guestCount: number;
  public rentPrice: number;
  public amenities: Amenities[];
  public author: User;
  public coordinates: Coordinates;
}
