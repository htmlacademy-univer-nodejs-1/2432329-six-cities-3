import { inject } from 'inversify';
import {
  BaseController,
  HttpError,
  HttpMethod,
  RequestBody,
  RequestParams,
} from '../../libs/rest';
import { Component } from '../../types';
import { Logger } from '../../libs/logger';
import { CommentService } from './comment-service.interface';
import { Request, Response } from 'express';
import { CommentRdo } from './rdo';
import { StatusCodes } from 'http-status-codes';
import { OfferService } from '../offer';
import { fillDTO } from '../../helpers';

type CreateCommentRequest = Request<RequestParams, RequestBody, CommentRdo>;

export class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService)
    private readonly commentService: CommentService,
    @inject(Component.OfferService) private readonly offerService: OfferService
  ) {
    super(logger);
    this.logger.info('Register router for CommentController');

    this.addRoute({
      path: '/offers/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.get,
    });
    this.addRoute({
      path: '/offers/:offerId/comments',
      method: HttpMethod.Post,
      handler: this.create,
    });
  }

  public async get({ params }: Request, res: Response): Promise<void> {
    const offerId = params.offerId as unknown as string;
    if (!(await this.offerService.getById(offerId))) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} not found.`,
        'OfferController'
      );
    }

    const comments = await this.commentService.getByOfferId(offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
  }

  public async create(
    { body, params }: CreateCommentRequest,
    res: Response
  ): Promise<void> {
    const offerId = params.offerId as unknown as string;
    if (!(await this.offerService.getById(offerId))) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} not found.`,
        'CommentController'
      );
    }

    const comment = await this.commentService.create(body);
    await this.offerService.updateCommentCount(offerId);
    this.created(res, fillDTO(CommentRdo, comment));
  }
}
