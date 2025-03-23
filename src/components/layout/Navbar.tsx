
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Menu, X, Bell, User, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = ({ toggleSidebar }: { toggleSidebar?: () => void }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLandingPage = location.pathname === "/";

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled 
          ? "bg-white/80 backdrop-blur-md shadow-sm" 
          : isLandingPage 
            ? "bg-transparent" 
            : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and hamburger menu */}
          <div className="flex items-center">
            {isAuthenticated && toggleSidebar && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="mr-2 md:hidden" 
                onClick={toggleSidebar}
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}
            <Link 
              to="/" 
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">CM</span>
              </div>
              <span className={`font-semibold text-lg ${
                isLandingPage && !isScrolled ? "text-white" : "text-gray-900"
              }`}>
                ContentMod
              </span>
            </Link>
          </div>

          {/* Middle - Navigation */}
          {isLandingPage && (
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                to="/" 
                className={`transition-colors duration-300 ${
                  isScrolled ? "text-gray-900 hover:text-brand-500" : "text-white/90 hover:text-white"
                }`}
              >
                Home
              </Link>
              <Link 
                to="/features" 
                className={`transition-colors duration-300 ${
                  isScrolled ? "text-gray-900 hover:text-brand-500" : "text-white/90 hover:text-white"
                }`}
              >
                Features
              </Link>
              <Link 
                to="/pricing" 
                className={`transition-colors duration-300 ${
                  isScrolled ? "text-gray-900 hover:text-brand-500" : "text-white/90 hover:text-white"
                }`}
              >
                Pricing
              </Link>
              <Link 
                to="/about" 
                className={`transition-colors duration-300 ${
                  isScrolled ? "text-gray-900 hover:text-brand-500" : "text-white/90 hover:text-white"
                }`}
              >
                About
              </Link>
            </div>
          )}

          {/* Right side - Auth buttons or user menu */}
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="relative"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="relative h-8 w-8 rounded-full"
                    >
                      <div className="h-8 w-8 rounded-full bg-brand-100 flex items-center justify-center">
                        <span className="text-brand-800 font-semibold">
                          {user?.name.charAt(0)}
                        </span>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100">
                        <span className="text-brand-800 font-semibold">
                          {user?.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex flex-col space-y-0.5">
                        <p className="text-sm font-medium">{user?.name}</p>
                        <p className="text-xs text-muted-foreground">{user?.email}</p>
                      </div>
                    </div>
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer flex w-full items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="cursor-pointer text-red-500 focus:text-red-500" 
                      onClick={logout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/signin">
                  <Button variant="ghost" className={
                    isLandingPage && !isScrolled 
                      ? "text-white hover:bg-white/10" 
                      : "text-gray-900"
                  }>
                    Sign in
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-brand-500 text-white hover:bg-brand-600">
                    Sign up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
