'use client';

import { ProfileUser, SimpleUser } from '@/models/user';
import DPButton from '../ui/DPButton';
import useUser from '@/hooks/useUser';

type Props = {
  user: ProfileUser;
};

export default function FollowButton({ user: { username, id } }: Props) {
  const { user, toggleFollow } = useUser();

  const isShow = user && user.username !== username;
  const isFollowing =
    user &&
    user.following.find(
      (followingUser: SimpleUser) => followingUser.username === username
    );
  console.log(user);
  const handleFollow = () => {
    user && toggleFollow(id, !isFollowing);
  };

  return (
    <>
      {isShow && (
        <DPButton onClick={handleFollow} color={isFollowing && 'danger'}>
          {isFollowing ? 'Unfollow' : 'Follow'}
        </DPButton>
      )}
    </>
  );
}
