import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary to-tertiary text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl max-w-2xl mx-auto opacity-95">
              Have questions? We're here to help you start your wellness journey
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto -mt-20 relative z-10">
              <Card className="text-center shadow-lg">
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2 text-foreground">Call Us</h3>
                  <a href="tel:8937915125" className="text-muted-foreground hover:text-primary transition-colors">
                    8937915125
                  </a>
                  <p className="text-sm text-muted-foreground mt-2">Mon-Sat, 9AM-6PM</p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-lg">
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="font-semibold mb-2 text-foreground">Email Us</h3>
                  <a 
                    href="mailto:happyspaceworld@gmail.com" 
                    className="text-muted-foreground hover:text-primary transition-colors text-sm break-all"
                  >
                    happyspaceworld@gmail.com
                  </a>
                  <p className="text-sm text-muted-foreground mt-2">24-48 hour response</p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-lg">
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 bg-tertiary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-tertiary" />
                  </div>
                  <h3 className="font-semibold mb-2 text-foreground">Office Hours</h3>
                  <p className="text-muted-foreground text-sm">Monday - Friday</p>
                  <p className="text-muted-foreground text-sm">9:00 AM - 6:00 PM</p>
                  <p className="text-sm text-muted-foreground mt-2">Saturday: 10AM-4PM</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section id="booking" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                  Send Us a Message
                </h2>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you within 24 hours
                </p>
              </div>

              <Card className="border-border">
                <CardContent className="p-8">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input id="name" placeholder="Your name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input id="email" type="email" placeholder="your@email.com" required />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input id="phone" type="tel" placeholder="Your phone number" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Inquiry Type *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select inquiry type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="student">Student Inquiry</SelectItem>
                            <SelectItem value="school">School Partnership</SelectItem>
                            <SelectItem value="general">General Question</SelectItem>
                            <SelectItem value="feedback">Feedback</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us how we can help you..."
                        rows={6}
                        required
                      />
                    </div>

                    <div className="flex items-start space-x-2">
                      <input type="checkbox" id="privacy" className="mt-1" required />
                      <Label htmlFor="privacy" className="text-sm text-muted-foreground cursor-pointer">
                        I agree to the privacy policy and consent to Happy Space World storing and processing my information
                      </Label>
                    </div>

                    <Button type="submit" size="lg" className="w-full md:w-auto">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Booking Options */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
              Ready to Book?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="border-2 border-secondary hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl">I'm a Student</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    Book individual counseling sessions or join group wellness programs
                  </p>
                  <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                    <li>• 1-on-1 expert counseling</li>
                    <li>• Pet therapy activities</li>
                    <li>• Progress tracking dashboard</li>
                    <li>• Starting at ₹3,500</li>
                  </ul>
                  <Button className="w-full bg-secondary hover:bg-secondary-dark">
                    Book Student Session
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl">I'm a School</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    Request a demo and explore partnership options for your school
                  </p>
                  <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                    <li>• Batch programs for 30+ students</li>
                    <li>• School certification program</li>
                    <li>• Comprehensive wellness reports</li>
                    <li>• Custom pricing available</li>
                  </ul>
                  <Button className="w-full" variant="outline">
                    Request School Demo
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Quick Links */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6 text-foreground">
              Have Questions First?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Check out our frequently asked questions or explore our resources
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline" size="lg">
                <a href="/#faqs">View FAQs</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="/resources">Browse Resources</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
