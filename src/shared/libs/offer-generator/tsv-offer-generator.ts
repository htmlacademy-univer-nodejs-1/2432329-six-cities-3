import dayjs from 'dayjs';
import {
  generateRandomValue,
  getRandomItem,
  getRandomItems,
} from '../../helpers';
import {
  Amenities,
  City,
  MockServerData,
  OfferType,
  UserType,
} from '../../types';
import { OfferGenerator } from './offer-generator.interface';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

const MIN_RATING = 1;
const MAX_RATING = 5;

const MIN_ROOMS = 1;
const MAX_ROOMS = 8;

const MIN_GUESTS = 1;
const MAX_GUESTS = 10;

const MIN_RENT = 100;
const MAX_RENT = 100_000;

const CITIES = [
  {
    city: City.Amsterdam,
    latitude: 52.370216,
    longitude: 4.895168,
  },
  {
    city: City.Brussels,
    latitude: 50.846557,
    longitude: 4.351697,
  },
  {
    city: City.Cologne,
    latitude: 50.938361,
    longitude: 6.959974,
  },
  {
    city: City.Dusseldorf,
    latitude: 51.225402,
    longitude: 6.776314,
  },
  {
    city: City.Hamburg,
    latitude: 53.550341,
    longitude: 10.000654,
  },
  {
    city: City.Paris,
    latitude: 48.85661,
    longitude: 2.351499,
  },
];

const BOOLEANS = ['true', 'false'];

const OFFER_TYPES = [
  OfferType.Apartment,
  OfferType.Hotel,
  OfferType.House,
  OfferType.Room,
];

const AMENITIES = [
  Amenities.AirConditioning,
  Amenities.BabySeat,
  Amenities.Breakfast,
  Amenities.Fridge,
  Amenities.LaptopFriendlyWorkspace,
  Amenities.Towels,
  Amenities.Washer,
];

const MIN_COMMENTS = 0;
const MAX_COMMENTS = 1000;

const USER_TYPES = [UserType.Ordinary, UserType.Pro];

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  generate(): string {
    const title = getRandomItem(this.mockData.titles);
    const description = getRandomItem(this.mockData.descriptions);
    const publishDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();
    const cityInfo = getRandomItem(CITIES);
    const { city, latitude, longitude } = cityInfo;
    const imagePreview = getRandomItem(this.mockData.imagePreviews);
    const photos = getRandomItems(this.mockData.photos).join(';');
    const isPremium = getRandomItem(BOOLEANS);
    const isFavorite = getRandomItem(BOOLEANS);
    const rating = generateRandomValue(MIN_RATING, MAX_RATING);
    const type = getRandomItem(OFFER_TYPES);
    const roomCount = generateRandomValue(MIN_ROOMS, MAX_ROOMS);
    const guestCount = generateRandomValue(MIN_GUESTS, MAX_GUESTS);
    const rentPrice = generateRandomValue(MIN_RENT, MAX_RENT);
    const amenities = getRandomItems(AMENITIES).join(';');
    const name = getRandomItem(this.mockData.names);
    const email = getRandomItem(this.mockData.emails);
    const avatarUrl = getRandomItem(this.mockData.avatars);
    const password = getRandomItem(this.mockData.passwords);
    const userType = getRandomItem(USER_TYPES);
    const commentsCount = generateRandomValue(MIN_COMMENTS, MAX_COMMENTS);
    const coordinates = [latitude, longitude].join(';');

    return [
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
    ].join('\t');
  }
}
