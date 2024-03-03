'use client';
import Link from 'next/link';
import ScrollableBar from '@/component/ui/ScrollableBar';
import Avatar from '@/component/ui/Avatar';
import SyncSpinner from '../ui/SyncSpinner';
import useUser from '@/hooks/useUser';

export default function FollowingBar() {
  // 1. 클라이언트 컴포넌트에서 백엔드에게 api/me 요청, 사용자의 정보를 얻어옴.
  // 2. 백엔드에서는 현재 로그인 된 사용자의 세션 정보를 이용해서
  // 3. 백엔드에서 사용자의 상세 정보를 Sanity에서 가지고 옴.
  // 4. 여기에서, 클라이언트 컴포넌트에서 floowings의 정보를 UI에 보여줌
  //    (image, username)
  const { user, isLoading: loading, error } = useUser();
  // const users = data?.following;
  const users = user?.following;
  // const users = undefined;

  return (
    <section className='z-0 flex items-center justify-center w-full p-4 mb-4 overflow-x-auto min-h-28'>
      {loading ? (
        <SyncSpinner />
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
              <p className='w-full overflow-hidden text-sm text-center text-ellipsis'>
                {username}
              </p>
            </Link>
          ))}
        </ScrollableBar>
      )}
    </section>
  );
}
