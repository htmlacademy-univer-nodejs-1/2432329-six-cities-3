import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsObject,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Amenities, City, Location, OfferType } from '../../../types';
import { CreateOfferValidationMessage } from './create-offer.messages';

export class CreateOfferDto {
  @IsString({ message: CreateOfferValidationMessage.title.invalidFormat })
  @MinLength(10, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.title.maxLength })
  public title: string;

  @IsString({ message: CreateOfferValidationMessage.description.invalidFormat })
  @MinLength(20, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(1024, { message: CreateOfferValidationMessage.title.maxLength })
  public description: string;

  @IsObject({
    message: CreateOfferValidationMessage.city.invalidFormat,
  })
  public city: City;

  public previewImage: string;

  @IsBoolean({ message: CreateOfferValidationMessage.isPremium.invalidFormat })
  public isPremium: boolean;

  @IsEnum(OfferType, {
    message: CreateOfferValidationMessage.type.invalidFormat,
  })
  public type: OfferType;

  @IsNumber(
    {},
    { message: CreateOfferValidationMessage.bedrooms.invalidFormat }
  )
  @Min(1, { message: CreateOfferValidationMessage.bedrooms.min })
  @Max(8, { message: CreateOfferValidationMessage.bedrooms.max })
  public bedrooms: number;

  @IsNumber(
    {},
    { message: CreateOfferValidationMessage.maxAdults.invalidFormat }
  )
  @Min(1, { message: CreateOfferValidationMessage.maxAdults.min })
  @Max(10, { message: CreateOfferValidationMessage.maxAdults.max })
  public maxAdults: number;

  @IsNumber({}, { message: CreateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: CreateOfferValidationMessage.price.min })
  @Max(100000, { message: CreateOfferValidationMessage.price.max })
  public price: number;

  @IsArray({ message: CreateOfferValidationMessage.goods.invalidFormat })
  public goods: Amenities[];

  @IsObject({ message: CreateOfferValidationMessage.location.invalidFormat })
  public location: Location;

  @IsArray({ message: CreateOfferValidationMessage.images.invalidFormat })
  public images: string[];

  public host: string;
}
