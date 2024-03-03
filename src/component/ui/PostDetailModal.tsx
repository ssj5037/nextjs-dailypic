'use client';

import { FullPost, Post } from '@/models/post';
import Image from 'next/image';
import Avatar from './Avatar';
import CommentForm from '../home/CommentForm';
import ActionBar from './ActionBar';
import { CloseIcon } from './icons';
import useSWR from 'swr';
import PostUserAvater from './PostUserAvatar';
import PostPublished from './PostPublished';
import Link from 'next/link';

type Props = {
  post: Post;
  onClose: () => void;
};

export default function ModalPostCard({ post, onClose }: Props) {
  const { id, imageUrl, username, image, text, publishedAt } = post;
  const { data } = useSWR<FullPost>('/api/posts/' + id);

  return (
    <div
      className='fixed z-40 flex items-center justify-center w-screen h-screen bg-black/50'
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <button
        type='button'
        className='fixed z-50 text-3xl text-white top-5 right-8'
        onClick={onClose}
      >
        <CloseIcon />
      </button>

      <div className='flex flex-col justify-center w-4/5 m-10 overflow-hidden rounded-md z-500 h-3/4 md:flex-row'>
        <PostUserAvater
          image={image}
          username={username}
          className='flex p-4 bg-white md:hidden'
        />
        <div className='relative basis-4/5 md:basis-3/5 bg-black/70'>
          <Image
            className='object-cover w-full md:object-contain aspect-square'
            src={imageUrl}
            priority
            fill
            sizes='650px'
            alt={text}
          />
        </div>
        <article className='flex flex-col border-b min-w-[25rem] w-full basis-1/5 md:basis-2/5 bg-white '>
          <PostUserAvater
            image={image}
            username={username}
            className='hidden p-4 md:flex'
          />
          <section className='flex-col hidden gap-5 p-4 overflow-auto border-t border-b grow md:flex'>
            {data?.comments &&
              data.comments.map(
                ({ username: commentUser, image, comment }, index) => (
                  <div key={index} className='flex gap-3'>
                    <Link href={`/${commentUser}`} className='shrink'>
                      <Avatar image={image} />
                    </Link>
                    <p className='flex flex-col gap-2 text-sm'>
                      <span className='font-semibold'>{commentUser}</span>
                      <span className='break-all whitespace-normal'>
                        {comment}
                      </span>
                    </p>
                  </div>
                )
              )}
          </section>
          <section className='flex flex-col gap-1.5 px-4 pt-5'>
            <ActionBar post={post} />
            <PostPublished date={publishedAt} />
          </section>
          <section className='hidden p-4 md:block'>
            <CommentForm />
          </section>
        </article>
      </div>
    </div>
  );
}
