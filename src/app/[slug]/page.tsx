import MypageHeader from '@/component/mypage/MypageHeader';
import { UserProfile } from '@/models/user';
import { redirect } from 'next/navigation';

export default async function MyPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const userProfile = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + '/api/user?username=' + slug
  );

  console.log(userProfile.data);
  if (!userProfile) {
    redirect('/');
  }
  return (
    <div>
      <h2>{slug}</h2>
      {/* {userProfile && <MypageHeader user={userProfile} />} */}
    </div>
  );
}
