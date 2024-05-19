import { Amenities, City, Offer, OfferType, UserType } from '../types';

export function createOffer(offerData: string): Omit<Offer, 'id'> {
  const [
    title,
    description,
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
    coordinates,
  ] = offerData.replace('\n', '').split('\t');

  return {
    title,
    description: description,
    city: city as City,
    previewImage: imagePreview,
    images: photos.split(';'),
    isPremium: isPremium === 'true',
    isFavorite: isFavorite === 'true',
    rating: Number(rating),
    type: type as OfferType,
    bedrooms: Number(roomCount),
    maxAdults: Number(guestCount),
    price: Number(rentPrice),
    goods: amenities.split(';').map((amenity) => amenity as Amenities),
    host: {
      name,
      email,
      avatarUrl,
      password,
      type: userType as UserType,
    },
    location: {
      latitude: Number(coordinates.split(';')[0]),
      longitude: Number(coordinates.split(';')[1]),
    },
  };
}
