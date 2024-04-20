import { City, Location, OfferType } from '../../../types';

export class CreateOfferDto {
  title: string;
  description: string;
  city: City;
  previewImage: string;
  isPremium: boolean;
  isFavorite: boolean;
  type: OfferType;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: string[];
  location: Location;
  images: string[];
}
