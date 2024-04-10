import { DocumentType } from '@typegoose/typegoose';
import { CreateOfferDto, UpdateOfferDto } from './dto';
import { OfferEntity } from './offer.entity';

export interface OfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  getById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  updateById(
    offerId: string,
    dto: UpdateOfferDto
  ): Promise<DocumentType<OfferEntity> | null>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  get(offerCount?: number): Promise<DocumentType<OfferEntity>[] | null>;
  getPremiumByCity(city: string): Promise<DocumentType<OfferEntity>[] | null>;
  getFavorite(): Promise<DocumentType<OfferEntity>[] | null>;
  addFavorite(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  removeFavorite(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  updateCommentCount(
    offerId: string
  ): Promise<DocumentType<OfferEntity> | null>;
}
