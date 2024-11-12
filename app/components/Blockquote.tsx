"use client";

import { Blockquote, Card } from "flowbite-react";

export function Blockquotes() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="max-w-4xl p-8 shadow-lg rounded-lg">
        <Blockquote className="text-lg text-gray-800">
          "Our names are Nick, Chris, and Nick, and we are Computer Science
          students at Southern Adventist University. Chris is a PTA and thought
          about improving HEP programs for better patient cooperation. Our
          website aims to make the user experience as friendly and easy as
          possible for the patients. If you have any questions, comments, or
          concerns, you can click contact us on the bottom right of your screen
          to reach out to us. Any feedback is helpful as we continue to improve
          this website. Thank you for visiting our website, and we hope to
          continue to see you in the future."
        </Blockquote>
      </Card>
    </div>
  );
}
