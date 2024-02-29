'use client';

import { Post, UserpagePostType } from '@/models/post';
import UserpagePostCard from './UserpagePostCard';
import UserpageMenu from './UserpageMenu';
import { useState } from 'react';
import useSWR from 'swr';
import SyncSpinner from '../ui/SyncSpinner';

type Props = {
  username: string;
};

export default function UserpagePostGrid({ username }: Props) {
  const [type, setType] = useState<UserpagePostType>('posts');
  const { data: posts, isLoading: loading } = useSWR<Post[]>(
    `/api/users/${username}/${type}`
  );

  return (
    <>
      <UserpageMenu type={type} setType={setType} />
      {loading ? (
        <div className='flex items-center justify-center m-10'>
          <SyncSpinner />
        </div>
      ) : (
        (!posts || posts.length === 0) && (
          <div className='flex items-center justify-center m-10'>
            <p>게시물이 없습니다.</p>
          </div>
        )
      )}
      {posts && (
        <div className='grid grid-cols-3 gap-2 my-5'>
          {posts.map((post: Post, index: number) => (
            <UserpagePostCard key={post.id} post={post} priority={index <= 6} />
          ))}
        </div>
      )}
    </>
  );
}
