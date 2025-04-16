"use client";

import React, { useState } from 'react';
import { motion } from 'motion/react'

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', { name, email, message });
  };

  return (
    <div className="h-fit w-full">
      <div className="flex justify-center">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-2xl">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-[#7874AC] mb-2">
            Kineticare Support
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 shadow-md hover:shadow:lg rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-md hover:shadow:lg"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-md hover:shadow:lg resize-none"
                rows={4}
                required
              />
            </div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
              className="px-4 py-2 bg-[#58A870] text-white  w-fit rounded-xl shadow-md hover:shadow-lg"
            >
            <button
              type="submit"
            >
              Submit
            </button>
            </motion.div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}
