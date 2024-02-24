import { Post } from '@/models/post';
import Image from 'next/image';
import Avatar from '../ui/Avatar';
import AddComment from './AddComment';
import { BookmarkIcon, LikeIcon } from '../ui/icons';
import { format } from 'timeago.js';
import { register } from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko';

type Props = {
  post: Post;
};

export default function HomePostCard({ post }: Props) {
  const { imageUrl, likes, comments, username, image, text, publishedAt } =
    post;

  register('ko', koLocale);
  return (
    <article className='flex flex-col gap-5 border-b pb-5 px-1'>
      <section className='flex items-center gap-2'>
        <Avatar image={image} highlight />
        <span>{username}</span>·
        <span className='text-sm text-gray-500'>
          {format(publishedAt, 'ko')}
        </span>
      </section>
      <Image src={imageUrl} width={475} height={475} alt={text} />
      <section className='flex flex-col gap-1.5'>
        <p className='flex justify-between text-2xl'>
          <LikeIcon />
          <BookmarkIcon />
        </p>
        <p className='font-semibold'>좋아요 {likes?.length || 0}개</p>
        <p>
          <span className='font-semibold'>{username}</span> {text}
        </p>
        <p className='text-gray-500'>댓글 {comments}개 모두 보기</p>
      </section>
      <section>
        <AddComment />
      </section>
    </article>
  );
}
