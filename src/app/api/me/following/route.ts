import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/authOption';
import { setFollowing, setUnFollowing } from '@/service/user';

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    // 401 : unauthorized
    return new Response('Authentication Error', { status: 401 });
  }
  const { followingUserId, following } = await req.json();

  if (!followingUserId || following === undefined) {
    return new Response('Bad Request', { status: 400 });
  }

  const request = following ? setFollowing : setUnFollowing;

  return request(user.id, followingUserId)
    .then((data) => NextResponse.json(data))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
