'use client';
import DPButton from '@/component/ui/DPButton';
import { ClientSafeProvider, signIn } from 'next-auth/react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

export default function ProviderLoginButton({
  provider,
  callbackUrl,
}: {
  provider: ClientSafeProvider;
  callbackUrl: string;
}) {
  return (
    <DPButton
      title={
        provider.id === 'github'
          ? '깃허브 소셜 로그인'
          : provider.id === 'google'
            ? '구글 소셜 로그인'
            : '기타 소셜 로그인'
      }
      onClick={() => signIn(provider.id, { callbackUrl })}
      className='flex items-center gap-3 px-4'
    >
      {provider.id === 'github' && <FaGithub className='text-xl' />}
      {provider.id === 'google' && <FcGoogle className='text-xl' />}
      Sign in with {provider.name}
    </DPButton>
  );
}
