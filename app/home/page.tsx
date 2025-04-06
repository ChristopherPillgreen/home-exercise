"use client";

import AnimatedLink from "../components/AnimatedLink";


export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 relative">
      <div className="relative flex justify-center items-center">
      </div>
        <div className="absolute flex flex-col items-center">
          <div className="grid grid-cols-2 gap-6">
            <AnimatedLink href="/start" text="Getting Started" strokeColor="#7076af" />
            <AnimatedLink href="/questions" text="Questions" strokeColor="#793339" />
            <AnimatedLink href="/about" text="About Us" strokeColor="#cf935c" />
            <AnimatedLink href="/contact" text="Contact Us" strokeColor="#74ac85" />
          </div>
        </div>
      </div>
  );
}
