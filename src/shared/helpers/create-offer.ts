import { Amenities, City, Offer, OfferType, UserType } from '../types';

export function createOffer(offerData: string): Offer {
  const [
    title,
    description,
    publishDate,
    city,
    imagePreview,
    photos,
    isPremium,
    isFavorite,
    rating,
    type,
    roomCount,
    guestCount,
    rentPrice,
    amenities,
    name,
    email,
    avatarUrl,
    password,
    userType,
    commentsCount,
    coordinates,
  ] = offerData.replace('\n', '').split('\t');

  return {
    title,
    description: description,
    publishDate: new Date(publishDate),
    city: city as City,
    imagePreview: imagePreview,
    photos: photos.split(';'),
    isPremium: isPremium === 'true',
    isFavorite: isFavorite === 'true',
    rating: Number(rating),
    type: type as OfferType,
    roomCount: Number(roomCount),
    guestCount: Number(guestCount),
    rentPrice: Number(rentPrice),
    amenities: amenities.split(';').map((amenity) => amenity as Amenities),
    author: {
      name,
      email,
      avatarUrl,
      password,
      userType: userType as UserType,
    },
    commentsCount: Number(commentsCount),
    coordinates: {
      latitude: Number(coordinates.split(';')[0]),
      longitude: Number(coordinates.split(';')[1]),
    },
  };
}
