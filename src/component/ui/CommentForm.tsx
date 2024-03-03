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
    if (!comment.trim().length) return;
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
      <button
        className='disabled:opacity-50 disabled:bg-gray-100'
        disabled={comment.length === 0}
      >
        등록
      </button>
    </form>
  );
}
