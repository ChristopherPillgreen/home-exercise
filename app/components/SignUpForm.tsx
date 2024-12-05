"use client";

import { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";

export function SignUpForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");

    const userData = {
      userFirstName: firstName,
      userLastName: lastName,
      userEmail: email,
      userPassword: password,
    };

    try {
      const response = await fetch("/api/User", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("User registered successfully:", result);
        // Clear form fields or redirect to login page
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to register. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-lg flex-col gap-6 p-8 bg-white rounded-lg shadow-lg"
      >
        <div>
          <div className="mb-3 block">
            <Label htmlFor="first-name" value="First Name" className="text-xl" />
          </div>
          <TextInput
            id="first-name"
            type="text"
            placeholder="John"
            required
            shadow
            className="p-4 text-lg"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <div className="mb-3 block">
            <Label htmlFor="last-name" value="Last Name" className="text-xl" />
          </div>
          <TextInput
            id="last-name"
            type="text"
            placeholder="Doe"
            required
            shadow
            className="p-4 text-lg"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <div className="mb-3 block">
            <Label htmlFor="email" value="Email" className="text-xl" />
          </div>
          <TextInput
            id="email"
            type="email"
            placeholder="johndoe@gmail.com"
            required
            shadow
            className="p-4 text-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <div className="mb-3 block">
            <Label htmlFor="password" value="Password" className="text-xl" />
          </div>
          <TextInput
            id="password"
            type="password"
            required
            shadow
            className="p-4 text-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <div className="mb-3 block">
            <Label
              htmlFor="repeat-password"
              value="Repeat Password"
              className="text-xl"
            />
          </div>
          <TextInput
            id="repeat-password"
            type="password"
            required
            shadow
            className="p-4 text-lg"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}

        <Button href="login"type="submit" className="text-xl p-4">
          Register New Account
        </Button>
      </form>
    </div>
  );
}
