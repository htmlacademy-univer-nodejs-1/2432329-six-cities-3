import { inject, injectable } from 'inversify';
import { Component } from '../../types';
import { ExceptionFilter } from '../../libs/rest';
import { Logger } from '../../libs/logger';
import { NextFunction, Request, Response } from 'express';
import { BaseUserException } from './errors';

@injectable()
export class AuthExceptionFilter implements ExceptionFilter {
  constructor(@inject(Component.Logger) private readonly logger: Logger) {
    this.logger.info('Register AuthExceptionFilter');
  }

  public catch(
    error: unknown,
    _req: Request,
    res: Response,
    next: NextFunction
  ): void {
    if (!(error instanceof BaseUserException)) {
      return next(error);
    }

    this.logger.error(`[AuthModule] ${error.message}`, error);
    res.status(error.httpStatusCode).json({
      type: 'AUTHORIZATION',
      error: error.message,
    });
  }
}
