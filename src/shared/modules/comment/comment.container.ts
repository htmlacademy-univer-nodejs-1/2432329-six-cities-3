import { Container } from 'inversify';
import { Component } from '../../types';
import { CommentService } from './comment-service.interface';
import { types } from '@typegoose/typegoose';
import { CommentEntity, CommentModel } from './comment.entity';
import { DefaultCommentService } from './comment.service';
import { Controller } from '../../libs/rest';
import { CommentController } from './comment.controller';

export function createCommentContainer() {
  const commentContainer = new Container();

  commentContainer
    .bind<CommentService>(Component.CommentService)
    .to(DefaultCommentService);
  commentContainer
    .bind<types.ModelType<CommentEntity>>(Component.CommentModel)
    .toConstantValue(CommentModel);
  commentContainer
    .bind<Controller>(Component.CommentController)
    .to(CommentController)
    .inSingletonScope();

  return commentContainer;
}
