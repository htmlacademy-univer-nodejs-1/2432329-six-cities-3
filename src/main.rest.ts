import 'reflect-metadata';
import { Container } from 'inversify';
import { RestApplication } from './rest';
import { Component } from './shared/types';
import { createRestApplicationContainer } from './rest/rest.container';
import { createUserContainer } from './shared/modules/user';
import { createOfferContainer } from './shared/modules/offer';
import { createCommentContainer } from './shared/modules/comment/comment.container';
import { createAuthContainer } from './shared/modules/auth';

async function bootstrap() {
  const appContainer = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
    createOfferContainer(),
    createCommentContainer(),
    createAuthContainer()
  );

  const application = appContainer.get<RestApplication>(
    Component.RestApplication
  );
  await application.init();
}

bootstrap();
