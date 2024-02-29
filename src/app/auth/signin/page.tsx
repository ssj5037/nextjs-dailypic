import { getProviders } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOption';
import ProviderLoginButton from './component/ProviderLoginButton';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '로그인',
  description: 'DailyPic에 로그인/회원가입 하세요.',
};

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
    <div className='flex justify-center h-full'>
      <div className='flex items-center'>
        <div className='flex flex-col items-center gap-3 p-5 border border-orange-500 rounded'>
          <h2 className='p-5 text-xl font-semibold'>Sign In to DailyPic</h2>
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
