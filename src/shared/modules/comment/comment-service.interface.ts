import { DocumentType } from '@typegoose/typegoose';
import { CommentEntity } from './comment.entity';
import { CreateCommentDto } from './dto';

export interface CommentService {
  create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
  getByOfferId(offerId: string): Promise<DocumentType<CommentEntity> | null>;
}
