import { NextRequest, NextResponse } from 'next/server';
import { delLike, setLike } from '@/service/posts';
import { checkSessionUser } from '@/util/session';

export async function PUT(req: NextRequest) {
  return checkSessionUser(async (user) => {
    const { id, like } = await req.json();

    if (!id || like === undefined) {
      return new Response('Bad Request', { status: 400 });
    }

    const request = like ? setLike : delLike;

    return request(id, user.id)
      .then((data) => NextResponse.json(data))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}
