import { Loader2 } from "lucide-react";
import { SignIn, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

const SignInPage = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full lg:flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-4 pt-16">
          <h1 className="font-bold text-3xl text-[#2E2A47]">Welcome Back!</h1>
          <p className="text-base text-[#7E8CA0]">
            Log in or Create account to get back to your dashboard!
          </p>
        </div>
        <div className="flex items-center justify-center mt-8">
          <ClerkLoaded>
            <SignIn path="/sign-in" />
          </ClerkLoaded>
          <ClerkLoading>
            <SignInSkeleton />
          </ClerkLoading>
        </div>
      </div>
      <div className="h-full bg-blue-600 hidden lg:flex items-center justify-center">
        <Image width={100} height={100} src={"/logo.svg"} alt="Logo" />
      </div>
    </div>
  );
};

const SignInSkeleton = () => (
  <div
    className="w-[400px] rounded-xl shadow-xl space-y-4 pb-4"
    style={{
      background:
        " linear-gradient(rgba(0, 0, 0, 0.03), rgba(0, 0, 0, 0.03)), linear-gradient(rgb(255, 255, 255), rgb(255, 255, 255))",
    }}
  >
    <div className="space-y-7 bg-white border rounded-xl p-5">
      <div className="space-y-2">
        <Skeleton className="w-1/2 h-6 mx-auto rounded-sm border-none" />
        <Skeleton className="w-3/4 h-6 mx-auto rounded-sm border-none" />
      </div>
      <div className="flex items-center justify-center gap-5">
        <Skeleton className="w-32 h-[26px] border rounded-sm " />
        <Skeleton className="w-32 h-[26px] border rounded-sm " />
      </div>
      <fieldset className="border-t border-gray-200 ">
        <legend className="m-auto px-5 text-[#747686]">or</legend>
      </fieldset>
      <div className="space-y-3">
        <Skeleton className="w-1/4 h-6 rounded-sm border-none" />
        <Skeleton className="w-full h-8 rounded-sm border-none" />
        <Skeleton className="w-full h-7 rounded-sm border-none" />
      </div>
    </div>
    <div className="space-y-4">
      <Skeleton className="w-1/2 h-6 mx-auto rounded-sm" />
      <div className="w-full border border-gray-200" />
      <Skeleton className="w-2/5 h-6 mx-auto rounded-sm" />
    </div>
  </div>
);

export default SignInPage;
