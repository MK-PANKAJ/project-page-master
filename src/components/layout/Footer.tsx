import { Link } from "react-router-dom";
import { Mail, Phone, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Happy Space World</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Cultivating Calm, Confidence and Connection through expert counseling and pet therapy for students.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* For Students Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">For Students</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/students" className="text-muted-foreground hover:text-primary transition-colors">
                  Services & Programs
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-muted-foreground hover:text-primary transition-colors">
                  Resources & Blog
                </Link>
              </li>
              <li>
                <Link to="/contact#booking" className="text-muted-foreground hover:text-primary transition-colors">
                  Book a Session
                </Link>
              </li>
              <li>
                <Link to="/#faqs" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* For Schools Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">For Schools</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/schools" className="text-muted-foreground hover:text-primary transition-colors">
                  Partnership Program
                </Link>
              </li>
              <li>
                <Link to="/schools#certification" className="text-muted-foreground hover:text-primary transition-colors">
                  School Certification
                </Link>
              </li>
              <li>
                <Link to="/schools#pricing" className="text-muted-foreground hover:text-primary transition-colors">
                  Pricing & Packages
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Request Demo
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <Phone className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                <a href="tel:8937915125" className="text-muted-foreground hover:text-primary transition-colors">
                  8937915125
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <Mail className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                <a href="mailto:happyspaceworld@gmail.com" className="text-muted-foreground hover:text-primary transition-colors break-all">
                  happyspaceworld@gmail.com
                </a>
              </li>
            </ul>
            <div className="pt-2">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                About Us
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} Happy Space World™. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
