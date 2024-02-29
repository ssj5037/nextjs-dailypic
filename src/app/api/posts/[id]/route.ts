import { NextRequest, NextResponse } from 'next/server';
import { getPost } from '@/service/posts';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/authOption';

type Context = {
  params: { id: string };
};

export async function GET(req: NextRequest, context: Context) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    // 401 : unauthorized
    return new Response('Authentication Error', { status: 401 });
  }
  return getPost(context.params.id).then((data) => NextResponse.json(data));
}
