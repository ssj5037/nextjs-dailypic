import { getProviders } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import ProviderLoginButton from './component/ProviderLoginButton';
import { redirect } from 'next/navigation';

export default async function SignInPage({
  searchParams: { callbackUrl },
}: {
  searchParams: { callbackUrl: string };
}) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }

  const providers = await getProviders();
  return (
    <div className='flex h-full justify-center'>
      <div className='flex items-center'>
        <div className='border p-5 flex flex-col items-center gap-3 rounded border-orange-500'>
          <h2 className='text-xl font-semibold p-5'>Sign In to DailyPic</h2>
          {providers &&
            Object.values(providers).map((provider) => (
              <ProviderLoginButton
                key={provider.name}
                provider={provider}
                callbackUrl={callbackUrl ?? '/'}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
