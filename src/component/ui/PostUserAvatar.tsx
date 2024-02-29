import Link from 'next/link';
import Avatar from './Avatar';

type Props = {
  image: string;
  username: string;
  className?: string;
  children?: React.ReactNode;
};

export default function PostUserAvater({
  image,
  username,
  className,
  children,
}: Props) {
  return (
    <Link
      href={`/${username}`}
      className={`flex items-center gap-2 ${className}`}
    >
      <Avatar image={image} highlight />
      <span className='font-semibold'>{username}</span>
      {children}
    </Link>
  );
}
