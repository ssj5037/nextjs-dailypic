import { getFollowingUser } from '@/service/user';

export default async function FollowingLBar() {
  const data = await getFollowingUser();
  console.log('following bar : ', data);
  return <div>FollowingLBar</div>;
}
