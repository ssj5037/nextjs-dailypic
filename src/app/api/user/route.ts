import { NextResponse } from 'next/server';
import { getUserProfile } from '@/service/user';
const url = require('url');
const querystring = require('querystring');

export async function GET(req: Request) {
  const parsedUrl = url.parse(req.url);
  const query = querystring.parse(parsedUrl.query);

  console.log(req.url);
  console.log(query);
  return getUserProfile(query.username).then((data) => data.json());
}
