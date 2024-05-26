import { inject, injectable } from 'inversify';
import { CommentService } from './comment-service.interface';
import { Component, SortType } from '../../types';
import { Logger } from '../../libs/logger';
import { DocumentType, types } from '@typegoose/typegoose';
import { CommentEntity } from './comment.entity';
import { CreateCommentDto } from './dto';
import { DEFAULT_COMMENT_COUNT } from './comment.constant';

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.CommentModel)
    private readonly commentModel: types.ModelType<CommentEntity>
  ) {}

  public async create(
    offerId: string,
    dto: CreateCommentDto
  ): Promise<DocumentType<CommentEntity>> {
    const result = await this.commentModel.create({
      ...dto,
      publishDate: new Date(),
      offer: offerId,
    });
    this.logger.info('New comment created');

    return result.populate('user');
  }

  public async getByOfferId(
    offerId: string
  ): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({ offer: offerId })
      .sort({ createdAt: SortType.Down })
      .limit(DEFAULT_COMMENT_COUNT)
      .populate('user')
      .exec();
  }
}
