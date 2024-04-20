import { inject, injectable } from 'inversify';
import { BaseController, HttpMethod } from '../../libs/rest';
import { Component } from '../../types';
import { Logger } from '../../libs/logger';
import { Request, Response } from 'express';
import { DefaultOfferService } from './offer.service';
import { fillDTO } from '../../helpers';
import { OfferRdo } from './rdo';
import { CreateOfferDto } from './dto';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService)
    private readonly OfferService: DefaultOfferService
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.OfferService.get();
    this.ok(res, fillDTO(OfferRdo, offers));
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
    const result = await this.OfferService.create(body);
    this.created(res, fillDTO(OfferRdo, result));
  }
}
