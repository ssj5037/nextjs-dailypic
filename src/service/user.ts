import { client } from "../../sanity/lib/client";

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
      _type: "user",
      username,
      email,
      name,
      image,
      following: [],
      followers: [],
      bookmarks: [],
    })
    .then((res) => {
      console.log("Bike was created (or was already present)");
    });
}
