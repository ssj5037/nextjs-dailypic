import { UserProfile } from '@/models/user';
import Avatar from '../ui/Avatar';

type Props = {
  user: UserProfile;
};
export default function MypageHeader({
  user: { image, username, followers, following, posts },
}: Props) {
  return (
    <div>
      <Avatar image={image} />
      <div>
        <p>{username}</p>
        <p>
          <span>게시물 {posts}</span>
          <span>팔로워 {followers}</span>
          <span>팔로잉 {following}</span>
        </p>
      </div>
    </div>
  );
}
