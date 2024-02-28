import { UserProfile } from '@/models/user';
import Avatar from '../ui/Avatar';
import Link from 'next/link';

type Props = {
  user: UserProfile;
};
export default function UserCard({
  user: { username, name, image, following, followers },
}: Props) {
  return (
    <Link href={`/${username}`} className='w-full hover:bg-neutral-50'>
      <section className='flex items-center gap-5 px-5 py-2 border'>
        <Avatar image={image} size='large' />
        <div className='flex flex-col justify-center'>
          <p className='font-bold'>{username}</p>
          <p className='text-sm text-gray-700'>{name}</p>
          <p className='text-sm text-gray-500'>
            팔로워 {followers}명 · 팔로잉 {following}명
          </p>
        </div>
      </section>
    </Link>
  );
}
