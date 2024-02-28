import { Post } from '@/models/post';
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

export async function getUserPosts(username: string) {
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
    .then((posts) =>
      posts.map((post: Post) => ({ ...post, imageUrl: urlFor(post.imageUrl) }))
    );
}
