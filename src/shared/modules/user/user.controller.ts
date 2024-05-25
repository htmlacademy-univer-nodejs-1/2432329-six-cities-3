import { inject } from 'inversify';
import {
  BaseController,
  HttpError,
  HttpMethod,
  RequestBody,
  RequestParams,
  UploadFileMiddleware,
  ValidateDtoMiddleware,
  ValidateObjectIdMiddleware,
} from '../../libs/rest';
import { Component } from '../../types';
import { Logger } from '../../libs/logger';
import { UserService } from './user-service.interface';
import { Config, RestSchema } from '../../libs/config';
import { Request, Response } from 'express';
import { CreateUserDto, LoginUserDto } from './dto';
import { StatusCodes } from 'http-status-codes';
import { fillDTO } from '../../helpers';
import { AuthUserRdo, LoggedUserRdo, UploadUserAvatarRdo } from './rdo';
import { AuthService } from '../auth';

type CreateUserRequest = Request<RequestParams, RequestBody, CreateUserDto>;
type LoginUserRequest = Request<RequestParams, RequestBody, LoginUserDto>;

export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config)
    private readonly configService: Config<RestSchema>,
    @inject(Component.AuthService) private readonly authService: AuthService
  ) {
    super(logger);
    this.logger.info('Register router for UserController');

    this.addRoute({
      path: '/register',
      method: HttpMethod.Post,
      handler: this.register,
      middlewares: [new ValidateDtoMiddleware(CreateUserDto)],
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Post,
      handler: this.login,
      middlewares: [new ValidateDtoMiddleware(LoginUserDto)],
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
    this.addRoute({
      path: '/:userId/avatar',
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new ValidateObjectIdMiddleware('userId'),
        new UploadFileMiddleware(
          this.configService.get('UPLOAD_DIRECTORY'),
          'avatar'
        ),
      ],
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

  public async login({ body }: LoginUserRequest, res: Response): Promise<void> {
    const user = await this.authService.verify(body);
    const token = await this.authService.authenticate(user);
    const responseData = fillDTO(LoggedUserRdo, {
      email: user.email,
      token,
    });
    this.ok(res, responseData);
  }

  public async checkStatus(
    { tokenPayload: { email } }: Request,
    res: Response
  ): Promise<void> {
    const foundUser = await this.userService.getByEmail(email);

    if (!foundUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }

    this.ok(res, fillDTO(LoggedUserRdo, foundUser));
  }

  public async logout(_req: Request, res: Response): Promise<void> {
    this.ok(res, null);
  }

  public async uploadAvatar({ params, file }: Request, res: Response) {
    const { userId } = params;
    if (file) {
      const uploadFile = { avatarUrl: file.filename };
      await this.userService.updateById(userId, uploadFile);
      this.created(
        res,
        fillDTO(UploadUserAvatarRdo, { filepath: uploadFile.avatarUrl })
      );
    }
  }
}
