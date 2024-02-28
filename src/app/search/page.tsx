'use client';

import UserList from '@/component/search/UserList';
import { useState } from 'react';

export default function SearchPage() {
  const [search, setSearch] = useState('');

  return (
    <div>
      <input
        type='text'
        placeholder='사용자의 아이디 혹은 이름으로 검색해보세요.'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='p-2 mb-10 border outline-none w-96'
      />
      <UserList search={search} />
    </div>
  );
}
