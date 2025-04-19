"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const hiddenNavRoutes = ["/confirm"];

  const shouldhideFoot =
    hiddenNavRoutes.includes(pathname) ||
    pathname.match(/^\/plans\/[^/]+\/qr$/);

  return !shouldhideFoot ? (
    <div className="flex p-3 justify-between">
      <a
        href="/home"
        title="Copyright"
        className="flex underline text-xs text-gray-500">
        © Kineticare, 2025 All rights reserved.
      </a>
      <div className="flex-end">
        <div className="flex space-x-1 sm:space-x-5">
          <a
            href="/privacy"
            title="Terms of Service"
            className="flex underline text-xs text-gray-500">
            Privacy Policy
          </a>
          <a
            href="/contact"
            title="Terms of Service"
            className="flex underline text-xs text-gray-500">
            Contact
          </a>
        </div>
      </div>
    </div>
  ) : null;
}
