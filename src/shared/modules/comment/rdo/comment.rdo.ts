import { Expose, Type } from 'class-transformer';
import { UserRdo } from '../../user/rdo/index.js';

export class CommentRdo {
  @Expose()
  public id: string;

  @Expose()
  public comment: string;

  @Expose()
  public rating: number;

  @Expose()
  public date: string;

  @Expose({ name: 'user' })
  @Type(() => UserRdo)
  public user: string;

  public offerId: string;
}
