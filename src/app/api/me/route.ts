import { NextResponse } from 'next/server';
import { getUser } from '@/service/user';
import { checkSessionUser } from '@/util/session';

export async function GET() {
  return checkSessionUser(async (user) =>
    getUser(user.id)
      .then((data) => NextResponse.json(data))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }))
  );
}
