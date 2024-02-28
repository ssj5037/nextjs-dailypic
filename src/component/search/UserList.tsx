'use client';

import useSWR from 'swr';
import UserCard from './UserCard';
import { UserProfile } from '@/models/user';
import SyncSpinner from '../ui/SyncSpinner';

type Props = {
  search: string;
};

export default function UserList({ search = '' }: Props) {
  const { data: users, isLoading: loading } = useSWR<UserProfile[]>(
    '/api/users?search=' + search
  );
  return (
    <div className='flex flex-col items-center gap-3'>
      {loading ? (
        <SyncSpinner />
      ) : (
        (!users || users.length === 0) && (
          <p className='text-gray-500'>일치하는 사용자가 없습니다.</p>
        )
      )}
      {users &&
        users.map((user: UserProfile) => (
          <UserCard user={user} key={user.id} />
        ))}
    </div>
  );
}
