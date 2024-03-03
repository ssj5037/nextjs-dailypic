import { Post } from '@/models/post';
import useSWR from 'swr';

async function updateLike(id: string, like: boolean) {
  return fetch('api/posts/like', {
    method: 'PUT',
    body: JSON.stringify({ id, like }),
  }).then((res) => res.json());
}

async function createComment(id: string, comment: string) {
  return fetch('api/posts/comment', {
    method: 'POST',
    body: JSON.stringify({ id, comment }),
  }).then((res) => res.json());
}

export default function usePosts() {
  const {
    data: posts,
    isLoading,
    error,
    mutate,
  } = useSWR<Post[]>('/api/posts');

  const setLike = (post: Post, username: string, like: boolean) => {
    const newPost = {
      ...post,
      likes: like
        ? [...post.likes, username]
        : post.likes.filter((item) => item !== username),
    };
    const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

    // https://swr.vercel.app/ko/docs/mutation#api
    return mutate(updateLike(post.id, like), {
      optimisticData: newPosts,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };

  const addComment = (post: Post, comment: string) => {
    const newPost: Post = {
      ...post,
      comments: post.comments + 1,
    };
    const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

    return mutate(createComment(post.id, comment), {
      optimisticData: newPosts,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };
  return { posts, isLoading, error, setLike, addComment };
}
