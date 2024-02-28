'use client';

import { FullPost } from '@/models/post';
import Image from 'next/image';
import Avatar from '../ui/Avatar';
import CommentForm from './CommentForm';
import { format } from 'timeago.js';
import { register } from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko';
import ActionBar from './ActionBar';
import { CloseIcon } from '../ui/icons';
import useSWR from 'swr';

type Props = {
  id: string;
  onClose: () => void;
};

export default function ModalPostCard({ id, onClose }: Props) {
  const { data: post } = useSWR<FullPost>('/api/post?id=' + id);
  console.log(post);
  if (!post) return null;
  const { imageUrl, likes, comments, username, image, text, publishedAt } =
    post;

  register('ko', koLocale);
  return (
    <div className='absolute w-full'>
      <div
        className='absolute z-10 w-screen h-screen bg-black opacity-20'
        onClick={onClose}
      ></div>
      <button
        className='absolute z-20 text-3xl text-black top-5 right-8'
        onClick={onClose}
      >
        <CloseIcon />
      </button>

      <div className='absolute flex justify-center flex-col md:flex-row top-1/2 right-1/2 translate-x-1/2 translate-y-1/4 md:translate-y-1/2 w-[25rem] md:w-[50rem] bg-white z-20 rounded-md overflow-hidden'>
        <Image
          className='aspect-square object-cover basis-1 max-w-[25rem]'
          src={imageUrl}
          width={900}
          height={900}
          alt={text}
        />
        <article className='flex flex-col gap-5 border-b basis-1 min-w-[25rem] w-full p-4'>
          <section className='items-center hidden gap-2 md:flex'>
            <Avatar image={image} highlight />
            <span className='font-semibold'>{username}</span>
          </section>
          <section className='hidden overflow-auto grow md:block'>
            {comments &&
              comments.map(({ username, image, comment }, index) => (
                <div key={index} className='flex items-center gap-3'>
                  <Avatar image={image} />
                  <p className='flex gap-2 text-sm'>
                    <span className='font-semibold'>{username}</span>
                    <span>{comment}</span>
                  </p>
                </div>
              ))}
          </section>
          <section className='flex flex-col gap-1.5'>
            <ActionBar likes={likes} username={username} />
            <span className='text-xs text-gray-500'>
              {format(publishedAt, 'ko')}
            </span>
          </section>
          <section className='hidden md:block'>
            <CommentForm />
          </section>
        </article>
      </div>
    </div>
  );
}
