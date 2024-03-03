import {
  BookmarkFillIcon,
  BookmarkIcon,
  LikeFillIcon,
  LikeIcon,
} from './icons';
import ToggleButton from './ToggleButton';
import { Post } from '@/models/post';
import usePosts from '@/hooks/usePosts';
import useUser from '@/hooks/useUser';

type Props = {
  post: Post;
};

export default function ActionBar({ post }: Props) {
  const { id, likes } = post;
  const { setLike } = usePosts();
  const { user, setBookmark } = useUser();

  const liked = user ? likes.includes(user.username) : false;
  const bookmarked = user ? user.bookmarks.includes(id) : false;

  const handleLike = (like: boolean) => {
    user && setLike(post, user.username, like);
  };
  const handleBookmark = (bookmark: boolean) => {
    user && setBookmark(id, bookmark);
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
          onToggled={handleBookmark}
          fillIcon={<BookmarkFillIcon />}
          icon={<BookmarkIcon />}
        />
      </p>
      <p className='font-semibold'>좋아요 {likes?.length || 0}개</p>
    </>
  );
}
