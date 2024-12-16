export default function ContactPage() {
  return (
    <div className="flex justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Contact Us
        </h1>

        <p className="text-gray-700 text-lg mb-4">
          We'd love to hear from you! If you have any questions or need
          assistance, feel free to reach out to us using the contact details
          below:
        </p>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Kineticare Support Team
          </h2>

          <p className="text-gray-700 mb-2">
            <strong>Email:</strong> [Insert Email Address]
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Phone:</strong> [Insert Phone Number]
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Business Hours
          </h2>
          <p className="text-gray-700 mb-2">
            <strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Saturday:</strong> 10:00 AM - 4:00 PM
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Sunday:</strong> Closed
          </p>
        </div>

        <div className="text-center">
          <p className="text-gray-600 text-sm">
            Thank you for reaching out to Kineticare. We look forward to
            assisting you!
          </p>
        </div>
      </div>
    </div>
  );
}
