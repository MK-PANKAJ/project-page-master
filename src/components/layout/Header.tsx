import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import logo from "@/assets/logo.jpg";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-3">
          <img src={logo} alt="Happy Space World Logo" className="h-10 w-10 object-contain rounded-full" />
          <span className="text-2xl font-bold text-primary">Happy Space World</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/"><NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-primary">Home</NavigationMenuLink></Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>For Students</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4">
                    <li><NavigationMenuLink asChild><Link to="/students" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"><div className="text-sm font-medium">Services</div><p className="text-sm text-muted-foreground">Counseling, pet therapy, and wellness programs</p></Link></NavigationMenuLink></li>
                    <li><NavigationMenuLink asChild><Link to="/resources" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"><div className="text-sm font-medium">Resources</div><p className="text-sm text-muted-foreground">Self-help tools, worksheets, and guides</p></Link></NavigationMenuLink></li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>For Schools</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4">
                    <li><NavigationMenuLink asChild><Link to="/schools" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"><div className="text-sm font-medium">Programs</div><p className="text-sm text-muted-foreground">Campus counseling and pet therapy programs</p></Link></NavigationMenuLink></li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem><Link to="/about"><NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-primary">About</NavigationMenuLink></Link></NavigationMenuItem>
              <NavigationMenuItem><Link to="/blog"><NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-primary">Blog</NavigationMenuLink></Link></NavigationMenuItem>
              <NavigationMenuItem><Link to="/gallery"><NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-primary">Gallery</NavigationMenuLink></Link></NavigationMenuItem>
              <NavigationMenuItem><Link to="/testimonials"><NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-primary">Testimonials</NavigationMenuLink></Link></NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex items-center gap-2">
            <Link to="/contact"><Button className="bg-primary hover:bg-primary-dark text-primary-foreground font-semibold">Book Session</Button></Link>
          </div>
        </div>

        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-md hover:bg-muted" aria-label="Toggle menu">
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <Link to="/" className="block px-4 py-2 rounded-md hover:bg-muted" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/students" className="block px-4 py-2 rounded-md hover:bg-muted" onClick={() => setMobileMenuOpen(false)}>For Students</Link>
            <Link to="/schools" className="block px-4 py-2 rounded-md hover:bg-muted" onClick={() => setMobileMenuOpen(false)}>For Schools</Link>
            <Link to="/about" className="block px-4 py-2 rounded-md hover:bg-muted" onClick={() => setMobileMenuOpen(false)}>About</Link>
            <Link to="/resources" className="block px-4 py-2 rounded-md hover:bg-muted" onClick={() => setMobileMenuOpen(false)}>Resources</Link>
            <Link to="/blog" className="block px-4 py-2 rounded-md hover:bg-muted" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
            <Link to="/gallery" className="block px-4 py-2 rounded-md hover:bg-muted" onClick={() => setMobileMenuOpen(false)}>Gallery</Link>
            <Link to="/testimonials" className="block px-4 py-2 rounded-md hover:bg-muted" onClick={() => setMobileMenuOpen(false)}>Testimonials</Link>
            <Link to="/contact"><Button className="w-full bg-primary hover:bg-primary-dark text-primary-foreground font-semibold" onClick={() => setMobileMenuOpen(false)}>Book Session</Button></Link>
          </nav>
        </div>
      )}
    </header>
  );
};
