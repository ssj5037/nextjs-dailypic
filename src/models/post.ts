import { SimpleUser } from './user';

export type Comment = {
  username: string;
  image?: string | undefined;
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

export type FullPost = Omit<Post, 'comments'> & {
  comments: Comment[];
};

export type UserpagePostType = 'posts' | 'likes' | 'bookmarks';
export type UserpagePost = Omit<Post, 'likes' | 'text'> & {
  likes: number;
};
