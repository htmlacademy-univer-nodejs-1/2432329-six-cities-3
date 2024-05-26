import { Amenities } from './amenities.enum.js';
import { City } from './city.js';
import { Location } from './location.type.js';
import { OfferType } from './offer-type.enum.js';
import { User } from './user.type.js';

export type Offer = {
  id: string;
  price: number;
  rating: number;
  title: string;
  isPremium: boolean;
  isFavorite: boolean;
  city: City;
  location: Location;
  previewImage: string;
  type: OfferType;
  bedrooms: number;
  description: string;
  goods: Amenities[];
  host: User;
  images: string[];
  maxAdults: number;
};
