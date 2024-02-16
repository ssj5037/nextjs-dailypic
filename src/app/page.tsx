import Avatar from "@/component/Avatar";
import FollowingBar from "@/component/FollowingBar";
import PostList from "@/component/PostList";

export default function HomePage() {
  return (
    <>
      <section className="max-w-2xl w-[42rem]">
        <FollowingBar />
        <PostList />
      </section>
      <section className="flex-col hidden pl-16 w-80 lg:flex">
        <Avatar size="large" showName />
        <div className="my-7">
          <nav className="flex mb-5 text-xs text-gray-400">
            <ul className="inline items-baseline gap-1 *:after:content-['_·_'] *:inline ">
              <li className="">소개</li>
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
          <span className="flex text-sm font-semibold text-gray-400">
            © 2024 DailyPic FROM Sujin Shin.
          </span>
        </div>
      </section>
    </>
  );
}
