import { SignInIcon } from "./ui/icons";

export default function SignIn() {
  return (
    <button className="flex justify-center gap-2 p-2 font-semibold text-white transition-all bg-orange-400 rounded hover:bg-orange-300">
      <span className="text-xl">
        <SignInIcon />
      </span>
      <span className="hidden text-sm lg:block">Sign In</span>
    </button>
  );
}
