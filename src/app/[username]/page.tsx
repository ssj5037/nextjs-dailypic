import UserpageHeader from '@/component/userpage/UserpageHeader';
import UserpagePostGrid from '@/component/userpage/UserpagePostGrid';
import { ProfileUser } from '@/models/user';
import { getUserProfile } from '@/service/user';
import { notFound, redirect } from 'next/navigation';
import { cache } from 'react';

type Props = {
  params: { username: string };
};

const getUser = cache(async (username: string) => getUserProfile(username));

export default async function UserpageLayout({ params: { username } }: Props) {
  if (!username) {
    redirect('/');
  }
  const user: ProfileUser = await getUser(username);

  if (!user) {
    notFound();
  }
  return (
    <div className='w-full max-w-5xl md:p-2'>
      <UserpageHeader user={user} />
      <UserpagePostGrid username={username} />
    </div>
  );
}

export async function generateMetadata({ params: { username } }: Props) {
  const user = await getUser(username);
  return {
    title: `${user?.name} (@${user.username}) - DailyPic`,
    description: `${user.name}의 DailyPic 입니다.`,
  };
}
