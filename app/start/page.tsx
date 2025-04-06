// getting-started.tsx
"use client";

export default function GettingStarted() {
  return (
    <div className="py-12 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Getting Started with Kineticare
        </h1>

        <div className="space-y-8">
          <div className="step-card">
            <h2 className="text-xl font-semibold text-[#00768c]">
              Create an Account
            </h2>
            <p className="mt-2 text-gray-600">
              Click the green button to sign in using google. Kineticare uses google auth to manage accounts.
            </p>
          </div>

          <div className="step-card">
            <h2 className="text-xl font-semibold text-[#cf935c] ">
              Go to the Planner
            </h2>
            <p className="mt-2 text-gray-700">
              After logging in, you can create a new exercise plan by clicking on
              the "Your Plans" button in the top navigation bar. This will take you to the plan creation page.
            </p>
          </div>

          <div className="step-card">
            <h2 className="text-xl font-semibold text-gray-700">
              Step 3: Customize Your Plan
            </h2>
            <p className="mt-2 text-gray-600">
              Customize your plan by naming it, adjusting the details, and
              adding or removing exercises as needed.
            </p>
          </div>

          <div className="step-card">
            <h2 className="text-xl font-semibold text-gray-700">
              Step 4: Save Your Plan
            </h2>
            <p className="mt-2 text-gray-600">
              Once you're happy with your plan, save it. You can also export it
              as a PDF file for sharing or printing.
            </p>
          </div>

          <div className="step-card">
            <h2 className="text-xl font-semibold text-gray-700">
              Step 5: Share With QR Code
            </h2>
            <p className="mt-2 text-gray-600">
              Share your plans with friends or clients via our mobile app by
              scanning the QR code generated after you finish your plan.
            </p>
          </div>

          <div className="text-center mt-8">
            <a
              href="/plans"
              className="inline-block rounded-md px-8 py-3 text-center font-medium text-white bg-[#7874AC] hover:bg-[#3C3C3C] hover:text-white"
            >
              Start Creating A Plan
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
