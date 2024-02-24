import { BookmarkIcon, LikeIcon } from '../ui/icons';

type Props = {
  likes: string[];
  username: string;
  text: string;
  comments: number;
};

export default function ActionBar({ likes, username, text, comments }: Props) {
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
      {comments > 1 && (
        <p className='text-gray-500'>댓글 {comments - 1}개 모두 보기</p>
      )}
    </>
  );
}
