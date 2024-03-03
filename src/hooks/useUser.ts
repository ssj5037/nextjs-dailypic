import { HomeUser } from '@/models/user';
import useSWR from 'swr';

async function updateBookmark(id: string, bookmark: boolean) {
  return fetch('api/me/bookmark', {
    method: 'PUT',
    body: JSON.stringify({ id, bookmark }),
  }).then((res) => res.json());
}

export default function useUser() {
  const { data: user, isLoading, error, mutate } = useSWR<HomeUser>('api/me');

  function setBookmark(user: HomeUser, postId: string, bookmark: boolean) {
    const newUser = {
      ...user,
      bookmarks: bookmark
        ? [...user.bookmarks, postId]
        : user.bookmarks.filter((b) => b !== postId),
    };

    return mutate(updateBookmark(postId, bookmark), {
      optimisticData: newUser,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  }
  return { user, isLoading, error, setBookmark };
}
