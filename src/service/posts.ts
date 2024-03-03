import { FullPost, Post, UserpagePost } from '@/models/post';
import { client, urlFor } from '../../sanity/lib/client';

function modifiedPostData(post: Post): Post {
  return {
    ...post,
    imageUrl: urlFor(post.imageUrl),
    likes: post.likes ?? [],
  };
}

function modifiedFullPostData(post: FullPost): FullPost {
  return {
    ...post,
    imageUrl: urlFor(post.imageUrl),
    likes: post.likes ?? [],
    comments: post.comments ?? [],
  };
}

export async function getPosts(username: string): Promise<Post[]> {
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
    .then((posts) => posts.map(modifiedPostData));
}

export async function getPost(id: string): Promise<FullPost> {
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
    .then(modifiedFullPostData);
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
      return posts.map(modifiedPostData);
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
      }}.bookmarks`
    )
    .then((bookmarks) => {
      if (!bookmarks) return [];
      return bookmarks.map(modifiedPostData);
    });
}

export async function getUserLikes(username: string): Promise<Post[]> {
  return client
    .fetch(
      `*[_type == "post" && "${username}" in like[]-> username]
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
    .then((likes) => {
      if (!likes) return [];
      return likes.map(modifiedPostData);
    });
}

export async function setLike(postId: string, userId: string) {
  return client
    .patch(postId)
    .setIfMissing({ like: [] })
    .append('like', [
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
    .unset([`like[_ref=="${userId}"]`])
    .commit();
}
