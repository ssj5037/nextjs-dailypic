import { client } from '../../sanity/lib/client';

export async function getPosts(followingUsers: string[]) {
  return client.fetch(
    `*[_type == "post" && author._ref in *[_type=="user" && username in [${followingUsers.map((user) => `'${user}'`)}]]._id]{
      ...,
      "id": _id,
      author->{ username, image },
      comments[]{ 
        comment, 
        author->{ username, image }
      },
      like[]->{ username, image },
      "imageUrl": image.asset->url
    }`
  );
}
