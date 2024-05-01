import { inject, injectable } from 'inversify';
import {
  BaseController,
  HttpError,
  HttpMethod,
  ValidateObjectIdMiddleware,
} from '../../libs/rest';
import { Component } from '../../types';
import { Logger } from '../../libs/logger';
import { Request, Response } from 'express';
import { DefaultOfferService } from './offer.service';
import { fillDTO } from '../../helpers';
import { OfferRdo } from './rdo';
import { CreateOfferDto } from './dto';
import { StatusCodes } from 'http-status-codes';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService)
    private readonly offerService: DefaultOfferService
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');

    this.addRoute({
      path: 'offers/',
      method: HttpMethod.Get,
      handler: this.index,
    });
    this.addRoute({
      path: 'offers/',
      method: HttpMethod.Post,
      handler: this.create,
    });
    this.addRoute({
      path: 'offers/:id',
      method: HttpMethod.Get,
      handler: this.getById,
      middlewares: [new ValidateObjectIdMiddleware('offerId')],
    });
    this.addRoute({
      path: 'offers/:id',
      method: HttpMethod.Patch,
      handler: this.updateById,
      middlewares: [new ValidateObjectIdMiddleware('offerId')],
    });
    this.addRoute({
      path: 'offers/:id',
      method: HttpMethod.Delete,
      handler: this.deleteById,
      middlewares: [new ValidateObjectIdMiddleware('offerId')],
    });
    this.addRoute({
      path: '/premium',
      method: HttpMethod.Get,
      handler: this.getPremiumByCity,
    });
    this.addRoute({
      path: '/favorites',
      method: HttpMethod.Get,
      handler: this.getFavorites,
    });
    this.addRoute({
      path: '/favorites/:id',
      method: HttpMethod.Post,
      handler: this.addFavorite,
      middlewares: [new ValidateObjectIdMiddleware('offerId')],
    });
    this.addRoute({
      path: '/favorites/:id',
      method: HttpMethod.Delete,
      handler: this.removeFavorite,
      middlewares: [new ValidateObjectIdMiddleware('offerId')],
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.get();
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public async create(
    {
      body,
    }: Request<
      Record<string, unknown>,
      Record<string, unknown>,
      CreateOfferDto
    >,
    res: Response
  ): Promise<void> {
    const result = await this.offerService.create(body);
    const responseData = fillDTO(OfferRdo, result);
    this.created(res, responseData);
  }

  public async getById(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const offer = await this.offerService.getById(id);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${id} not found.`,
        'OfferController'
      );
    }

    const responseData = fillDTO(OfferRdo, offer);
    this.ok(res, responseData);
  }

  public async updateById(): Promise<void> {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'OfferController'
    );
  }

  public async deleteById(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const offer = await this.offerService.getById(id);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${id} not found.`,
        'OfferController'
      );
    }

    await this.offerService.deleteById(id);
    this.noContent(res);
  }

  public async getPremiumByCity(req: Request, res: Response): Promise<void> {
    const city = req.query.city;
    if (city) {
      const offers = await this.offerService.getPremiumByCity(city as string);
      const responseData = fillDTO(OfferRdo, offers);
      this.ok(res, responseData);
    } else {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Bad request',
        'OfferController'
      );
    }
  }

  public async getFavorites(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.getFavorites();
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public async addFavorite(req: Request, res: Response): Promise<void> {
    const id = req.params['id'];
    const offer = await this.offerService.getById(id);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${id} not found.`,
        'OfferController'
      );
    }

    const result = await this.offerService.addFavorite(id);
    const responseData = fillDTO(OfferRdo, result);
    this.ok(res, responseData);
  }

  public async removeFavorite(req: Request, res: Response): Promise<void> {
    const id = req.params['id'];
    const offer = await this.offerService.getById(id);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${id} not found.`,
        'OfferController'
      );
    }

    const result = await this.offerService.removeFavorite(id);
    const responseData = fillDTO(OfferRdo, result);
    this.ok(res, responseData);
  }
}
