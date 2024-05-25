import { Expose } from 'class-transformer';

export class CommentRdo {
  @Expose()
  public comment: string;

  @Expose()
  public rating: number;

  public user: string;
}
