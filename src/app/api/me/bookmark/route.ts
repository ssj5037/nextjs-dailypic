import { NextRequest, NextResponse } from 'next/server';
import { delBookmark, setBookmark } from '@/service/user';
import { checkSessionUser } from '@/util/session';

export async function PUT(req: NextRequest) {
  return checkSessionUser(async (user) => {
    const { id, bookmark } = await req.json();

    if (!id || bookmark === undefined) {
      return new Response('Bad Request', { status: 400 });
    }

    const request = bookmark ? setBookmark : delBookmark;

    return request(id, user.id)
      .then((data) => NextResponse.json(data))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}
