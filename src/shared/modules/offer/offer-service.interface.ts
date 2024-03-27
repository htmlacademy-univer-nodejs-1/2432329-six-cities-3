import { DocumentType } from '@typegoose/typegoose';
import { CreateOfferDto } from './dto';
import { OfferEntity } from './offer.entity';

export interface OfferInterface {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
}
