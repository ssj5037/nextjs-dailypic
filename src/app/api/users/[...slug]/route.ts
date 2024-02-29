import { getUserBookmarks, getUserLikes, getUserPosts } from '@/service/posts';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  params: { slug: string[] };
};

export async function GET(_: NextRequest, context: Context) {
  const { slug } = context.params;
  if (!slug || !Array.isArray(slug)) {
    return new NextResponse('Bad Request', { status: 400 });
  }

  const [username, type] = slug;

  let service = getUserPosts;
  if (type === 'likes') {
    service = getUserLikes;
  } else if (type === 'bookmarks') {
    service = getUserBookmarks;
  }

  return service(username).then((data) => NextResponse.json(data));
}
