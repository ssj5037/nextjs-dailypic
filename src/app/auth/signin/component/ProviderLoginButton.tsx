"use client";
import DPButton from "@/component/DPButton";
import { ClientSafeProvider, signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function ProviderLoginButton({
  provider,
}: {
  provider: ClientSafeProvider;
}) {
  return (
    <DPButton
      onClick={() =>
        signIn(provider.id, { callbackUrl: "http://localhost:3000" })
      }
      className="px-4 flex items-center gap-3"
    >
      {provider.id === "github" && <FaGithub className="text-xl" />}
      {provider.id === "google" && <FcGoogle className="text-xl" />}
      Sign in with {provider.name}
    </DPButton>
  );
}
