import { SimpleUser } from './../../../models/user';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import { getPosts } from '@/service/posts';
import { getUser } from '@/service/user';

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    // 401 : unauthorized
    return new Response('Authentication Error', { status: 401 });
  }
  return getPosts(user.username).then((data) => NextResponse.json(data));
}
