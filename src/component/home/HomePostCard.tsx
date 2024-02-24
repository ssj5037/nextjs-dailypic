import { Post } from '@/models/post';
import Image from 'next/image';
import Avatar from '../ui/Avatar';
import CommentForm from './CommentForm';
import { format } from 'timeago.js';
import { register } from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko';
import ActionBar from './ActionBar';

type Props = {
  post: Post;
  priority?: boolean;
};

export default function HomePostCard({ post, priority = false }: Props) {
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
      <Image
        className='aspect-square object-cover w-full'
        src={imageUrl}
        width={475}
        height={475}
        alt={text}
        priority={priority}
      />
      <section className='flex flex-col gap-1.5'>
        <ActionBar
          likes={likes}
          text={text}
          comments={comments}
          username={username}
        />
      </section>
      <section>
        <CommentForm />
      </section>
    </article>
  );
}
