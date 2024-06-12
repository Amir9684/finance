"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Skeleton } from "./ui/skeleton";

export const WelcomeMsg = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  const { user, isLoaded } = useUser();

  if (!isMounted) return <WelcomeMsgSkeleton />;

  return (
    <div className="space-y-2 mb-4">
      <h2 className="text-2xl lg:text-4xl text-white font-medium">
        Welcome Back{isLoaded ? ", " : " "}
        {user?.firstName} 👋
      </h2>
      <p className="text-sm lg:text-base text-[#89b6fd]">
        This is your Financial Overwiew Report
      </p>
    </div>
  );
};

const WelcomeMsgSkeleton = () => (
  <div className="space-y-2 mb-4">
    <Skeleton className="w-80 h-10" />
    <Skeleton className="w-52 h-8" />
  </div>
);
