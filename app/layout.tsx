import type { Metadata } from "next";
import "./globals.css";
import { Footer, Header } from "./components/";
import SessionProviderWrapper from "./sessionprovider";
import { getServerSession } from "next-auth";
import { authOptions } from "@api/authOptions/authOptions";
;

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
    <html lang="en" className="font-Noto_Sans">
      <body className="flex flex-col h-screen">
        <SessionProviderWrapper session={session}>
          <Header />
          <div className="flex flex-grow h-fit justify-center items-center bg-gray-100">
            {children}
          </div>
          <Footer />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}