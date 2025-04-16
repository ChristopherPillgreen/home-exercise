"use client";

import { CldImage } from "next-cloudinary";
import { motion } from "motion/react";

export default function Confirm() {
  return (
    <div className="h-screen flex w-full items-center justify-center bg-slate-200">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-2xl mx-auto my-10 flex flex-col items-center">
        <CldImage
          src="logo_stsvdy"
          width="256" // Adjust width as needed
          height="128" // Adjust height as needed
          alt="Logo"
          className="w-auto h-auto mb-6"
        />
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          <span className="pl-4">Kineticare</span> offers a comprehensive tool
          for a wide range of rehabilitation professionals—including physical
          therapists, PTAs, occupational therapists, athletic trainers,
          chiropractors, orthopedic and sports physicians, as well as
          students—to create personalized home exercise programs that cater to
          the unique needs of their patients.
        </p>
        <p className="text-lg font-bold text-gray-600 dark:text-gray-400 mb-6">
          Please note that users should seek professional advice before
          attempting any exercises or programs found on the site.
        </p>
        <div className="flex justify-center space-x-4">
          <motion.div
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.1 }}
            className="bg-[#7076af] inline-block text-white font-semibold py-2 px-4 rounded-xl"
          >
            <a href="/home">I Agree</a>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
            className="bg-[#7d1616] inline-block text-white font-semibold py-2 px-4 rounded-xl"
          >
          <a href="/">
            I Do NOT Agree
          </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
