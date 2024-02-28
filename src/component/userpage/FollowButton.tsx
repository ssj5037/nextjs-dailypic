'use client';

import { HomeUser, ProfileUser, SimpleUser } from '@/models/user';
import DPButton from '../ui/DPButton';
import useSWR from 'swr';

type Props = {
  username: string;
};

export default function FollowButton({ username }: Props) {
  const { data: loggedUser } = useSWR<HomeUser>('/api/me');

  const isShow = loggedUser && loggedUser.username !== username;
  const isFollowing =
    loggedUser &&
    loggedUser.following.find(
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
