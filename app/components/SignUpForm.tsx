"use client";

import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import Link from "next/link";

export function SignUpForm() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="flex w-full max-w-lg flex-col gap-6 p-8 bg-white rounded-lg shadow-lg">
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
          />
        </div>
        <div className="flex items-center gap-3">
          <Checkbox id="agree" className="w-5 h-5" />
          <Label htmlFor="agree" className="text-lg flex">
            I agree with the&nbsp;
            <Link
              href="#"
              className="text-cyan-600 hover:underline dark:text-cyan-500"
            >
              terms and conditions
            </Link>
          </Label>
        </div>
        <Button type="submit" className="text-xl p-4">
          Register new account
        </Button>
      </form>
    </div>
  );
}
