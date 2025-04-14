"use client";

import { Footer } from "flowbite-react";
import { usePathname } from "next/navigation";

export function PageFooter() {
    const pathname = usePathname();
    const hiddenNavRoutes = ["/confirm"];
  
    const shouldhideFoot =
      hiddenNavRoutes.includes(pathname) || pathname.match(/^\/plans\/[^/]+\/qr$/);
  
    return !shouldhideFoot ? (
    <Footer container>
      <Footer.Copyright href="/" by="Kineticare, All Rights Reserved" year={2025} />
      <Footer.LinkGroup>
        <Footer.Link href="/privacy">Privacy Policy</Footer.Link>
        <Footer.Link href="/contact">Contact</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  ) : null;
}
