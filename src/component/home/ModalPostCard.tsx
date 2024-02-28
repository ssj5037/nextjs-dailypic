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
  onClose: () => void;
};

export default function ModalPostCard({ post, onClose }: Props) {
  const { imageUrl, likes, comments, username, image, text, publishedAt } =
    post;

  register('ko', koLocale);
  return (
    <div className='absolute w-full'>
      <div
        className='absolute bg-black opacity-20 w-screen h-screen z-10'
        onClick={onClose}
      ></div>

      <div className='absolute flex top-1/2 right-1/2 translate-x-1/2 translate-y-1/2 bg-white w-3/4 z-20'>
        <Image
          className='aspect-square object-cover w-full basis-1'
          src={imageUrl}
          width={475}
          height={475}
          alt={text}
        />
        <article className='flex flex-col gap-5 border-b pb-5 px-1 basis-1'>
          <button onClick={onClose}>close</button>
          <section className='flex items-center gap-2'>
            <Avatar image={image} highlight />
            <span>{username}</span>·
            <span className='text-sm text-gray-500'>
              {format(publishedAt, 'ko')}
            </span>
          </section>
          <section className='flex flex-col gap-1.5'>
            <ActionBar likes={likes} text={text} username={username} />
          </section>
          <section>
            <CommentForm />
          </section>
        </article>
      </div>
    </div>
  );
}
