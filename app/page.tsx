"use client";

import { CldImage } from "next-cloudinary";
import { motion } from "motion/react";

export default function Open() {
  return (
    <div className="relative flex h-fit w-full overflow-hidden">
      <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <CldImage
              width="960"
              height="600"
              src="logo_stsvdy"
              sizes="100vw"
              alt="logo"
            />
            <p className="mt-4 text-xl text-gray-500">
              Create and send exercise routines with ease
            </p>
          </div>
          <div>
            <div className="mt-10">
              <div
                aria-hidden="true"
                className="lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="h-fit flex flex-wrap gap-8 relative">
                      <div className="h-fit flex flex-wrap gap-12 relative">
                        {Array.from({ length: 6 }).map((_, index) => {
                          const colorClasses = [
                            "bg-[#7076af]",
                            "bg-[#3D0814]",
                            "bg-[#7D1616]",
                            "bg-[#58A870]",
                            "bg-[#004f2d]",
                          ];
                          return (
                            <motion.div
                              key={index}
                              whileHover={{ scale: 1.5 }}
                              transition={{ duration: 0.4 }}
                              className={`h-[25vh] w-[25vh] overflow-hidden rounded-xl ${
                                colorClasses[index % colorClasses.length]
                              }`}
                            >
                                {}
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
                onClick={() => {
                    window.location.href = "/confirm";
                  }}
                className="relative z-10 bg-[#7076af] inline-block rounded-xl border border-transparent px-8 py-3 text-center font-medium text-white"
              >
                <button>
                  Enter
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
