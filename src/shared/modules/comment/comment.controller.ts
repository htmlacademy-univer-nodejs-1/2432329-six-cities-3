import { inject } from 'inversify';
import {
  BaseController,
  HttpMethod,
  PrivateRouteMiddleware,
  RequestBody,
  RequestParams,
  ValidateDtoMiddleware,
  ValidateObjectIdMiddleware,
} from '../../libs/rest';
import { Component } from '../../types';
import { Logger } from '../../libs/logger';
import { CommentService } from './comment-service.interface';
import { Request, Response } from 'express';
import { CommentRdo } from './rdo';
import { OfferService } from '../offer';
import { fillDTO } from '../../helpers';
import { CreateCommentDto } from './dto';
import { DocumentExistsMiddleware } from '../../libs/rest/middleware/document-exists.middleware';

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
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });
    this.addRoute({
      path: '/offers/:offerId/comments',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(CreateCommentDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });
  }

  public async get({ params }: Request, res: Response): Promise<void> {
    const offerId = params.offerId as unknown as string;

    const comments = await this.commentService.getByOfferId(offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
  }

  public async create(
    { body, params }: CreateCommentRequest,
    res: Response
  ): Promise<void> {
    const offerId = params.offerId as unknown as string;

    const comment = await this.commentService.create(body);
    await this.offerService.updateCommentCount(offerId);
    this.created(res, fillDTO(CommentRdo, comment));
  }
}
