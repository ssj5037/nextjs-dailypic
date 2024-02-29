import { Post, UserpagePost } from '@/models/post';
import { client, urlFor } from '../../sanity/lib/client';

export async function getPosts(username: string) {
  return client
    .fetch(
      `*[_type == "post" && author->username == "${username}"
  || author._ref in *[_type == "user" && username == "${username}"].following[]._ref]
  | order(publishedAt desc)
  {
      ...,
      "id": _id,
      "username": author->username,
      "image": author->image,
      "comments": count(comments),
      "likes": like[]->username,
      "text": comments[0].comment,
      "imageUrl": image
    }`
    )
    .then((posts) =>
      posts.map((post: Post) => ({ ...post, imageUrl: urlFor(post.imageUrl) }))
    );
}

export async function getPost(id: string) {
  return client
    .fetch(
      `*[_type == "post" && _id == "${id}"]
  {
      ...,
      "id": _id,
      "username": author->username,
      "image": author->image,
      "comments": comments[]{
        "username": author->username,
        "image": author->image,
        comment
      },
      "likes": like[]->username,
      "text": comments[0].comment,
      "imageUrl": image
    }[0]`
    )
    .then((post) => ({ ...post, imageUrl: urlFor(post.imageUrl) }));
}

export async function getUserPosts(username: string): Promise<Post[]> {
  return client
    .fetch(
      `*[_type == "post" && author->username == "${username}"] | order(publishedAt desc)
    {
      ...,
      "id": _id,
      "username": author->username,
      "image": author->image,
      "comments": count(comments),
      "likes": like[]->username,
      "text": comments[0].comment,
      "imageUrl": image
    }`
    )
    .then((posts) => {
      return posts.map((post: Post) => ({
        ...post,
        imageUrl: urlFor(post.imageUrl),
        likes: post.likes ?? [],
      }));
    });
}

export async function getUserBookmarks(username: string): Promise<Post[]> {
  return client
    .fetch(
      `*[_type == "user" && username == "${username}"][0]
      {bookmarks[] | order(publishedAt desc)->{
          ...,
          "id": _id,
          "username": author->username,
          "image": author->image,
          "comments": count(comments),
          "likes": like[]->username,
          "text": comments[0].comment,
          "imageUrl": image
      }}`
    )
    .then((posts) => {
      if (!posts.bookmarks) return [];
      return posts.bookmarks.map((post: Post) => ({
        ...post,
        imageUrl: urlFor(post.imageUrl),
        likes: post.likes ?? [],
      }));
    });
}

export async function getUserLikes(username: string): Promise<Post[]> {
  return client
    .fetch(
      `*[_type == "post" && "${username}" in likes[]-> username]
      | order(publishedAt desc){
        ...,
        "id": _id,
        "username": author->username,
        "image": author->image,
        "comments": count(comments),
        "likes": like[]->username,
        "text": comments[0].comment,
        "imageUrl": image
      }`
    )
    .then((posts) => {
      if (!posts.likes) return [];
      return posts.likes.map((post: Post) => ({
        ...post,
        imageUrl: urlFor(post.imageUrl),
        likes: post.likes ?? [],
      }));
    });
}

export async function setLike(postId: string, userId: string) {
  return client
    .patch(postId)
    .setIfMissing({ likes: [] })
    .append('likes', [
      {
        _ref: userId,
        _type: 'reference',
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function delLike(postId: string, userId: string) {
  return client
    .patch(postId)
    .unset([`likes[_ref=="${userId}"]`])
    .commit();
}
