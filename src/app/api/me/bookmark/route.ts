import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/authOption';
import { delBookmark, setBookmark } from '@/service/user';

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    // 401 : unauthorized
    return new Response('Authentication Error', { status: 401 });
  }
  const { id, bookmark } = await req.json();

  if (!id || bookmark === undefined) {
    return new Response('Bad Request', { status: 400 });
  }

  const request = bookmark ? setBookmark : delBookmark;

  return request(id, user.id)
    .then((data) => NextResponse.json(data))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
