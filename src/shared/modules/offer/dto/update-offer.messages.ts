export const UpdateOfferValidationMessage = {
  title: {
    invalidFormat: 'Title must be a string',
    minLength: 'Minimum title length must be 10',
    maxLength: 'Maximum title length must be 100',
  },
  description: {
    invalidFormat: 'Description must be a number',
    minLength: 'Minimum description length must be 20',
    maxLength: 'Maximum description length must be 1024',
  },
  publishDate: {
    invalidFormat: 'PublishDate must be a valid ISO date',
  },
  city: {
    invalidFormat: 'Should be of type City',
  },
  images: {
    invalidFormat: 'Images must be an array',
  },
  isPremium: {
    invalidFormat: 'Must be Boolean',
  },
  isFavorite: {
    invalidFormat: 'Must be Boolean',
  },
  rating: {
    min: 'Minimum rating must be 1',
    max: 'Maximum rating must be 5',
  },
  type: {
    invalidFormat: 'Must be one of Apartment, House, Room, Hotel',
  },
  bedrooms: {
    invalidFormat: 'Bedrooms must be a number',
    min: 'Minimum number of bedrooms must be 1',
    max: 'Maximum number of bedrooms must be 8',
  },
  maxAdults: {
    invalidFormat: 'MaxAdults must be a number',
    min: 'Minimum number of maxAdults must be 1',
    max: 'Maximum number of maxAdults must be 10',
  },
  price: {
    invalidFormat: 'Price must be a number',
    min: 'Minimum price must be 100',
    max: 'Maximum price must be 100000',
  },
  goods: {
    invalidFormat: 'Must be an array',
    invalidElementFormat:
      'Element must be one of Breakfast, Air conditioning, Laptop friendly workspace, Baby seat, Washer, Towels, Fridge',
  },
  host: {
    invalidFormat: 'Must be a valid MongoId',
  },
} as const;
