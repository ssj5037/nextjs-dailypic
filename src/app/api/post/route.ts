import { NextResponse } from 'next/server';
import { getPost } from '@/service/posts';
const url = require('url');
const querystring = require('querystring');

export async function GET(req: Request) {
  const parsedUrl = url.parse(req.url);
  const query = querystring.parse(parsedUrl.query);

  if (!query) {
    return new Response('no params', { status: 401 });
  }
  return getPost(query.id).then((data) => NextResponse.json(data[0]));
}
