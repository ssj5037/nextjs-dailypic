'use client';

import { UserpagePostType } from '@/models/post';
import UserpageMenu from './UserpageMenu';
import { useState } from 'react';
import { CacheKeysContext } from '@/context/CacheKeysContext';
import UserpagePostGrid from './UserpagePostGrid';

type Props = {
  username: string;
};

export default function UserpagePosts({ username }: Props) {
  const [type, setType] = useState<UserpagePostType>('posts');

  return (
    <>
      <UserpageMenu type={type} setType={setType} />
      <CacheKeysContext.Provider
        value={{ postsKey: `/api/users/${username}/${type}` }}
      >
        <UserpagePostGrid />
      </CacheKeysContext.Provider>
    </>
  );
}
