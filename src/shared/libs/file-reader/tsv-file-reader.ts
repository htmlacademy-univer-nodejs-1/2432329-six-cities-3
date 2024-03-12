import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import { Amenities, City, Offer, OfferType, UserType } from '../../types';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(private readonly filename: string) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    const offers: Offer[] = [];
    for (const row of this.rawData.split('\n')) {
      if (row.trim().length > 0) {
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
        ] = row.split('\t');
        console.log(commentsCount);
        offers.push({
          title: title,
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
          amenities: amenities
            .split(';')
            .map((amenity) => amenity as Amenities),
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
        });
      }
    }

    return offers;
  }
}
