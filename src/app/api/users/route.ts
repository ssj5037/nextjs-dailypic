import { NextResponse } from 'next/server';
import { getUsers } from '@/service/user';
const url = require('url');
const querystring = require('querystring');

export async function GET(req: Request) {
  const parsedUrl = url.parse(req.url);
  const query = querystring.parse(parsedUrl.query);

  return getUsers(query.search ?? '').then((data) => NextResponse.json(data));
}
