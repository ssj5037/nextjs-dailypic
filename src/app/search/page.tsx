'use client';

import UserList from '@/component/search/UserList';
import useDebounce from '@/hooks/useDebounce';
import { Metadata } from 'next';
import { useState } from 'react';

export const metadata: Metadata = {
  title: '사용자 검색',
  description: '팔로잉할 사용자를 검색하세요.',
};

export default function SearchPage() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 1000);

  return (
    <div className='flex flex-col w-1/2 max-w-xl gap-10 min-w-96'>
      <input
        type='text'
        autoFocus
        placeholder='사용자의 아이디 혹은 이름으로 검색해보세요.'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='p-2 border outline-none'
      />
      <UserList search={debouncedSearch} />
    </div>
  );
}
