'use client';

import { Post } from '@/models/post';
import useSWR from 'swr';
import HomePostCard from './HomePostCard';
import { SyncLoader } from 'react-spinners';

export default function PostList() {
  const {
    data: posts,
    isLoading: loading,
    error,
  } = useSWR<Post[]>('/api/posts');
  return (
    <div className='flex justify-center items-center flex-col gap-5'>
      {loading ? (
        <SyncLoader color='red' size={8} speedMultiplier={0.7} />
      ) : (
        (!posts || posts.length === 0) && (
          <p>{`피드가 비었습니다.더 많은 사람들을 팔로우하러 가 볼까요?`}</p>
        )
      )}

      {posts?.map((post) => <HomePostCard key={post.id} post={post} />)}
    </div>
  );
}
