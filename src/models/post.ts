import { Image } from 'sanity';
import { SimpleUser } from './user';

export type Comment = {
  author: SimpleUser;
  comment: string;
};

export type Post = {
  id: string;
  author: SimpleUser;
  image: Image;
  imageUrl: string;
  like: SimpleUser[];
  comments: Comment[];
  publishedAt: Date;
};
