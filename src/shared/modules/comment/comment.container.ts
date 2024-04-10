import { Container } from 'inversify';
import { Component } from '../../types';
import { CommentService } from './comment-service.interface';
import { types } from '@typegoose/typegoose';
import { CommentEntity, CommentModel } from './comment.entity';
import { DefaultCommentService } from './comment.service';

export function createCommentContainer() {
  const commentContainer = new Container();

  commentContainer
    .bind<CommentService>(Component.CommentService)
    .to(DefaultCommentService);
  commentContainer
    .bind<types.ModelType<CommentEntity>>(Component.CommentModel)
    .toConstantValue(CommentModel);

  return commentContainer;
}
