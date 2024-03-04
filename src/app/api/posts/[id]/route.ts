import { NextRequest, NextResponse } from 'next/server';
import { getPost } from '@/service/posts';
import { checkSessionUser } from '@/util/session';

type Context = {
  params: { id: string };
};

export async function GET(req: NextRequest, context: Context) {
  return checkSessionUser(async (user) =>
    getPost(context.params.id)
      .then((data) => NextResponse.json(data))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }))
  );
}
