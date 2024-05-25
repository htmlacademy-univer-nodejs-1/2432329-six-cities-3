import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsObject,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Amenities, City, OfferType, User } from '../../../types';
import { UpdateOfferValidationMessage } from './update-offer.messages';

export class UpdateOfferDto {
  @IsString({ message: UpdateOfferValidationMessage.title.invalidFormat })
  @MinLength(10, { message: UpdateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: UpdateOfferValidationMessage.title.maxLength })
  public title: string;

  @IsNumber(
    {},
    { message: UpdateOfferValidationMessage.description.invalidFormat }
  )
  @MinLength(20, { message: UpdateOfferValidationMessage.title.minLength })
  @MaxLength(1024, { message: UpdateOfferValidationMessage.title.maxLength })
  public description: string;

  @IsDateString(
    {},
    { message: UpdateOfferValidationMessage.publishDate.invalidFormat }
  )
  public publishDate: Date;

  @IsObject({
    message: UpdateOfferValidationMessage.city.invalidFormat,
  })
  public city: City;

  public previewImage: string;

  @IsArray({ message: UpdateOfferValidationMessage.images.invalidFormat })
  public images: string[];

  @IsBoolean({ message: UpdateOfferValidationMessage.isPremium.invalidFormat })
  public isPremium: boolean;

  @IsBoolean({ message: UpdateOfferValidationMessage.isFavorite.invalidFormat })
  public isFavorite: boolean;

  @IsNumber({ maxDecimalPlaces: 1 })
  @Min(1, { message: UpdateOfferValidationMessage.rating.min })
  @Max(5, { message: UpdateOfferValidationMessage.rating.max })
  public rating: number;

  @IsEnum(OfferType, {
    message: UpdateOfferValidationMessage.city.invalidFormat,
  })
  public type: OfferType;

  @IsNumber(
    {},
    { message: UpdateOfferValidationMessage.bedrooms.invalidFormat }
  )
  @Min(1, { message: UpdateOfferValidationMessage.bedrooms.min })
  @Max(8, { message: UpdateOfferValidationMessage.bedrooms.max })
  public bedrooms: number;

  @IsNumber(
    {},
    { message: UpdateOfferValidationMessage.maxAdults.invalidFormat }
  )
  @Min(1, { message: UpdateOfferValidationMessage.maxAdults.min })
  @Max(10, { message: UpdateOfferValidationMessage.maxAdults.max })
  public maxAdults: number;

  @IsNumber({}, { message: UpdateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: UpdateOfferValidationMessage.price.min })
  @Max(100000, { message: UpdateOfferValidationMessage.price.max })
  public price: number;

  @IsArray({ message: UpdateOfferValidationMessage.goods.invalidFormat })
  public goods: Amenities[];

  @IsMongoId({ message: UpdateOfferValidationMessage.host.invalidFormat })
  public host: User;
}
