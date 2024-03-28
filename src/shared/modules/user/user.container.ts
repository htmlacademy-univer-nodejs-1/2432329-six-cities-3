import { Container } from 'inversify';
import { UserService } from './user-service.interface';
import { Component } from '../../types';
import { DefaultUserService } from './default-user.service';
import { UserEntity, UserModel } from './user.entity';
import { types } from '@typegoose/typegoose';

export function createUserContainer() {
  const userContainer = new Container();
  userContainer
    .bind<UserService>(Component.UserService)
    .to(DefaultUserService)
    .inSingletonScope();
  userContainer
    .bind<types.ModelType<UserEntity>>(Component.UserModel)
    .toConstantValue(UserModel);

  return userContainer;
}
