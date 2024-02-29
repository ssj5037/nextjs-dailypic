import UserpageHeader from '@/component/userpage/UserpageHeader';
import UserpagePostGrid from '@/component/userpage/UserpagePostGrid';
import { ProfileUser } from '@/models/user';
import { getUserProfile } from '@/service/user';
import { notFound, redirect } from 'next/navigation';

type Props = {
  params: { username: string };
};

export default async function UserpageLayout({ params: { username } }: Props) {
  if (!username) {
    redirect('/');
  }
  const user: ProfileUser = await getUserProfile(username);

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
