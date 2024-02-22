import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import { getUser } from '@/service/user';

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  console.log(user);
  if (!user) {
    // 401 : unauthorized
    return new Response('Authentication Error', { status: 401 });
  }

  return getUser(user.id).then((data) => NextResponse.json(data));
}
