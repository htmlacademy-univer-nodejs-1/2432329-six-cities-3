import { User } from '../../../types';

export class CreateCommentDto {
  text: string;
  publishDate: Date;
  rating: number;
  author: User;
}
