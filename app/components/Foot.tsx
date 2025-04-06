"use client";

import { Footer } from "flowbite-react";

export function PageFooter() {
  return (
    <Footer container>
      <Footer.Copyright href="/" by="Kineticare, All Rights Reserved" year={2025} />
      <Footer.LinkGroup>
        <Footer.Link href="/privacy">Privacy Policy</Footer.Link>
        <Footer.Link href="/contact">Contact</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  );
}
