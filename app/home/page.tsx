"use client";
import { Circle } from "react-shapes";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 relative">
      <div className="relative flex justify-center items-center">
        <Circle
          r={window.innerWidth / 4}
          fill={{ color: "#7874AC" }} // Translucent black
          strokeWidth={5}
        />
        <div className="absolute flex flex-col items-center">
          <h1 className="text-6xl font-bold text-white mb-8">
            Welcome to Kineticare
          </h1>
          <div className="grid grid-cols-2 gap-6">
            <Link
              href="/start"
              className="flex py-5 px-10 bg-[#F2F2F2] text-[#7874AC] text-2xl font-semibold rounded-lg hover:bg-[#3C3C3C] hover:text-white transition duration-300"
            >
              Getting Started
            </Link>
            <Link
              href="/questions"
              className="flex py-5 px-10 bg-[#F2F2F2] text-[#7874AC] text-2xl font-semibold rounded-lg hover:bg-[#3C3C3C] hover:text-white transition duration-300"
            >
              Questions
            </Link>
            <Link
              href="/about"
              className="flex py-5 px-10 bg-[#F2F2F2] text-[#7874AC] text-2xl font-semibold rounded-lg hover:bg-[#3C3C3C] hover:text-white transition duration-300"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="flex py-5 px-10 bg-[#F2F2F2] text-[#7874AC] text-2xl font-semibold rounded-lg hover:bg-[#3C3C3C] hover:text-white transition duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
