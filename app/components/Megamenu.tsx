import { Button, MegaMenu, Navbar } from "flowbite-react";
import { signIn, signOut, useSession } from "next-auth/react"; // Import the signIn, signOut, and useSession functions from next-auth

export default function Nav() {
  const { data: session } = useSession(); // Get the user's session status
  const handleGoogleSignIn = () => {
    signIn("google"); // Redirects the user to Google login
  };

  const handleLogout = () => {
    signOut(); // Signs out the user
  };

  return (
    <MegaMenu>
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4 md:space-x-8">
        <Navbar.Brand href="/home">
          <img alt="" src="logo.png" className="h-16 w-auto" />
        </Navbar.Brand>
        <div className="order-2 hidden items-center md:flex">
          {session ? (
            <Button onClick={handleLogout} style={{ backgroundColor: "#af7076" }}>
              Logout
            </Button>
          ) : (
            <Button onClick={handleGoogleSignIn} style={{ backgroundColor: "#74ac85" }}>
              Sign in with Google
            </Button>
          )}
        </div>
        <Navbar.Collapse>
          <Navbar.Link href="/plans">Plans</Navbar.Link>
          <Navbar.Link href="/about">About</Navbar.Link>
        </Navbar.Collapse>
      </div>
    </MegaMenu>
  );
}
