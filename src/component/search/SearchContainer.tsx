'use client';
import UserList from '@/component/search/UserList';
import useDebounce from '@/hooks/useDebounce';
import { useState } from 'react';

export default function SearchContainer() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 1000);
  return (
    <>
      <input
        type='text'
        autoFocus
        placeholder='사용자의 아이디 혹은 이름으로 검색해보세요.'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='p-2 border outline-none'
      />
      <UserList search={debouncedSearch} />
    </>
  );
}
