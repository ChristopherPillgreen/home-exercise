// questions.tsx
"use client";

export default function Questions() {
  return (
    <div className="py-12 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Frequently Asked Questions
        </h1>

        <div className="space-y-6">
          <div className="border-b pb-4">
            <details className="group">
              <summary className="cursor-pointer text-xl font-semibold text-gray-700">
                What is this platform about?
              </summary>
              <div className="mt-2 text-gray-600">
                <p>
                  This platform helps you create and share exercise routines,
                  track progress, and save your favorite plans.
                </p>
              </div>
            </details>
          </div>

          <div className="border-b pb-4">
            <details className="group">
              <summary className="cursor-pointer text-xl font-semibold text-gray-700">
                How do I save my favorite plans?
              </summary>
              <div className="mt-2 text-gray-600">
                <p>
                  You can save your favorite plans by clicking the heart icon
                  next to each plan.
                </p>
              </div>
            </details>
          </div>

          <div className="border-b pb-4">
            <details className="group">
              <summary className="cursor-pointer text-xl font-semibold text-gray-700">
                Can I export my exercise plans?
              </summary>
              <div className="mt-2 text-gray-600">
                <p>
                  Yes! You can export your plans to a PDF or CSV format by
                  clicking the "Save and Export" button in the sidebar.
                </p>
              </div>
            </details>
          </div>

          <div className="border-b pb-4">
            <details className="group">
              <summary className="cursor-pointer text-xl font-semibold text-gray-700">
                How do I change my plan's name?
              </summary>
              <div className="mt-2 text-gray-600">
                <p>
                  You can change the name of your plan directly in the sidebar
                  by typing a new name in the text box.
                </p>
              </div>
            </details>
          </div>

          <div className="border-b pb-4">
            <details className="group">
              <summary className="cursor-pointer text-xl font-semibold text-gray-700">
                Is there a way to contact support?
              </summary>
              <div className="mt-2 text-gray-600">
                <p>
                  Yes, you can contact support by emailing chrisp@southern.edu
                  or using the contact form on our website.
                </p>
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}
