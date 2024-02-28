import { Amenities } from './amenities.enum';
import { Coordinates } from './coordinates.type';
import { OfferType } from './offer-type.enum';
import { User } from './user.type';

export type Offer = {
  title: string;
  description: string;
  publishDate: Date;
  city: string;
  imagePreview: string;
  photos: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: OfferType;
  roomCount: number;
  guestCount: number;
  rentPrice: number;
  amenities: Amenities;
  author: User;
  commentsCount: number;
  coordinates: Coordinates;
};
