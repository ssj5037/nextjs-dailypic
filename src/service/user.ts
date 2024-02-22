import { getServerSession } from 'next-auth';
import { client } from '../../sanity/lib/client';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

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

export async function getFollowingUser() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  console.log(user);
  if (user) {
    return await client.fetch(
      `*[_type == "user" && email == "${user.email}"].following`
    );
  } else {
    console.log('세션이 없습니다.');
  }
}
