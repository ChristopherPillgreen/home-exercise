"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 relative">
      <div className="relative flex justify-center items-center">
      </div>
        <div className="absolute flex flex-col items-center">
          <h1 className="text-6xl font-bold text-[#7874AC] mb-8">
            Welcome to Kineticare
          </h1>
          <div className="grid grid-cols-2 gap-6">
            <Link
              href="/start"
              className="flex py-5 px-10 bg-[#7076af] text-[#FFFFFF] text-2xl font-semibold rounded-lg hover:bg-[#3C3C3C] hover:text-white transition duration-300"
            >
              Getting Started
            </Link>
            <Link
              href="/questions"
              className="flex py-5 px-10 bg-[#793339] text-[#FFFFFF] text-2xl font-semibold rounded-lg hover:bg-[#3C3C3C] hover:text-white transition duration-300"
            >
              Questions
            </Link>
            <Link
              href="/about"
              className="flex py-5 px-10 bg-[#cf935c] text-[#FFFFFF] text-2xl font-semibold rounded-lg hover:bg-[#3C3C3C] hover:text-white transition duration-300"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="flex py-5 px-10 bg-[#74ac85] text-[#FFFFFF] text-2xl font-semibold rounded-lg hover:bg-[#3C3C3C] hover:text-white transition duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
  );
}
