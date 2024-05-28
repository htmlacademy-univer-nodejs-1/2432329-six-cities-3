import { DocumentType } from '@typegoose/typegoose';
import { CommentEntity } from './comment.entity.js';
import { CreateCommentDto } from './dto/index.js';

export interface CommentService {
  create(
    offerId: string,
    dto: CreateCommentDto
  ): Promise<DocumentType<CommentEntity>>;
  getByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]>;
}
