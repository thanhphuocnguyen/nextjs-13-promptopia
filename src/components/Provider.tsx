"use client";

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import React, { ReactNode } from 'react';
interface IProviderProps {
  children: ReactNode;
  session?: Session | undefined | null;
}
const Provider = ({ children, session }: IProviderProps) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
};

export default Provider;