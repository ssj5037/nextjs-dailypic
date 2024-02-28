'use client';

import UserList from '@/component/search/UserList';
import useDebounce from '@/hooks/useDebounce';
import { useState } from 'react';

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
