"use client";

import { Blockquote } from "flowbite-react";
import { Carousel } from "flowbite-react";


export default function Home() {
  return (
    <>
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-2xl mx-auto my-10">
    <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
        Welcome to KinetiCare, the go-to platform for physical therapists to create personalized exercise regimens for their patients. Whether you're looking to streamline your workflow, track progress, or customize programs for recovery, KinetiCare empowers you to deliver exceptional care. Let's build healthier futures together, one movement at a time!
    </p>
    <a href="#"
       className="inline-block bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-300">
    </a>
</div>
    
    </>
  );
}
