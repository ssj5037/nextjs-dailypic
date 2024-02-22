'use client';

import { DetailUser } from '@/models/user';
import Link from 'next/link';
import { SyncLoader } from 'react-spinners';
import useSWR from 'swr';
import Avatar from './Avatar';
import ScrollableBar from './ui/ScrollableBar';

export default function FollowingBar() {
  // 1. 클라이언트 컴포넌트에서 백엔드에게 api/me 요청, 사용자의 정보를 얻어옴.
  // 2. 백엔드에서는 현재 로그인 된 사용자의 세션 정보를 이용해서
  // 3. 백엔드에서 사용자의 상세 정보를 Sanity에서 가지고 옴.
  // 4. 여기에서, 클라이언트 컴포넌트에서 floowings의 정보를 UI에 보여줌
  //    (image, username)
  const { data, isLoading: loading, error } = useSWR<DetailUser>('/api/me');
  // const users = data?.following;
  const users = data?.following && [
    ...data?.following,
    ...data?.following,
    ...data?.following,
  ];
  // const users = undefined;

  return (
    <section className='w-full flex justify-center items-center p-4 shadow-md shadow-neutral-300 mb-4 rounded-lg min-h-28 overflow-x-auto'>
      {loading ? (
        <SyncLoader color='red' size={8} speedMultiplier={0.7} />
      ) : (
        (!users || users.length === 0) && <p>{`팔로잉하는 유저가 없습니다.`}</p>
      )}
      {users && users.length > 0 && (
        <ScrollableBar>
          {users.map(({ image, username }) => (
            <Link
              key={username}
              href={`/${username}`}
              className='flex flex-col items-center w-20'
            >
              <Avatar size='large' image={image} highlight />
              <p className='w-full text-center text-sm text-ellipsis overflow-hidden'>
                {username}
              </p>
            </Link>
          ))}
        </ScrollableBar>
      )}
    </section>
  );
}
