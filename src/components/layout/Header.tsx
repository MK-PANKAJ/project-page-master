import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-primary">Happy Space</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-primary focus:bg-muted focus:text-primary focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>For Students</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/students"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Services</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Counseling, pet therapy, and wellness programs
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/resources"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Resources</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Self-help tools, worksheets, and guides
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>For Schools</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/schools"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Program Overview</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Transform your school's mental wellness
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/schools#certification"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Certification</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Become a Happy Space Certified School
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/about">
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-primary focus:bg-muted focus:text-primary focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/contact">
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-primary focus:bg-muted focus:text-primary focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Button asChild variant="default" className="bg-secondary hover:bg-secondary-dark">
            <Link to="/contact#booking">Book Session</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container mx-auto px-4 py-4 space-y-3">
            <Link
              to="/"
              className="block py-2 text-foreground hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/students"
              className="block py-2 text-foreground hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              For Students
            </Link>
            <Link
              to="/schools"
              className="block py-2 text-foreground hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              For Schools
            </Link>
            <Link
              to="/about"
              className="block py-2 text-foreground hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/resources"
              className="block py-2 text-foreground hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Resources
            </Link>
            <Link
              to="/contact"
              className="block py-2 text-foreground hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Button asChild className="w-full bg-secondary hover:bg-secondary-dark">
              <Link to="/contact#booking" onClick={() => setMobileMenuOpen(false)}>
                Book Session
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
