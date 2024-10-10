"use client";

import { useState } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import Link from "next/link";

export function SignUpForm() {
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setError("Passwords do not match");
    } else {
      setError("");
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
            <Label htmlFor="email2" value="Your email" className="text-xl" />
          </div>
          <TextInput
            id="email2"
            type="email"
            placeholder="johndoe@gmail.com"
            required
            shadow
            className="p-4 text-lg"
          />
        </div>
        <div>
          <div className="mb-3 block">
            <Label
              htmlFor="password2"
              value="Your password"
              className="text-xl"
            />
          </div>
          <TextInput
            id="password2"
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
              value="Repeat password"
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

        <Button type="submit" className="text-xl p-4">
          Register new account
        </Button>
      </form>
    </div>
  );
}
