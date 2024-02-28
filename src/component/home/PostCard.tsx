'use client';

import { Post } from '@/models/post';
import Image from 'next/image';
import Avatar from '../ui/Avatar';
import CommentForm from './CommentForm';
import { format } from 'timeago.js';
import { register } from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko';
import ActionBar from './ActionBar';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import ModalPostCard from './PostDetailModal';
import PostUserAvater from '../ui/PostUserAvatar';
import PostPublished from '../ui/PostPublished';

type Props = {
  post: Post;
  priority?: boolean;
};

export default function HomePostCard({ post, priority = false }: Props) {
  register('ko', koLocale);
  const { id, imageUrl, likes, comments, username, image, text, publishedAt } =
    post;

  const [showModal, setShowModal] = useState(false);
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <article className='flex flex-col gap-5 px-1 pb-5 border-b'>
      <PostUserAvater
        image={image}
        username={username}
        className='hidden md:flex'
      >
        · <PostPublished date={publishedAt} />
      </PostUserAvater>
      <Image
        className='object-cover w-full aspect-square'
        src={imageUrl}
        width={475}
        height={475}
        alt={text}
        priority={priority}
        onClick={handleOpen}
      />
      <section className='flex flex-col gap-1.5'>
        <ActionBar likes={likes} text={text} username={username} />
        {comments > 1 && (
          <button className='text-gray-500' onClick={handleOpen}>
            댓글 {comments - 1}개 모두 보기
          </button>
        )}
      </section>
      <section>
        <CommentForm />
      </section>
      {showModal &&
        createPortal(
          <ModalPostCard post={post} onClose={handleClose} />,
          document.body
        )}
    </article>
  );
}