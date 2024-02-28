export type AuthUser = {
  id: string;
  username: string;
  name: string;
  email: string;
  image: string;
};

export type SimpleUser = Pick<AuthUser, 'username' | 'image'>;

export type HomeUser = AuthUser & {
  following: SimpleUser[];
  followers: SimpleUser[];
  bookmarks: string[];
};

export type ProfileUser = AuthUser & {
  posts: number;
  following: number;
  followers: number;
};
