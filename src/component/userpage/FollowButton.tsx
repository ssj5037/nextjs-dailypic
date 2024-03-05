'use client';

import { ProfileUser, SimpleUser } from '@/models/user';
import DPButton from '../ui/DPButton';
import useUser from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { PulseLoader } from 'react-spinners';

type Props = {
  user: ProfileUser;
};

export default function FollowButton({ user: { username, id } }: Props) {
  const { user, toggleFollow } = useUser();

  // 관련 링크 : https://nextjs.org/docs/app/building-your-application/caching
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isUpdating = isPending || isFetching;

  const isShow = user && user.username !== username;
  const isFollowing =
    user &&
    user.following.find(
      (followingUser: SimpleUser) => followingUser.username === username
    );
  const handleFollow = async () => {
    setIsFetching(true);
    user && (await toggleFollow(id, !isFollowing));
    setIsFetching(false);
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <>
      {isShow && (
        <div className='relative'>
          {isUpdating && (
            <div className='absolute inset-0 flex items-center justify-center'>
              <PulseLoader size={6} />
            </div>
          )}
          <DPButton
            title={isFollowing ? '언팔로우' : '팔로우'}
            onClick={handleFollow}
            color={isFollowing && 'danger'}
            disabled={isUpdating}
          >
            {isFollowing ? 'Unfollow' : 'Follow'}
          </DPButton>
        </div>
      )}
    </>
  );
}
