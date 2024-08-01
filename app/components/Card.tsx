"use client";

import { Card } from "flowbite-react";
import { HeartIcon } from "./HeartIcon";

export function ExerciseCard() {
  return (
    <Card
      className="max-w-sm h-fit border border-gray-300 rounded-lg overflow-hidden shadow-md m-4 transition-transform transform hover:scale-105 hover:shadow-lg"
      imgAlt="Meaningful alt text for an image that is not purely decorative"
      imgSrc="/glute-bridge.jpg"
    >
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Bridging
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Lie on your back with your knees bent. Tighten the muscles in your
        stomach. Raise your hips off the floor until they line up with your
        knees and shoulders. Hold for three deep breaths.
      </p>
      <button>
        <HeartIcon />
      </button>
    </Card>
  );
}
