import { getProviders } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ProviderLoginButton from "./component/ProviderLoginButton";

export default async function SignInPage() {
  const session = await getServerSession(authOptions);
  const providers = await getProviders();

  if (session || !providers) {
    return { redirect: { destination: "/" } };
  }

  return (
    <div className="flex h-full justify-center">
      <div className="flex items-center">
        <div className="border p-5 flex flex-col items-center gap-3 rounded border-orange-500">
          <h2 className="text-xl font-semibold p-5">Sign In to DailyPic</h2>
          {Object.values(providers).map((provider) => (
            <ProviderLoginButton key={provider.name} provider={provider} />
          ))}
        </div>
      </div>
    </div>
  );
}
