import { client } from '../../sanity/lib/client';

export async function getPosts(username: string) {
  return client.fetch(
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
      "imageUrl": image.asset->url
    }`
  );
}
