import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const isOnLanding = req.nextUrl.pathname === "/" || req.nextUrl.pathname === "/confirm"

    if (req.nextauth.token && isOnLanding) {
      return NextResponse.redirect(new URL("/home", req.url))
    }
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
)

export const config = {
    matcher: ["/", "/confirm"],
  }