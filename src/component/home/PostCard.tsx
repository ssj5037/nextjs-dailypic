'use client';

import { Post } from '@/models/post';
import Image from 'next/image';
import CommentForm from '../ui/CommentForm';
import ActionBar from '../ui/ActionBar';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import ModalPostCard from '../ui/PostDetailModal';
import PostUserAvater from '../ui/PostUserAvatar';
import PostPublished from '../ui/PostPublished';
import usePosts from '@/hooks/usePosts';

type Props = {
  post: Post;
  priority?: boolean;
};

export default function HomePostCard({ post, priority = false }: Props) {
  const { imageUrl, comments, username, image, text, publishedAt } = post;

  const [showModal, setShowModal] = useState(false);
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const { addComment } = usePosts();

  const handleComment = (comment: string) => {
    addComment(post, comment);
  };
  return (
    <article className='flex flex-col gap-5 px-1 pb-5 border-b max-w-[475px]'>
      <PostUserAvater image={image} username={username} className='flex'>
        · <PostPublished date={publishedAt} />
      </PostUserAvater>
      <Image
        className='object-cover aspect-square'
        src={imageUrl}
        width={475}
        height={475}
        alt={text}
        priority={priority}
        onClick={handleOpen}
      />
      <section className='flex flex-col gap-1.5'>
        <ActionBar post={post} />
        <p className='break-all whitespace-normal'>
          <span className='font-semibold'>{username}</span> {text}
        </p>
        {comments > 1 && (
          <button className='text-gray-500 text-left' onClick={handleOpen}>
            댓글 {comments - 1}개 모두 보기
          </button>
        )}
      </section>
      <section>
        <CommentForm onComment={handleComment} />
      </section>
      {showModal &&
        createPortal(
          <ModalPostCard post={post} onClose={handleClose} />,
          document.body
        )}
    </article>
  );
}
