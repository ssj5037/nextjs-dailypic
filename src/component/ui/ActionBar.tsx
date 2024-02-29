import { useState } from 'react';
import {
  BookmarkFillIcon,
  BookmarkIcon,
  LikeFillIcon,
  LikeIcon,
} from './icons';
import ToggleButton from './ToggleButton';

type Props = {
  id: string;
  likes: string[];
  username: string;
  text?: string;
};

export default function ActionBar({ id, likes, username, text }: Props) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  return (
    <>
      <p className='flex justify-between text-2xl'>
        <ToggleButton
          toggled={liked}
          onToggled={setLiked}
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
