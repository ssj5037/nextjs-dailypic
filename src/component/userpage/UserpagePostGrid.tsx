import { Post } from '@/models/post';
import UserpagePostCard from './UserpagePostCard';
import SyncSpinner from '../ui/SyncSpinner';
import usePosts from '@/hooks/usePosts';

export default function UserpagePostGrid() {
  const { posts, isLoading: loading } = usePosts();

  return (
    <>
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
