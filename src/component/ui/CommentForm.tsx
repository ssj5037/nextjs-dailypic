'use client';

import { useState } from 'react';
import { SmileIcon } from './icons';
import usePosts from '@/hooks/usePost';
import { Post } from '@/models/post';

export default function CommentForm({ post }: { post: Post }) {
  const [comment, setComment] = useState('');
  const { addComment } = usePosts();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addComment(post, comment);
    setComment('');
  };

  return (
    <form action='' className='flex gap-3' onSubmit={handleSubmit}>
      <span className='text-2xl'>
        <SmileIcon />
      </span>
      <input
        className='grow outline-none'
        type='text'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder='댓글 달기...'
      />
      <button>등록</button>
    </form>
  );
}
