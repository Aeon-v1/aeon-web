"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "@/lib/firebase";

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      // If no token is provided, just redirect back to the app
      router.replace("/");
      return;
    }

    if (!auth) {
      console.error("Firebase Auth is not initialized.");
      router.replace("/");
      return;
    }

    signInWithCustomToken(auth, token)
      .then(() => {
        // Successfully signed in via custom token
        router.replace("/");
      })
      .catch((error) => {
        console.error("Failed to sign in with custom token", error);
        // Fallback redirect
        router.replace("/");
      });
  }, [token, router]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#FDFDFC] dark:bg-[#1F1F1E] text-black dark:text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="text-sm font-medium animate-pulse">Authenticating...</p>
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="flex h-screen w-full items-center justify-center bg-[#FDFDFC] dark:bg-[#1F1F1E]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  );
}
