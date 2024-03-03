import { useState } from 'react';
import {
  BookmarkFillIcon,
  BookmarkIcon,
  LikeFillIcon,
  LikeIcon,
} from './icons';
import ToggleButton from './ToggleButton';
import { useSession } from 'next-auth/react';
import { Post } from '@/models/post';
import usePosts from '@/hooks/usePost';

type Props = {
  post: Post;
};

export default function ActionBar({ post }: Props) {
  const { likes, username, text } = post;
  const { data: session } = useSession();
  const user = session?.user;
  const liked = user ? likes.includes(user.username) : false;
  const [bookmarked, setBookmarked] = useState(false);
  const { setLike } = usePosts();
  const handleLike = (like: boolean) => {
    if (user) {
      setLike(post, user.username, like);
    }
  };
  return (
    <>
      <p className='flex justify-between text-2xl'>
        <ToggleButton
          toggled={liked}
          onToggled={handleLike}
          fillIcon={<LikeFillIcon />}
          icon={<LikeIcon />}
        />
        <ToggleButton
          toggled={bookmarked}
          onToggled={setBookmarked}
          fillIcon={<BookmarkFillIcon />}
          icon={<BookmarkIcon />}
        />
      </p>
      <p className='font-semibold'>좋아요 {likes?.length || 0}개</p>
      {text && (
        <p className='break-all whitespace-normal'>
          <span className='font-semibold'>{username}</span> {text}
        </p>
      )}
    </>
  );
}
