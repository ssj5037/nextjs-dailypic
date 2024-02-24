import FollowingBar from '@/component/home/FollowingBar';
import PostList from '@/component/home/PostList';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import SideBar from '@/component/home/SideBar';

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect('/auth/signin');
  }

  return (
    <>
      <section className='max-w-2xl md:w-[42rem] w-full'>
        <FollowingBar />
        <PostList />
      </section>
      <section className='flex-col hidden pl-16 w-80 lg:flex'>
        <SideBar user={user} />
      </section>
    </>
  );
}
