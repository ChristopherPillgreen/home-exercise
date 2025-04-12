"use client";

import { useState } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";

export function SignInForm() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Initialize useRouter

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Make a POST request to the login API
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail,
          userPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/plans");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (error) {
      setError("An unexpected error occurred");
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="flex w-full max-w-lg flex-col gap-6 p-8 bg-white rounded-lg shadow-lg"
        onSubmit={handleSubmit}
      >
        <div>
          <div className="mb-3 block">
            <Label htmlFor="email1" value="Your email" className="text-xl" />
          </div>
          <TextInput
            id="email1"
            type="email"
            placeholder="johndoe@gmail.com"
            required
            className="p-4 text-lg"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>
        <div>
          <div className="mb-3 block">
            <Label
              htmlFor="password1"
              value="Your password"
              className="text-xl"
            />
          </div>
          <TextInput
            id="password1"
            type="password"
            required
            className="p-4 text-lg"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <Checkbox id="remember" className="w-5 h-5" />
          <Label htmlFor="remember" className="text-lg">
            Remember me
          </Label>
        </div>

        {/* Show error if there's any */}
        {error && <p className="text-red-500 text-lg mt-4">{error}</p>}

        <Button type="submit" className="text-xl p-4">
          Submit
        </Button>
        <Button href="/sign-up" color="link" className="text-lg mt-4">
          Register Here
        </Button>
      </form>
    </div>
  );
}
