import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import logo from "@/assets/logo.jpg";

export const Header = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

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
              <NavigationMenuItem><Link to="/gallery"><NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-primary">Gallery</NavigationMenuLink></Link></NavigationMenuItem>
              <NavigationMenuItem><Link to="/testimonials"><NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-primary">Testimonials</NavigationMenuLink></Link></NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex items-center gap-2">
            {user ? (
              <Button onClick={handleSignOut} variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">Sign Out</Button>
            ) : (
              <Link to="/auth"><Button variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">Sign In</Button></Link>
            )}
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
            <Link to="/gallery" className="block px-4 py-2 rounded-md hover:bg-muted" onClick={() => setMobileMenuOpen(false)}>Gallery</Link>
            <Link to="/testimonials" className="block px-4 py-2 rounded-md hover:bg-muted" onClick={() => setMobileMenuOpen(false)}>Testimonials</Link>
            {user ? (
              <Button onClick={() => { handleSignOut(); setMobileMenuOpen(false); }} variant="outline" className="w-full border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">Sign Out</Button>
            ) : (
              <Link to="/auth"><Button variant="outline" className="w-full border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground" onClick={() => setMobileMenuOpen(false)}>Sign In</Button></Link>
            )}
            <Link to="/contact"><Button className="w-full bg-primary hover:bg-primary-dark text-primary-foreground font-semibold" onClick={() => setMobileMenuOpen(false)}>Book Session</Button></Link>
          </nav>
        </div>
      )}
    </header>
  );
};
