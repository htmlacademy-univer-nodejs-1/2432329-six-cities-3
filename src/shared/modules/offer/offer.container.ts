import { Container } from 'inversify';
import { OfferService } from './offer-service.interface';
import { Component } from '../../types';
import { types } from '@typegoose/typegoose';
import { OfferEntity, OfferModel } from './offer.entity';
import { DefaultOfferService } from './offer.service';
import { Controller } from '../../libs/rest';
import { OfferController } from './offer.controller';

export function createOfferContainer() {
  const offerContainer = new Container();

  offerContainer
    .bind<OfferService>(Component.OfferService)
    .to(DefaultOfferService);
  offerContainer
    .bind<types.ModelType<OfferEntity>>(Component.OfferModel)
    .toConstantValue(OfferModel);
  offerContainer
    .bind<Controller>(Component.OfferController)
    .to(OfferController)
    .inSingletonScope();

  return offerContainer;
}
