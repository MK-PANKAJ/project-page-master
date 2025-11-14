import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  initial: string;
  colorClass: string;
}

const Testimonials = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  const testimonials: Testimonial[] = [
    {
      name: "Priya Sharma",
      role: "Student, Class 10",
      content: "The therapy sessions with the dogs helped me manage my anxiety before exams. I feel much more confident now!",
      rating: 5,
      initial: "P",
      colorClass: "bg-primary/20 text-primary",
    },
    {
      name: "Rajesh Kumar",
      role: "Parent",
      content: "My daughter's emotional intelligence has improved significantly. The program is truly transformative.",
      rating: 5,
      initial: "R",
      colorClass: "bg-secondary/20 text-secondary",
    },
    {
      name: "Anita Desai",
      role: "School Principal",
      content: "Happy Space World's school certification program has made our campus a haven for student wellness.",
      rating: 5,
      initial: "A",
      colorClass: "bg-tertiary/20 text-tertiary",
    },
    {
      name: "Arjun Patel",
      role: "Student, Class 12",
      content: "The counseling sessions helped me deal with peer pressure. I'm grateful for this program.",
      rating: 5,
      initial: "A",
      colorClass: "bg-primary/20 text-primary",
    },
    {
      name: "Meera Singh",
      role: "Teacher",
      content: "The positive impact on our students' mental health is remarkable. Highly recommend!",
      rating: 5,
      initial: "M",
      colorClass: "bg-secondary/20 text-secondary",
    },
    {
      name: "Vikram Reddy",
      role: "Student, Class 9",
      content: "I learned so many coping strategies. The therapy pets are amazing companions!",
      rating: 5,
      initial: "V",
      colorClass: "bg-tertiary/20 text-tertiary",
    },
  ];

  const totalPages = Math.ceil(testimonials.length / itemsPerPage);
  const paginatedTestimonials = testimonials.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary to-tertiary text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              What People Say About Us
            </h1>
            <p className="text-xl max-w-2xl mx-auto opacity-95">
              Real stories from students, parents, and educators who've experienced transformation
            </p>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {paginatedTestimonials.map((testimonial, index) => (
                <Card
                  key={`${currentPage}-${index}`}
                  className="hover:shadow-lg transition-all duration-300 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${testimonial.colorClass}`}
                      >
                        {testimonial.initial}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex mb-3">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-amber text-amber"
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      "{testimonial.content}"
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-12">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
                  disabled={currentPage === 0}
                  className="hover-scale"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {currentPage + 1} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))}
                  disabled={currentPage === totalPages - 1}
                  className="hover-scale"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 to-tertiary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Ready to Start Your Journey?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join hundreds of students who have transformed their lives with our programs
            </p>
            <Button asChild size="lg">
              <a href="/contact#booking">Get Started Today</a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Testimonials;
