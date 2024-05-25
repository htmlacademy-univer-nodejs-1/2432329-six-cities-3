import { Amenities } from './amenities.enum';
import { CityName } from './city-name.enum';
import { Location } from './location.type';
import { OfferType } from './offer-type.enum';
import { User } from './user.type';

export type Offer = {
  id: string;
  price: number;
  rating: number;
  title: string;
  isPremium: boolean;
  isFavorite: boolean;
  city: CityName;
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
