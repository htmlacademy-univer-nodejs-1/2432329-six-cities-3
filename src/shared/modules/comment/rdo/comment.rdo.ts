import { Expose } from 'class-transformer';
import { UserEntity } from '../../user';

export class CommentRdo {
  @Expose()
  public id: string;

  @Expose()
  public comment: string;

  @Expose()
  public rating: number;

  @Expose()
  public user: UserEntity;

  public offerId: string;
}
