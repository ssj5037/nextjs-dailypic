import UserpageHeader from '@/component/userpage/UserpageHeader';
import { ProfileUser } from '@/models/user';
import { getUserProfile } from '@/service/user';
import { notFound } from 'next/navigation';

export default async function UserPage({
  params: { username },
}: {
  params: { username: string };
}) {
  const user: ProfileUser = await getUserProfile(username);

  if (!user) {
    notFound();
  }
  return (
    <div className='w-full max-w-5xl'>
      <UserpageHeader user={user} />
    </div>
  );
}
