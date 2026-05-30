"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import { onAuthStateChanged, signInAnonymously, User, GoogleAuthProvider, linkWithPopup, signInWithPopup } from "firebase/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  linkWithGoogle: () => Promise<User | null>;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true, linkWithGoogle: async () => null });

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        // Automatically sign in anonymously for the builder if not logged in
        try {
          await signInAnonymously(auth);
        } catch (error: any) {
          if (error.code === 'auth/network-request-failed') {
            console.warn("Network request failed during anonymous auth (offline or firewall). Continuing without auth.");
          } else {
            console.error("Anonymous auth failed", error);
          }
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const linkWithGoogle = async (): Promise<User | null> => {
    if (!auth) return null;
    const provider = new GoogleAuthProvider();
    try {
      if (auth.currentUser && auth.currentUser.isAnonymous) {
        // Link anonymous account to Google to save data
        const result = await linkWithPopup(auth.currentUser, provider);
        setUser(result.user);
        return result.user;
      } else {
        // Just sign in normally if not anonymous
        const result = await signInWithPopup(auth, provider);
        setUser(result.user);
        return result.user;
      }
    } catch (error: any) {
      if (error.code === 'auth/credential-already-in-use') {
        // If the Google account already exists, we must sign them in instead of linking
        const result = await signInWithPopup(auth, provider);
        setUser(result.user);
        return result.user;
      }
      console.error("Google Auth Error:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, linkWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}
