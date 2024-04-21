import { inject } from 'inversify';
import {
  BaseController,
  HttpError,
  HttpMethod,
  RequestBody,
  RequestParams,
} from '../../libs/rest';
import { Component } from '../../types';
import { Logger } from '../../libs/logger';
import { UserService } from './user-service.interface';
import { Config, RestSchema } from '../../libs/config';
import { Request, Response } from 'express';
import { CreateUserDto, LoginUserDto } from './dto';
import { StatusCodes } from 'http-status-codes';
import { fillDTO } from '../../helpers';
import { AuthUserRdo } from './rdo';

type CreateUserRequest = Request<RequestParams, RequestBody, CreateUserDto>;
type LoginUserRequest = Request<RequestParams, RequestBody, LoginUserDto>;

export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config) private readonly configService: Config<RestSchema>
  ) {
    super(logger);
    this.logger.info('Register router for UserController');

    this.addRoute({
      path: '/register',
      method: HttpMethod.Post,
      handler: this.register,
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Post,
      handler: this.login,
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Get,
      handler: this.checkStatus,
    });
    this.addRoute({
      path: '/logout',
      method: HttpMethod.Delete,
      handler: this.logout,
    });
  }

  public async register(
    { body }: CreateUserRequest,
    res: Response
  ): Promise<void> {
    const existsUser = await this.userService.getByEmail(body.email);

    if (existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email ${body.email} already exists.`,
        'UserController'
      );
    }

    const result = await this.userService.create(
      body,
      this.configService.get('SALT')
    );
    const responseData = fillDTO(AuthUserRdo, result);
    this.created(res, responseData);
  }

  public async login(
    { body }: LoginUserRequest,
    _res: Response
  ): Promise<void> {
    const existsUser = await this.userService.getByEmail(body.email);

    if (!existsUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `User with email ${body.email} not found.`,
        'UserController'
      );
    }

    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController'
    );
  }

  public async checkStatus(): Promise<void> {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController'
    );
  }

  public async logout(): Promise<void> {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController'
    );
  }
}