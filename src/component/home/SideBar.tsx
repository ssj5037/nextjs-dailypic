import { User } from '@/models/user';
import Link from 'next/link';
import Avatar from '@/component/ui/Avatar';

type Props = {
  user: User;
};
export default function SideBar({ user: { image, username, name } }: Props) {
  return (
    <>
      <Link href={`/${username}`} className='flex gap-3 my-5 shrink-0'>
        <Avatar size='large' image={image} />
        <div className='flex flex-col'>
          <span className='font-semibold text-md'>{username}</span>
          <span className='text-sm text-gray'>{name}</span>
        </div>
      </Link>
      <div className='my-7'>
        <nav className='flex mb-5 text-xs text-gray-400'>
          <ul className="inline items-baseline gap-1 *:after:content-['_·_'] *:inline ">
            <li className=''>소개</li>
            <li>도움말</li>
            <li>홍보 센터</li>
            <li>API</li>
            <li>채용 정보</li>
            <li>개인정보처리방침</li>
            <li>약관</li>
            <li>위치</li>
            <li>언어</li>
          </ul>
        </nav>
        <span className='flex text-sm font-semibold text-gray-400'>
          © 2024 DailyPic FROM Sujin Shin.
        </span>
      </div>
    </>
  );
}
