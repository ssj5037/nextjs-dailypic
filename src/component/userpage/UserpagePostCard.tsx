'use client';

import { Post } from '@/models/post';
import Image from 'next/image';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import ModalPostCard from '../home/PostDetailModal';

type Props = {
  post: Post;
  priority?: boolean;
};

export default function UserpagePostCard({ post, priority = false }: Props) {
  const { imageUrl, likes, comments, text } = post;
  const [showModal, setShowModal] = useState(false);
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  return (
    <div>
      <div className='relative cursor-pointer group' onClick={handleOpen}>
        <Image
          className='object-cover aspect-square'
          src={imageUrl}
          width={500}
          height={500}
          alt={text}
          priority={priority}
        ></Image>
        <p className='absolute top-0 left-0 z-10 items-center justify-center hidden w-full h-full gap-5 font-semibold text-white group-hover:flex bg-black/40'>
          <span>좋아요 {likes.length}</span>
          <span>게시물 {comments}</span>
        </p>
      </div>
      {showModal &&
        createPortal(
          <ModalPostCard post={post} onClose={handleClose} />,
          document.body
        )}
    </div>
  );
}
