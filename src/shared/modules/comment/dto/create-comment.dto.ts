import { Max, MaxLength, Min, MinLength } from 'class-validator';
import { CreateCommentValidationMessage } from './create-comment.messages.js';

export class CreateCommentDto {
  @MinLength(5, { message: CreateCommentValidationMessage.comment.minLength })
  @MaxLength(1024, {
    message: CreateCommentValidationMessage.comment.maxLength,
  })
  public comment: string;

  @Min(1, { message: CreateCommentValidationMessage.rating.min })
  @Max(5, { message: CreateCommentValidationMessage.rating.max })
  public rating: number;

  public user: string;

  public offerId: string;
}
