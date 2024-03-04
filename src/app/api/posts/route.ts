import { NextRequest, NextResponse } from 'next/server';
import { addNewPost, getPosts } from '@/service/posts';
import { checkSessionUser } from '@/util/session';

export async function GET() {
  return checkSessionUser(async (user) =>
    getPosts(user.username)
      .then((data) => NextResponse.json(data))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }))
  );
}

export async function POST(req: NextRequest) {
  return checkSessionUser(async (user) => {
    const form = await req.formData();
    const text = form.get('text')?.toString();
    const file = form.get('file') as Blob;

    if (!file || !text) {
      return new Response('Bad Request', { status: 400 });
    }

    return addNewPost(file, text, user.id)
      .then((data) => NextResponse.json(data))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}
