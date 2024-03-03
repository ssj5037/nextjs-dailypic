import { Comment, FullPost } from '@/models/post';
import useSWR, { useSWRConfig } from 'swr';

async function createComment(id: string, comment: string) {
  return fetch('api/posts/comment', {
    method: 'POST',
    body: JSON.stringify({ id, comment }),
  }).then((res) => res.json());
}

export default function useFullPost(postId: string) {
  const {
    data: post,
    isLoading,
    error,
    mutate,
  } = useSWR<FullPost>(`/api/posts/${postId}`);
  const { mutate: globalMutate } = useSWRConfig();

  const addComment = (comment: Comment) => {
    if (!post) return;
    const newPost: FullPost = {
      ...post,
      comments: [...post.comments, comment],
    };
    return mutate(createComment(post.id, comment.comment), {
      optimisticData: newPost,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    }).then(() => globalMutate('api/posts'));
  };
  return { post, isLoading, error, addComment };
}
