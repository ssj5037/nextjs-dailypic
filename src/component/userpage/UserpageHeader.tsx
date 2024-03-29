import { ProfileUser } from '@/models/user';
import Avatar from '../ui/Avatar';
import FollowButton from './FollowButton';

type Props = {
  user: ProfileUser;
};
export default async function UserpageHeader({ user }: Props) {
  const { image, name, username, followers, following, posts } = user;
  return (
    <div className='flex flex-col items-center justify-center w-full gap-5 p-5 md:py-10 md:gap-16 md:flex-row'>
      <div className='hidden md:block'>
        <Avatar image={image} highlight size='xxLarge' />
      </div>
      <div className='block md:hidden'>
        <Avatar image={image} highlight size='xLarge' />
      </div>
      <div className='flex flex-col items-center gap-5 md:items-start'>
        <div className='flex items-center justify-center gap-5 md:justify-start basis-1/3'>
          <span className='text-2xl'>{username}</span>
          <FollowButton user={user} />
        </div>
        <div className='flex gap-10 basis-2/3'>
          <p>
            게시물 <span className='font-bold'>{posts}</span>
          </p>
          <p>
            팔로워 <span className='font-bold'>{followers}</span>
          </p>
          <p>
            팔로잉 <span className='font-bold'>{following}</span>
          </p>
        </div>
        <p className='font-semibold'>{name}</p>
      </div>
    </div>
  );
}
