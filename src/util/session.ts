import { authOptions } from '@/app/api/auth/[...nextauth]/authOption';
import { AuthUser } from '@/models/user';
import { getServerSession } from 'next-auth';

export async function checkSessionUser(
  handler: (user: AuthUser) => Promise<Response>
): Promise<Response> {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    // 401 : unauthorized
    return new Response('Authentication Error', { status: 401 });
  }
  return handler(user);
}
