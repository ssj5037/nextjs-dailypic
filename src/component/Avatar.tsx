"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Avatar() {
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <>
      {user && (
        <Link
          href={`/${user.username}`}
          className="flex items-center w-full gap-2 rounded-md group"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={user.image}
            alt={`${user.name} 프로필 이미지`}
            width={40}
            height={40}
            className="transition-all rounded-full group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="flex-col hidden text-xs lg:flex">
            <span>{user.name}</span>
            <span>{user.username}</span>
          </div>
        </Link>
      )}
    </>
  );
}
