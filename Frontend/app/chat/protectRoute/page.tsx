"use client";
import { useAppSelector } from '@/redux/store';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function ProtectedPage({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, isInitialized } = useAppSelector(store => store.authStore);

  useEffect(() => {
    // Don't redirect until we know auth state is initialized
    if (isInitialized && !isAuthenticated) {
      window.location.href="/signin"
    }
  }, [isInitialized, isAuthenticated]);

  // While auth state is loading, don't render or redirect yet
  if (!isInitialized) {
    return <div className="p-4">Loading...</div>;
  }

  // If not authenticated, don't show protected content
  if (!isAuthenticated) return null;

  // Authenticated, show children
  return <div>{children}</div>;
}
