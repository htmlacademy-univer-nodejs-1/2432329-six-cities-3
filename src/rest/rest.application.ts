import { inject, injectable } from 'inversify';
import { Config, RestSchema } from '../shared/libs/config';
import { Logger } from '../shared/libs/logger';
import { Component } from '../shared/types';
import { DatabaseClient } from '../shared/libs/database-client';
import { getMongoURI } from '../shared/helpers';
import { UserModel } from '../shared/modules/user';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.DatabaseClient)
    private readonly databaseClient: DatabaseClient
  ) {}

  private async _initDb() {
    const mongoUri = getMongoURI(
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME')
    );

    return this.databaseClient.connect(mongoUri);
  }

  public async init() {
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
    this.logger.info('Init database…');
    await this._initDb();
    this.logger.info('Init database completed');
  }
}
