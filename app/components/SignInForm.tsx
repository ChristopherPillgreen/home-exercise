"use client";

import { Button, Checkbox, Label, TextInput } from "flowbite-react";

export function SignInForm() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="flex w-full max-w-lg flex-col gap-6 p-8 bg-white rounded-lg shadow-lg">
        <div>
          <div className="mb-3 block">
            <Label htmlFor="email1" value="Your email" className="text-xl" />
          </div>
          <TextInput
            id="email1"
            type="email"
            placeholder="name@flowbite.com"
            required
            className="p-4 text-lg"
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
          />
        </div>
        <div className="flex items-center gap-3">
          <Checkbox id="remember" className="w-5 h-5" />
          <Label htmlFor="remember" className="text-lg">
            Remember me
          </Label>
        </div>
        <Button type="submit" className="text-xl p-4">
          Submit
        </Button>
      </form>
    </div>
  );
}
