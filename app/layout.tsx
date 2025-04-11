import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavWrapper from "./components/NavWrapper";
import { PageFooter } from "./components/Foot";
import SessionProviderWrapper from "./sessionprovider"; // Import the wrapper
import { getServerSession } from "next-auth";
import { authOptions } from "@api/authOptions/authOptions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kineticare",
  description: "Kineticare is an app designed to help users create customized physical therapy exercise programs for rehabilitation and recovery.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <SessionProviderWrapper session={session}>
          {/* Top Navigation */}
          <NavWrapper />

          {/* Main Content */}
          <div className="flex-grow bg-slate-200 flex items-center justify-center">
            {children}
          </div>

          {/* Footer */}
          <PageFooter />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}