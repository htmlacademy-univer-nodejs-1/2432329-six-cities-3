import { DocumentType } from '@typegoose/typegoose';
import { CreateOfferDto, UpdateOfferDto } from './dto';
import { OfferEntity } from './offer.entity';
import { DocumentExists } from '../../types';

export interface OfferService extends DocumentExists {
  get(offerCount?: number): Promise<DocumentType<OfferEntity>[] | null>;
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  getById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  updateById(
    offerId: string,
    dto: UpdateOfferDto
  ): Promise<DocumentType<OfferEntity> | null>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  getPremiumByCity(city: string): Promise<DocumentType<OfferEntity>[] | null>;
  getFavorites(): Promise<DocumentType<OfferEntity>[] | null>;
  addFavorite(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  removeFavorite(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  updateCommentCount(
    offerId: string
  ): Promise<DocumentType<OfferEntity> | null>;
  exists(offerId: string): Promise<boolean>;
}
