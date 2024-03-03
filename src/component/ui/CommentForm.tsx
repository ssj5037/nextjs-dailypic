'use client';

import { useState } from 'react';
import { SmileIcon } from './icons';

type Props = {
  onComment: (comment: string) => void;
};

export default function CommentForm({ onComment }: Props) {
  const [comment, setComment] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim().length) return;
    onComment(comment);
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
        required
      />
      <button className='disabled:opacity-50 ' disabled={comment.length === 0}>
        등록
      </button>
    </form>
  );
}
