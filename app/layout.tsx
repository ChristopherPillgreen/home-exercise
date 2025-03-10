import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./components/Megamenu";
import { PageFooter } from "./components/Foot";
import SessionProviderWrapper from "./sessionprovider"; // Import the wrapper

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kineticare",
  description: "Kineticare is an app designed to help users create customized physical therapy exercise programs for rehabilitation and recovery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <SessionProviderWrapper> {/* Use the wrapper here */}
          <nav className="w-full p-1">
            <Nav />
          </nav>
          <div className="bg-slate-200 w-full flex-grow">{children}</div>
          <PageFooter />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}