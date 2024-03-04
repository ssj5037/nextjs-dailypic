'use client';

import { useRef, useState } from 'react';
import DPButton from '../ui/DPButton';
import { RiImageAddFill } from 'react-icons/ri';
import usePosts from '@/hooks/usePosts';
import Image from 'next/image';
import SyncSpinner from '../ui/SyncSpinner';
import { useRouter } from 'next/navigation';

export default function ContentForm() {
  const [onDrag, setOnDrag] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const textRef = useRef<HTMLTextAreaElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File>();
  const router = useRouter();

  const handleDragEnter = () => {
    setOnDrag(true);
  };
  const handleDragLeave = () => {
    setOnDrag(false);
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setOnDrag(true);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setOnDrag(false);
    const file = e.dataTransfer?.files;
    if (file && file[0]) {
      setImageFile(file[0]);
    }
  };
  const handleChange = () => {
    setOnDrag(false);
    const file = imageRef.current?.files;
    if (file && file[0]) {
      setImageFile(file[0]);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textRef.current || !imageFile) return;
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('text', textRef.current.value ?? '');
    setLoading(true);

    fetch('api/posts', {
      method: 'POST',
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          setError(`${res.status} ${res.statusText}`);
          return;
        }
        router.push('/');
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

  return (
    <div className='flex flex-col items-center w-full p-2'>
      {loading && (
        <div className='absolute inset-0 z-50 flex items-center justify-center w-full h-full bg-black/20'>
          <SyncSpinner />
        </div>
      )}
      {error && (
        <p className='w-full p-2 mb-5 font-bold text-center text-red-500 bg-red-50'>
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit} className='w-full'>
        <input
          id='imageInput'
          name='imageInput'
          type='file'
          accept='image/*'
          className='hidden'
          ref={imageRef}
          onChange={handleChange}
        />
        <label
          htmlFor='imageInput'
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {!imageFile ? (
            <div
              className={`flex flex-col items-center border-4 border-dashed w-full p-10 pointer-events-none ${onDrag && 'border-orange-200 bg-orange-50'}`}
            >
              <RiImageAddFill className='w-40 h-40 text-gray-300' />
              <p>이미지를 추가하려면 클릭 혹은 이미지를 드래그 하십시오.</p>
            </div>
          ) : (
            <div className='relative w-full border aspect-square'>
              <Image
                src={URL.createObjectURL(imageFile)}
                alt='localfile'
                fill
                className='object-cover'
              ></Image>
            </div>
          )}
        </label>
        <textarea
          className='w-full p-2 border-b resize-none border-x outline-orange-200'
          placeholder='게시물 내용을 작성해보세요.'
          ref={textRef}
          cols={30}
          rows={10}
          required
        />
        <DPButton className='w-full' type='submit'>
          게시물 등록
        </DPButton>
      </form>
    </div>
  );
}
