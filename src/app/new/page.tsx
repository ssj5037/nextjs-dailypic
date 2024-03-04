import ContentForm from '@/component/new/ContentForm';
import Avatar from '@/component/ui/Avatar';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/authOption';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '새 포스트 작성',
  description: 'DailyPic에서 당신의 이야기를 전달합니다.',
};

export default async function NewPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect('/auth/signin');
  }

  return (
    <div className='flex flex-col gap-5 items-center w-full md:w-[42rem] mt-5 h-full'>
      <Avatar highlight size='large' image={user.image} />
      <ContentForm />
    </div>
  );
}
