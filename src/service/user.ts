import { ProfileUser } from '@/models/user';
import { client } from '../../sanity/lib/client';

type OAuthUser = {
  id: string;
  email: String;
  name?: string | null;
  username?: string | null;
  image?: string | null;
};

export async function createUser({
  id,
  username,
  email,
  name,
  image,
}: OAuthUser) {
  return await client
    .createIfNotExists({
      _id: id,
      _type: 'user',
      username,
      email,
      name,
      image,
      following: [],
      followers: [],
      bookmarks: [],
    })
    .then((res) => {
      console.log('Bike was created (or was already present)');
    });
}

export async function getUser(id: string) {
  return client.fetch(
    `*[_type == "user" && _id == "${id}"]{
        ...,
        "id": _id,
        following[]->{ username, image },
        followers[]->{ username, image },
        "bookmarks":bookmarks[]->_id
      }[0]`
  );
}

export async function getUsers(search: string) {
  return client
    .fetch(
      `*[_type == "user" && (name match "*${search}*" || username match "*${search}*")]{
        ...,
        "id": _id,
        "posts": count(*[_type == "post" && references(^._id)]),
        "following": count(following),
        "followers": count(followers)
      }`
    )
    .then((users) =>
      users.map((user: ProfileUser) => ({
        ...user,
        following: user.following ?? 0,
        followers: user.followers ?? 0,
      }))
    );
}

export async function getUserProfile(username: string) {
  return client
    .fetch(
      `*[_type == "user" && username == "${username}"]{
        ...,
        "id": _id,
        "posts": count(*[_type == "post" && references(^._id)]),
        "following": count(following),
        "followers": count(followers)
      }[0]`
    )
    .then((user: ProfileUser) => {
      return {
        ...user,
        following: user.following ?? 0,
        followers: user.followers ?? 0,
        posts: user.posts ?? 0,
      };
    });
}
