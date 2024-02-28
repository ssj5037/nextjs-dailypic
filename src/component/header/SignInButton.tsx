'use client';

import { signIn, signOut } from 'next-auth/react';
import { AuthUser } from '@/models/user';
import DPButton from '@/component/ui/DPButton';
import { SignInIcon, SignOutIcon } from '@/component/ui/icons';

type Props = {
  user: AuthUser;
};

export default function SignIn({ user }: Props) {
  const handleAuth = () => {
    user ? signOut() : signIn();
  };
  return (
    <>
      <DPButton
        onClick={handleAuth}
        className='flex items-center justify-center w-full gap-2 p-2 font-semibold text-white transition-all bg-orange-400 rounded hover:bg-orange-300'
      >
        {user ? (
          <>
            <span className='hidden text-sm xl:block'>Sign Out</span>
            <span className='text-xl'>
              <SignOutIcon />
            </span>
          </>
        ) : (
          <>
            <span className='text-xl'>
              <SignInIcon />
            </span>
            <span className='hidden text-sm xl:block'>Sign In</span>
          </>
        )}
      </DPButton>
    </>
  );
}
