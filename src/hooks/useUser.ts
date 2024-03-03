import { HomeUser, SimpleUser } from '@/models/user';
import { useCallback } from 'react';
import useSWR from 'swr';

async function updateBookmark(id: string, bookmark: boolean) {
  return fetch('api/me/bookmark', {
    method: 'PUT',
    body: JSON.stringify({ id, bookmark }),
  }).then((res) => res.json());
}

async function updateFollow(followingUserId: string, following: boolean) {
  return fetch('api/me/following', {
    method: 'PUT',
    body: JSON.stringify({ followingUserId, following }),
  }).then((res) => res.json());
}

export default function useUser() {
  const { data: user, isLoading, error, mutate } = useSWR<HomeUser>('api/me');

  const setBookmark = useCallback(
    (postId: string, bookmark: boolean) => {
      if (!user) return;

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
    },
    [user, mutate]
  );

  const toggleFollow = useCallback(
    (followingUserId: string, following: boolean) => {
      return mutate(updateFollow(followingUserId, following), {
        populateCache: false,
      });
    },
    [mutate]
  );

  return { user, isLoading, error, setBookmark, toggleFollow };
}
