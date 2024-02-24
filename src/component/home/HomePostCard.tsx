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
  const { imageUrl, like, comments, author, publishedAt } = post;
  const {
    comment: postComment,
    author: { username: postUser },
  } = comments[0];

  register('ko', koLocale);
  return (
    <article className='flex flex-col gap-5 border-b pb-5 px-1'>
      <section className='flex items-center gap-2'>
        <Avatar image={author.image} highlight />
        <span>{author.username}</span>·
        <span className='text-sm text-gray-500'>
          {format(publishedAt, 'ko')}
        </span>
      </section>
      <Image src={imageUrl} width={475} height={475} alt={postComment} />
      <section className='flex flex-col gap-1.5'>
        <p className='flex justify-between text-2xl'>
          <LikeIcon />
          <BookmarkIcon />
        </p>
        <p className='font-semibold'>좋아요 {like?.length || 0}개</p>
        <p>
          <span className='font-semibold'>{postUser}</span> {postComment}
        </p>
        <p></p>
      </section>
      <section>
        <AddComment />
      </section>
    </article>
  );
}
