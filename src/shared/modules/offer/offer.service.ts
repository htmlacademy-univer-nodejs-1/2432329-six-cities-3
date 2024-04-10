import { inject, injectable } from 'inversify';
import { Component, SortType } from '../../types';
import { OfferService } from './offer-service.interface';
import { Logger } from '../../libs/logger';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity';
import { CreateOfferDto, UpdateOfferDto } from './dto';
import { DEFAULT_OFFER_COUNT, PREMIUM_OFFER_COUNT } from './offer.constant';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel)
    private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async getById(
    offerId: string
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(offerId).populate('author').exec();
  }

  public async updateById(
    offerId: string,
    dto: UpdateOfferDto
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, { new: true })
      .populate('author')
      .exec();
  }

  public async deleteById(
    id: string
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndDelete(id).exec();
  }

  public async get(
    offerCount?: number
  ): Promise<DocumentType<OfferEntity>[] | null> {
    return this.offerModel
      .find()
      .sort({ createdAt: SortType.Down })
      .limit(offerCount ?? DEFAULT_OFFER_COUNT)
      .populate('author')
      .exec();
  }

  public async getPremiumByCity(
    city: string
  ): Promise<DocumentType<OfferEntity>[] | null> {
    return this.offerModel
      .find({ isPremium: true, city })
      .sort({ createdAt: SortType.Down })
      .limit(PREMIUM_OFFER_COUNT)
      .populate('author')
      .exec();
  }

  public async getFavorite(): Promise<DocumentType<OfferEntity>[] | null> {
    return this.offerModel.find({ isFavorite: true }).populate('author').exec();
  }

  public async addFavorite(
    id: string
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(id, { isFavorite: true }, { new: true })
      .populate('author')
      .exec();
  }

  public async removeFavorite(
    id: string
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(id, { isFavorite: false }, { new: true })
      .populate('author')
      .exec();
  }

  public async updateCommentCount(
    offerId: string
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {
        $inc: {
          commentCount: 1,
        },
      })
      .populate('author')
      .exec();
  }
}
