import { NextRequest, NextResponse } from 'next/server';
import { getUsers } from '@/service/user';

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams.get('search');
  return getUsers(search ?? '').then((data) => NextResponse.json(data));
}
