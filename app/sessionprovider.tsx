"use client"; // This directive ensures the component is treated as a Client Component

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react"; // Import ReactNode type

interface Props {
  children: ReactNode; // Define the type for children
  session: any; // Optional session prop
}

export default function SessionProviderWrapper({ children, session }: Props) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}