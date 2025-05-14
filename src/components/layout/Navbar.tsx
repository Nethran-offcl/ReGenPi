import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthModal from "../auth/AuthModal";

const navItems = [
  { name: "Home", path: "/" },
  { name: "List Waste", path: "/input" },
  { name: "Find Materials", path: "/matchmaking" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" }
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-regen-green to-regen-blue flex items-center justify-center text-white">
                R
              </div>
              <span className="font-bold text-lg tracking-tight">Re-Genπ</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === item.path ? "text-primary" : "text-foreground/70"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              className="hidden md:flex"
              onClick={() => setAuthModalOpen(true)}
            >
              Sign In
            </Button>
            <Button 
              className="hidden md:flex"
              onClick={() => setAuthModalOpen(true)}
            >
              Sign Up
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </header>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-background md:hidden pt-16">
          <nav className="container flex flex-col gap-4 p-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 text-lg font-medium rounded-md ${
                  location.pathname === item.path 
                    ? "bg-primary/10 text-primary" 
                    : "hover:bg-muted"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex flex-col gap-2 mt-4">
              <Button variant="outline" onClick={() => {
                setMobileMenuOpen(false);
                setAuthModalOpen(true);
              }}>
                Sign In
              </Button>
              <Button onClick={() => {
                setMobileMenuOpen(false);
                setAuthModalOpen(true);
              }}>
                Sign Up
              </Button>
            </div>
          </nav>
        </div>
      )}

      <AuthModal 
        open={authModalOpen}
        onOpenChange={setAuthModalOpen}
      />
    </>
  );
}

export default Navbar;
