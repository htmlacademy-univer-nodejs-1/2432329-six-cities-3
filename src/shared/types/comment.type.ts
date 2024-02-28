import { User } from './user.type';

export type Comment = {
  text: string;
  publishDate: Date;
  rating: number;
  author: User;
};
