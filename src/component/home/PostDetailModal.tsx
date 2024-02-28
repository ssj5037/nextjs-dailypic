'use client';

import { FullPost, Post } from '@/models/post';
import Image from 'next/image';
import Avatar from '../ui/Avatar';
import CommentForm from './CommentForm';
import ActionBar from './ActionBar';
import { CloseIcon } from '../ui/icons';
import useSWR from 'swr';
import PostUserAvater from '../ui/PostUserAvatar';
import PostPublished from '../ui/PostPublished';

type Props = {
  post: Post;
  onClose: () => void;
};

export default function ModalPostCard({ post, onClose }: Props) {
  const { id, imageUrl, likes, username, image, text, publishedAt } = post;
  const { data } = useSWR<FullPost>('/api/posts/' + id);

  return (
    <div
      className='fixed z-10 flex items-center justify-center w-screen h-screen bg-black/50'
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <button
        type='button'
        className='fixed z-20 text-3xl text-white top-5 right-8'
        onClick={onClose}
      >
        <CloseIcon />
      </button>

      <div className='z-20 flex flex-col justify-center w-4/5 m-10 overflow-hidden rounded-md h-3/4 md:flex-row'>
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
          <section className='hidden p-4 overflow-auto border-t border-b grow md:block'>
            {data?.comments &&
              data.comments.map(
                ({ username: commentUser, image, comment }, index) => (
                  <div key={index} className='flex items-center gap-3'>
                    <Avatar image={image} />
                    <p className='flex gap-2 text-sm'>
                      <span className='font-semibold'>{commentUser}</span>
                      <span>{comment}</span>
                    </p>
                  </div>
                )
              )}
          </section>
          <section className='flex flex-col gap-1.5 px-4 pt-5'>
            <ActionBar likes={likes} username={username} />
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
