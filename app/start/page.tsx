// getting-started.tsx
"use client";

import { motion } from "motion/react";

export default function GettingStarted() {
  const steps = [
    {
      title: "Create an account",
      description:
        "Click the green button to sign in using google. Kineticare uses google auth to manage accounts.",
    },
    {
      title: "Go to the planner",
      description:
        "After logging in, you can create a new exercise plan by clicking on the 'Your Plans' button in the top navigation bar.",
    },
    {
      title: "Customize your plan",
      description:
        "Customize your plan by naming it, adjusting the details, and adding or removing exercises as needed.",
    },
    {
      title: "Save and share!",
      description:
        "Once you're satisfied with your plan, save it. You can export your plan to PDF or generate a shareable QR code that allows patients to access the plan.",
    },
  ];

  return (
    <div className="flex items-center justify-center bg-gray-100 w-full h-fit">
      <div className="max-w-5xl py-4 px-4 mx-4 bg-white rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Getting Started with Kineticare
        </h1>
        <div className="space-y-5">
          {steps.map(({ title, description }) => (
            <div key={title} className="step-card">
              <h2 className="text-xl font-semibold text-[#7874AC]">{title}</h2>
              <p className="mt-2 text-gray-600">{description}</p>
            </div>
          ))}
          <div className="text-center mt-8">
            <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
              <a
                href="/plans"
                className="inline-block rounded-md px-8 py-3 text-center font-medium text-white bg-[#7874AC] shadow-md hover:shadow-lg hover:text-white"
              >
                Start Creating A Plan
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
