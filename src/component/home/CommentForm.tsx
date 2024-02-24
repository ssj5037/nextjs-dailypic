'use client';

import { useState } from 'react';
import { SmileIcon } from '../ui/icons';

export default function CommentForm() {
  const [comment, setComment] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(comment);
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
