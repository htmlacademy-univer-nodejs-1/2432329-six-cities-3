import { inject, injectable } from 'inversify';
import { Component } from '../../../types';
import { Logger } from '../../logger';
import { Config, RestSchema } from '../../config';
import { getFullServerPath } from '../../../helpers';
import { STATIC_FILES_ROUTE, STATIC_UPLOAD_ROUTE } from '../../../../rest';
import {
  DEFAULT_STATIC_IMAGES,
  STATIC_RESOURCE_FIELDS,
} from './path-transformer.constant';

function isObject(value: unknown): value is Record<string, object> {
  return typeof value === 'object' && value !== null;
}

@injectable()
export class PathTransformer {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>
  ) {
    this.logger.info('PathTranformer created!');
  }

  private hasDefaultImage(value: string) {
    return DEFAULT_STATIC_IMAGES.includes(value);
  }

  private isStaticProperty(property: string) {
    return STATIC_RESOURCE_FIELDS.includes(property);
  }

  public execute(data: Record<string, unknown>): Record<string, unknown> {
    const stack = [data];
    while (stack.length > 0) {
      const current = stack.pop();

      for (const key in current) {
        if (Object.hasOwn(current, key)) {
          const value = current[key];

          if (isObject(value)) {
            stack.push(value);
            continue;
          }

          if (this.isStaticProperty(key) && typeof value === 'string') {
            const staticPath = STATIC_FILES_ROUTE;
            const uploadPath = STATIC_UPLOAD_ROUTE;
            const serverHost = this.config.get('HOST');
            const serverPort = this.config.get('PORT');

            const rootPath = this.hasDefaultImage(value)
              ? staticPath
              : uploadPath;
            current[key] = `${getFullServerPath(
              serverHost,
              serverPort
            )}${rootPath}/${value}`;
          }
        }
      }
    }

    return data;
  }
}
