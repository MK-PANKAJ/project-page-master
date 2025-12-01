import { useState, useEffect } from "react";
import { z } from "zod";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Phone, Mail, Clock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { SEOHead } from "@/components/SEOHead";

// Validation schemas
const contactSchema = z.object({
  name: z.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name contains invalid characters"),
  email: z.string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email too long")
    .toLowerCase(),
  phone: z.string()
    .trim()
    .min(1, "Phone number is required")
    .max(20, "Phone number too long")
    .regex(/^[+]?[0-9\s()-]+$/, "Invalid phone format"),
  inquiryType: z.enum(['general', 'student', 'school', 'partnership'], {
    errorMap: () => ({ message: "Please select a valid inquiry type" })
  }),
  message: z.string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters"),
  privacyAccepted: z.boolean()
    .refine(val => val === true, "You must accept the privacy policy")
});

const bookingSchema = z.object({
  bookingType: z.enum(['student', 'school']),
  name: z.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name contains invalid characters"),
  email: z.string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email too long")
    .toLowerCase(),
  phone: z.string()
    .trim()
    .min(1, "Phone number is required")
    .max(20, "Phone number too long")
    .regex(/^[+]?[0-9\s()-]+$/, "Invalid phone format"),
  message: z.string()
    .trim()
    .max(2000, "Message must be less than 2000 characters")
    .optional()
    .or(z.literal('')),
  organizationName: z.string()
    .trim()
    .max(200, "Organization name must be less than 200 characters")
    .optional()
    .or(z.literal(''))
});

const Contact = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    message: "",
    privacyAccepted: false,
    organizationName: "",
  });

  // Auto-fill form from URL parameters
  useEffect(() => {
    const type = searchParams.get('type');
    const source = searchParams.get('source');
    
    if (type) {
      setFormData(prev => ({
        ...prev,
        inquiryType: type === 'student' || type === 'school' ? type : 'general'
      }));
    }
    
    if (source && type) {
      const messages: Record<string, string> = {
        'student-booking': 'I would like to book a student counseling session.',
        'school-demo': 'I would like to request a demo of your school programs.',
        'school-pricing': 'I would like more information about school program pricing.',
        'resources': 'I have a question about your resources.',
        'testimonials': 'I would like to share my experience or ask about testimonials.',
      };
      
      const messageKey = `${type}-${source}`;
      const message = messages[messageKey] || messages[source] || '';
      
      if (message) {
        setFormData(prev => ({ ...prev, message }));
      }
    }
  }, [searchParams]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.privacyAccepted) {
      toast({
        title: "Privacy Policy Required",
        description: "Please accept our privacy policy to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Validate input
      const validated = contactSchema.parse(formData);

      const { error } = await supabase.from("contact_submissions").insert({
        name: validated.name,
        email: validated.email,
        phone: validated.phone || null,
        inquiry_type: validated.inquiryType,
        message: validated.message,
        privacy_accepted: validated.privacyAccepted,
      });

      if (error) throw error;

      // Send notification email
      const { error: emailError } = await supabase.functions.invoke(
        'send-notification-email',
        { body: { type: 'contact', data: validated } }
      );
      
      if (emailError) {
        console.error('Failed to send notification email:', emailError);
      }

      toast({
        title: "Message Sent!",
        description: "We've received your message and will get back to you within 24-48 hours.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        inquiryType: "",
        message: "",
        privacyAccepted: false,
        organizationName: "",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "There was a problem sending your message. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBooking = async (bookingType: 'student' | 'school') => {
    setIsSubmitting(true);
    
    try {
      // Validate input
      const validated = bookingSchema.parse({
        bookingType,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        organizationName: formData.organizationName
      });

      const { error } = await supabase.from("booking_requests").insert({
        booking_type: validated.bookingType,
        name: validated.name,
        email: validated.email,
        phone: validated.phone || null,
        message: validated.message || null,
        organization_name: validated.organizationName || null,
      });

      if (error) throw error;

      // Send notification email
      const { error: emailError } = await supabase.functions.invoke(
        'send-notification-email',
        { body: { type: 'booking', data: { ...validated, booking_type: bookingType } } }
      );
      
      if (emailError) {
        console.error('Failed to send notification email:', emailError);
      }

      toast({
        title: "Booking Request Sent!",
        description: "We've received your booking request and will contact you soon.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        inquiryType: "",
        message: "",
        privacyAccepted: false,
        organizationName: "",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "There was a problem sending your booking request. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Contact Us - Happy Space World"
        description="Get in touch with us for counseling sessions, school programs, or general inquiries. We're here to help support student mental wellness."
      />
      <div className="min-h-screen flex flex-col">
        <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-purple-50 to-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Get In Touch
              </h1>
              <p className="text-xl text-gray-600">
                Have questions? We're here to help! Reach out to us anytime.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information Cards */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <Phone className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>Phone</CardTitle>
                </CardHeader>
                <CardContent>
                  <a href="tel:+918937915125" className="text-purple-600 hover:underline">
                    +918937915125
                  </a>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <Mail className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>Email</CardTitle>
                </CardHeader>
                <CardContent>
                  <a href="mailto:happyspaceschool@gmail.com" className="text-purple-600 hover:underline">
                    happyspaceschool@gmail.com
                  </a>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-purple-600">Mon-Fri: 9AM-5PM EST</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="inquiryType">Inquiry Type *</Label>
                      <Select
                        value={formData.inquiryType}
                        onValueChange={(value) => handleInputChange("inquiryType", value)}
                        disabled={isSubmitting}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="student">Student Services</SelectItem>
                          <SelectItem value="school">School Partnership</SelectItem>
                          <SelectItem value="partnership">Other Partnership</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your inquiry..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="privacy"
                      checked={formData.privacyAccepted}
                      onCheckedChange={(checked) =>
                        handleInputChange("privacyAccepted", checked as boolean)
                      }
                      disabled={isSubmitting}
                    />
                    <Label htmlFor="privacy" className="text-sm text-gray-600 leading-tight">
                      I agree to the privacy policy and terms of service *
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Booking Sections */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Student Booking */}
              <Card>
                <CardHeader>
                  <CardTitle>I'm a Student</CardTitle>
                  <CardDescription>
                    Book your personal counseling or pet therapy session
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>✓ One-on-one counseling sessions</li>
                    <li>✓ Pet therapy sessions with certified therapy animals</li>
                    <li>✓ Flexible scheduling to fit your needs</li>
                    <li>✓ Safe, confidential environment</li>
                  </ul>
                  <Button
                    className="w-full"
                    onClick={() => handleBooking("student")}
                    disabled={isSubmitting}
                  >
                    Book Student Session
                  </Button>
                </CardContent>
              </Card>

              {/* School Booking */}
              <Card>
                <CardHeader>
                  <CardTitle>I'm a School</CardTitle>
                  <CardDescription>
                    Request information about our school programs
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>✓ On-campus counseling programs</li>
                    <li>✓ Group pet therapy sessions</li>
                    <li>✓ Professional development workshops</li>
                    <li>✓ Customized wellness programs</li>
                  </ul>
                  <Button
                    className="w-full"
                    onClick={() => handleBooking("school")}
                    disabled={isSubmitting}
                  >
                    Get School Information
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        </main>

        <Footer />
      </div>
    </>
  );
};

export default Contact;
