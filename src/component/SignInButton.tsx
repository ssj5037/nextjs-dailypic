"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { SignInIcon, SignOutIcon } from "./ui/icons";
import DPButton from "./DPButton";

export default function SignIn() {
  const { data: session } = useSession();
  const handleAuth = () => {
    session ? signOut() : signIn();
  };
  return (
    <>
      <DPButton
        onClick={handleAuth}
        className="flex items-center justify-center w-full gap-2 p-2 font-semibold text-white transition-all bg-orange-400 rounded hover:bg-orange-300"
      >
        {session ? (
          <>
            <span className="hidden text-sm lg:block">Sign Out</span>
            <span className="text-xl">
              <SignOutIcon />
            </span>
          </>
        ) : (
          <>
            <span className="text-xl">
              <SignInIcon />
            </span>
            <span className="hidden text-sm lg:block">Sign In</span>
          </>
        )}
      </DPButton>
    </>
  );
}
