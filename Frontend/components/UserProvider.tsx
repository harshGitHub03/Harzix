// components/UserProvider.tsx
'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { getUserDetails } from '../redux/auth.redux/auth.thunks';

export default function UserProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.authStore.user);

  useEffect(() => {
    if (!user) {
      dispatch(getUserDetails());
    }
  }, [dispatch, user]);

  return <>{children}</>;
}
