import 'reflect-metadata';
import { Container } from 'inversify';
import { RestApplication } from './rest';
import { Component } from './shared/types';
import { createRestApplicationContainer } from './rest/rest.container';
import { createUserContainer } from './shared/modules/user';

async function bootstrap() {
  const appContainer = Container.merge(
    createRestApplicationContainer(),
    createUserContainer()
  );

  const application = appContainer.get<RestApplication>(
    Component.RestApplication
  );
  await application.init();
}

bootstrap();
