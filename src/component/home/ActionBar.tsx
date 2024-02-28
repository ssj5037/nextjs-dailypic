import { BookmarkIcon, LikeIcon } from '../ui/icons';

type Props = {
  likes: string[];
  username: string;
  text: string;
};

export default function ActionBar({ likes, username, text }: Props) {
  return (
    <>
      <p className='flex justify-between text-2xl'>
        <LikeIcon />
        <BookmarkIcon />
      </p>
      <p className='font-semibold'>좋아요 {likes?.length || 0}개</p>
      <p>
        <span className='font-semibold'>{username}</span> {text}
      </p>
    </>
  );
}
