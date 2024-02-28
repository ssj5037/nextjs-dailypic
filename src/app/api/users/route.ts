import { NextRequest, NextResponse } from 'next/server';
import { getUsers } from '@/service/user';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    // 401 : unauthorized
    return new Response('Authentication Error', { status: 401 });
  }
  const search = req.nextUrl.searchParams.get('search');
  return getUsers(search ?? '').then((data) => NextResponse.json(data));
}
