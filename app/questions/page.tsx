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
                  This platform helps you create and share exercise routines. Sharing routines has never
                  been easier with our mobile app that allows you to scan QR codes and import routines directly
                  into patients phones.
                </p>
              </div>
            </details>
          </div>

          <div className="border-b pb-4">
            <details className="group">
              <summary className="cursor-pointer text-xl font-semibold text-gray-700">
                How do I save my plans?
              </summary>
              <div className="mt-2 text-gray-600">
                <p>
                  You can save your plans by clicking the save button
                  in each plan.
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
                  Yes! You can export your plans to a PDF by
                  clicking the "Export as" button and select PDF in the sidebar. You can also send your plans
                  to our mobile app by generating a QR code and scanning it with your mobile device's camera app.
                </p>
              </div>
            </details>
          </div>

          <div className="border-b pb-4">
            <details className="group">
              <summary className="cursor-pointer text-xl font-semibold text-gray-700">
                How do I add my own custom exercises?
              </summary>
              <div className="mt-2 text-gray-600">
                <p>
                  As of right now, all of the exercises are managed by our team. You can react out to us
                  via the contact form on our website to request an exercise to be added.
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
                  Yes, you can contact support by using the contact form on our website in the bottom right.
                </p>
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}
