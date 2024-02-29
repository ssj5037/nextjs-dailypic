import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]/route';
import { getUserLikes } from '@/service/posts';

type Context = {
  params: { username: string };
};

export async function GET(req: NextRequest, context: Context) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    // 401 : unauthorized
    return new Response('Authentication Error', { status: 401 });
  }
  return getUserLikes(context.params.username).then((data) =>
    NextResponse.json(data)
  );
}
