import { SimpleUser } from './user';

export type Comment = {
  username: string;
  image: string;
  comment: string;
};

export type Post = SimpleUser & {
  id: string;
  comments: number;
  likes: string[];
  text: string;
  imageUrl: string;
  publishedAt: Date;
};

export type FullPost = Post & {
  comments: Comment[];
};
