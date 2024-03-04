import { NextRequest, NextResponse } from 'next/server';
import { addComment } from '@/service/posts';
import { checkSessionUser } from '@/util/session';

export async function POST(req: NextRequest) {
  return checkSessionUser(async (user) => {
    const { id, comment } = await req.json();

    if (!id || comment === undefined) {
      return new Response('Bad Request', { status: 400 });
    }

    return addComment(id, user.id, comment)
      .then((data) => NextResponse.json(data))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}
