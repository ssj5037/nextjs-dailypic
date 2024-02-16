import Link from "next/link";
import NavLink, { NavMenu } from "./NavLink";
import SignInButton from "./SignInButton";
import Avatar from "./Avatar";
import {
  HomeFillIcon,
  HomeIcon,
  LogoIcon,
  NewFillIcon,
  NewIcon,
  SearchFillIcon,
  SearchIcon,
} from "./ui/icons";

const menus: NavMenu[] = [
  {
    path: "/",
    title: "홈",
    activeIcon: <HomeFillIcon />,
    inactiveIcon: <HomeIcon />,
  },
  {
    path: "/search",
    title: "검색",
    activeIcon: <SearchFillIcon />,
    inactiveIcon: <SearchIcon />,
  },
  {
    path: "/new",
    title: "만들기",
    activeIcon: <NewFillIcon />,
    inactiveIcon: <NewIcon />,
  },
];

export default function Header() {
  return (
    <header className="flex flex-row items-center w-full gap-8 px-4 py-3 border-b md:flex-col md:w-20 xl:w-60 md:py-10 md:border-r md:border-b-0 md:items-start">
      {/* logo */}
      <h1 className="p-2 font-semibold md:w-full md:h-10">
        <Link href={"/"} className="hidden text-2xl xl:block">
          Dailypic
        </Link>
        <Link href={"/"} className="block text-3xl xl:hidden">
          <LogoIcon />
        </Link>
      </h1>
      {/* nav */}
      <nav className="flex flex-row items-start justify-end gap-5 md:w-full md:justify-start grow md:flex-col">
        {menus.map((menu) => (
          <NavLink key={menu.path} menu={menu} />
        ))}
      </nav>
      {/* user info */}
      <div className="flex flex-row items-center justify-center gap-5 xl:w-full md:flex-col">
        <div className="hidden w-full xl:flex">
          <Avatar highlight showName />
        </div>
        <div className="flex xl:hidden shrink-0">
          <Avatar highlight />
        </div>
        <SignInButton />
      </div>
    </header>
  );
}
