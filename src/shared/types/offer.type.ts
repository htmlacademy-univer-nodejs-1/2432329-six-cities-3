import { OfferType } from "./offer-type.enum";

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

}
