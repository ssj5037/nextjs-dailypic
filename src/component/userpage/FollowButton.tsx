'use client';

import { SimpleUser } from '@/models/user';
import DPButton from '../ui/DPButton';
import useUser from '@/hooks/useUser';

type Props = {
  username: string;
};

export default function FollowButton({ username }: Props) {
  const { user } = useUser();

  const isShow = user && user.username !== username;
  const isFollowing =
    user &&
    user.following.find(
      (followingUser: SimpleUser) => followingUser.username === username
    );

  const toggleClick = () => {};

  return (
    <>
      {isShow && !isFollowing ? (
        <DPButton onClick={toggleClick}>Follow</DPButton>
      ) : (
        <DPButton onClick={toggleClick} color='danger'>
          Unfollow
        </DPButton>
      )}
    </>
  );
}
