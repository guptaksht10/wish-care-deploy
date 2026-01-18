"use client";

import Loader from "@/components/Loader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Toaster } from "sonner";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <Loader />
    );
  }

  return <>
    {children}
    <Toaster
      position="bottom-right"
      toastOptions={{
    classNames: {
      toast:
        "bg-white/90 backdrop-blur-xl border border-pink-200 shadow-xl rounded-xl text-md",
      title: "text-gray-800 font-semibold",
      description: "text-gray-600",
      success: "border-l-4 border-pink-500",
      error: "border-l-4 border-red-500",
    },
  }}
/>
</>;
}
