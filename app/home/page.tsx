"use client";

import { MotionImage, PageLink } from "../components";

export default function Home() {
  const LinkStyling =
    "md:px-5 md:py-5 text-center font-semibold w-[25vh] sm:w-[40vh] md:w-[45vh] 2xl:w-[55vh]";
  return (
    <div className="flex flex-row justify-center items-center h-full w-full">
      <div className="flex flex-col w-[50vh] justify-center space-y-5 md:space-y-10">
        <PageLink
          href="/start"
          color="bg-deluge"
          name="Getting Started"
          title="Start your journey with us"
          additionalStyling={LinkStyling}
        />
        <PageLink
          href="/about"
          color="bg-deluge"
          name="About Us"
          title="Learn more about Kineticare"
          additionalStyling={LinkStyling}
        />
        <PageLink
          href="/contact"
          color="bg-falu-red"
          name="Contact Us"
          title="Connect with us"
          additionalStyling={LinkStyling}
        />
      </div>
      <div className="w-[50vh]">
        <MotionImage
          onClick={() => (window.location.href = "/home")}
          width={427}
          height={378}
          src="webstock_fzsz6p"
          alt="Kineticare Logo"
          styling="sm:p-10"
        />
      </div>
    </div>
  );
}
