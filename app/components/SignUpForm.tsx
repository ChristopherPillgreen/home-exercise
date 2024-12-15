"use client";

import { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";

export function SignUpForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setSuccess("");

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

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "An error occurred");
      } else {
        const result = await response.json();
        setSuccess("User created successfully!");
        // Optionally, reset the form fields
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setRepeatPassword("");

        router.push("/login");
      }
    } catch (error) {
      setError("An error occurred while creating the user");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col gap-4 p-6 bg-white rounded-lg shadow-lg"
      >
        <div>
          <Label
            htmlFor="first-name"
            value="First Name"
            className="text-sm font-medium"
          />
          <TextInput
            id="first-name"
            type="text"
            placeholder="John"
            required
            shadow
            className="p-2 text-sm"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <Label
            htmlFor="last-name"
            value="Last Name"
            className="text-sm font-medium"
          />
          <TextInput
            id="last-name"
            type="text"
            placeholder="Doe"
            required
            shadow
            className="p-2 text-sm"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <Label
            htmlFor="email"
            value="Email"
            className="text-sm font-medium"
          />
          <TextInput
            id="email"
            type="email"
            placeholder="johndoe@gmail.com"
            required
            shadow
            className="p-2 text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <Label
            htmlFor="password"
            value="Password"
            className="text-sm font-medium"
          />
          <TextInput
            id="password"
            type="password"
            required
            shadow
            className="p-2 text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <Label
            htmlFor="repeat-password"
            value="Repeat Password"
            className="text-sm font-medium"
          />
          <TextInput
            id="repeat-password"
            type="password"
            required
            shadow
            className="p-2 text-sm"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}

        <Button type="submit" className="text-sm p-3 mt-4">
          Register New Account
        </Button>
      </form>
    </div>
  );
}
