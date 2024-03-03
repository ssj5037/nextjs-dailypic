'use client';

import PostCard from './PostCard';
import SyncSpinner from '../ui/SyncSpinner';
import usePosts from '@/hooks/usePosts';

export default function PostList() {
  const { posts, isLoading: loading, error } = usePosts();
  return (
    <div className='flex flex-col items-center justify-center gap-5'>
      {loading ? (
        <SyncSpinner />
      ) : (
        (!posts || posts.length === 0) && (
          <p>{`피드가 비었습니다. 더 많은 사람들을 팔로우하러 가 볼까요?`}</p>
        )
      )}

      {posts?.map((post, index) => (
        <PostCard key={post.id} post={post} priority={index < 2} />
      ))}
    </div>
  );
}
