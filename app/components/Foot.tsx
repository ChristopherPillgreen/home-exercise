"use client";

import { Footer } from "flowbite-react";

export function PageFooter() {
  return (
    <Footer container>
      <Footer.Copyright href="/" by="Kineticare™" year={2024} />
      <Footer.LinkGroup>
        <Footer.Link href="#">Privacy Policy</Footer.Link>
        <Footer.Link href="#">Licensing</Footer.Link>
        <Footer.Link href="#">Contact</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  );
}
