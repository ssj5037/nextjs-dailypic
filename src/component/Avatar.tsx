"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Avatar({
  highlight = false,
  showName = false,
  size = "small",
}: {
  highlight?: boolean;
  showName?: boolean;
  size?: "small" | "large";
}) {
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <>
      {user && (
        <Link
          href={`/${user.username}`}
          className="flex items-center w-full gap-2 rounded-md"
        >
          <div
            className={`rounded-full 
            ${highlight && "border-2 border-orange-500"}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user.image}
              alt={`${user.name} 프로필 이미지`}
              width={`${size === "small" ? 40 : 56}`}
              height={`${size === "small" ? 40 : 56}`}
              className={`rounded-full 
              ${highlight && "border border-white"}`}
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col">
            {showName && (
              <>
                <span
                  className={`font-semibold 
                  ${size === "small" ? "text-sm" : "text-md"}`}
                >
                  {user.username}
                </span>
                <span
                  className={`text-gray 
                  ${size === "small" ? "text-xs" : "text-sm"}`}
                >
                  {user.name}
                </span>
              </>
            )}
          </div>
        </Link>
      )}
    </>
  );
}
