import { User } from '@/models/user';
import Link from 'next/link';

export default function Avatar({
  highlight = false,
  size = 'small',
  user,
}: {
  highlight?: boolean;
  size?: 'small' | 'large';
  user: User;
}) {
  return (
    <div
      className={`rounded-full 
            ${highlight && 'border-2 border-orange-500'}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={user.image}
        alt={`${user.name} 프로필 이미지`}
        width={`${size === 'small' ? 40 : 56}`}
        height={`${size === 'small' ? 40 : 56}`}
        className={`rounded-full 
              ${highlight && 'border border-white'}`}
        referrerPolicy='no-referrer'
      />
    </div>
  );
}
