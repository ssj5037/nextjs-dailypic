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
