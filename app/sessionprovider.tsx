"use client"; // This directive ensures the component is treated as a Client Component

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react"; // Import ReactNode type

interface Props {
  children: ReactNode; // Define the type for children
}

export default function SessionProviderWrapper({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>;
}