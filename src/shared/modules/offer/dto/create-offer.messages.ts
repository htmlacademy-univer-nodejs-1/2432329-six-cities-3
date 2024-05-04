export const CreateOfferValidationMessage = {
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
  city: {
    invalidFormat:
      'must be one of Paris, Cologne, Brussels, Amsterdam, Hamburg, Dusseldorf',
  },
  isPremium: {
    invalidFormat: 'Must be Boolean',
  },
  isFavorite: {
    invalidFormat: 'Must be Boolean',
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
  location: {
    invalidFormat: 'Location must be a valid object',
  },
  images: {
    invalidFormat: 'Images must be an array',
  },
} as const;
