import SearchContainer from '@/component/search/SearchContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '사용자 검색',
  description: '팔로잉할 사용자를 검색하세요.',
};

export default function SearchPage() {
  return (
    <div className='flex flex-col w-1/2 max-w-xl gap-10 min-w-96'>
      <SearchContainer />
    </div>
  );
}
