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
        "posts": count(*[_type == "post" && author->username == "${username}"]),
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

export async function setBookmark(postId: string, userId: string) {
  return client
    .patch(userId)
    .setIfMissing({ bookmarks: [] })
    .append('bookmarks', [
      {
        _ref: postId,
        _type: 'reference',
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function delBookmark(postId: string, userId: string) {
  return client
    .patch(userId)
    .unset([`bookmarks[_ref=="${postId}"]`])
    .commit();
}

// https://www.sanity.io/docs/js-client#multiple-mutations-in-a-transaction
export async function setFollowing(userId: string, followingUserId: string) {
  return client
    .transaction()
    .patch(userId, (user) =>
      user.append('following', [
        {
          _ref: followingUserId,
          _type: 'reference',
        },
      ])
    )
    .patch(followingUserId, (user) =>
      user.append('followers', [
        {
          _ref: userId,
          _type: 'reference',
        },
      ])
    )
    .commit({ autoGenerateArrayKeys: true });
}

export async function setUnFollowing(userId: string, followingUserId: string) {
  return client
    .transaction()
    .patch(userId, (user) =>
      user.unset([`following[_ref=="${followingUserId}"]`])
    )
    .patch(followingUserId, (user) =>
      user.unset([`followers[_ref=="${userId}"]`])
    )
    .commit();
}
