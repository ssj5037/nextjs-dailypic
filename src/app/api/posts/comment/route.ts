import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/authOption';
import { addComment } from '@/service/posts';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    // 401 : unauthorized
    return new Response('Authentication Error', { status: 401 });
  }
  const { id, comment } = await req.json();

  if (!id || comment === undefined) {
    return new Response('Bad Request', { status: 400 });
  }

  return addComment(id, user.id, comment)
    .then((data) => NextResponse.json(data))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
