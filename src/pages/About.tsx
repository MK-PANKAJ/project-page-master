import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Brain, Award } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary to-primary-light text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Happy Space World</h1>
            <p className="text-xl max-w-3xl mx-auto opacity-95">
              Empowering student mental wellness through innovative pet therapy and expert counseling
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Our Story</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Happy Space World was founded with a simple yet powerful vision: to create a safe, supportive environment where every student can thrive emotionally and mentally during their crucial teenage years.
                  </p>
                  <p>
                    We recognized that students in Classes 8-12 face unprecedented challenges—academic pressure, social dynamics, and emotional overwhelm. Traditional approaches weren't enough. We needed something different, something holistic.
                  </p>
                  <p>
                    That's why we combined the proven benefits of pet therapy with expert counseling, grounded in Sivaram Raghavan's Stop, Look, Go mindfulness model. The result? A comprehensive program that has helped over 500 students find their calm, build confidence, and create meaningful connections.
                  </p>
                </div>
              </div>
              <div className="bg-muted/50 rounded-xl p-8">
                <h3 className="text-2xl font-semibold mb-6 text-foreground">Our Mission</h3>
                <p className="text-muted-foreground mb-6">
                  To cultivate calm, confidence, and connection in every student through accessible, compassionate, and effective mental wellness programs that combine the healing power of animals with expert psychological guidance.
                </p>
                <h3 className="text-2xl font-semibold mb-6 text-foreground">Our Vision</h3>
                <p className="text-muted-foreground">
                  A future where every school prioritizes mental wellness as much as academic excellence, and where every student has the tools and support they need to navigate life's challenges with resilience and hope.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Meet the Expert */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
              Meet the Expert
            </h2>
            
            <Card className="max-w-4xl mx-auto border-2 border-primary">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-1">
                    <div className="w-48 h-48 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                      <div className="text-6xl font-bold text-primary">SR</div>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <h3 className="text-3xl font-bold mb-2 text-foreground">Sivaram Raghavan</h3>
                    <p className="text-lg text-primary mb-4">Counselor, Coach, Mediator</p>
                    
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        With over years of experience in counseling and mental health support, Sivaram Raghavan has dedicated his career to helping young people navigate the complexities of adolescence and early adulthood.
                      </p>
                      <p>
                        His groundbreaking <strong className="text-foreground">"Stop, Look, Go"</strong> mindfulness model has transformed the way students approach stress, anxiety, and emotional challenges. This three-step approach teaches students to pause (Stop), observe their thoughts and feelings without judgment (Look), and take constructive action (Go).
                      </p>
                      <p>
                        Sivaram's unique integration of pet therapy with traditional counseling methods has proven remarkably effective, with over 90% of students reporting significant improvements in their mental wellbeing.
                      </p>
                    </div>

                    <div className="mt-6 p-4 bg-secondary/10 rounded-lg border-l-4 border-secondary">
                      <p className="italic text-foreground">
                        "Mental health is not a destination, it's a journey. And every student deserves a guide who believes in their potential to heal and grow."
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">— Sivaram Raghavan</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Our Approach */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
              Our Unique Approach
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card className="border-border">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Heart className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-4 text-foreground">Pet Therapy Science</h3>
                  <p className="text-muted-foreground text-sm">
                    Animal-assisted therapy has been scientifically proven to reduce cortisol levels (the stress hormone), lower blood pressure, and increase oxytocin (the bonding hormone). Our trained therapy animals provide unconditional acceptance, helping students feel safe to express their emotions.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Brain className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-4 text-foreground">Stop, Look, Go Model</h3>
                  <p className="text-muted-foreground text-sm">
                    This mindfulness-based cognitive approach teaches students practical skills: Stop (recognize emotional triggers), Look (observe thoughts without judgment), Go (choose healthy responses). It's simple, memorable, and highly effective for teens navigating complex emotions.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-tertiary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Award className="h-8 w-8 text-tertiary" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-4 text-foreground">Certification Methodology</h3>
                  <p className="text-muted-foreground text-sm">
                    Our school certification program is based on measurable outcomes—pre and post-program assessments of happiness and stress levels. Schools are awarded Gold, Silver, or Bronze tiers based on demonstrated impact, ensuring accountability and excellence.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
              Our Core Values
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">C</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">Compassion</h3>
                  <p className="text-sm text-muted-foreground">
                    Every student deserves to be heard, understood, and supported without judgment
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-secondary font-bold">E</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">Evidence-Based</h3>
                  <p className="text-sm text-muted-foreground">
                    Our methods are grounded in research and proven to create lasting positive change
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-tertiary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-tertiary font-bold">A</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">Accessibility</h3>
                  <p className="text-sm text-muted-foreground">
                    Mental wellness support should be available to all students, regardless of background
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-success font-bold">E</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">Excellence</h3>
                  <p className="text-sm text-muted-foreground">
                    We hold ourselves to the highest standards of professional practice and student care
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 bg-gradient-to-r from-primary to-tertiary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Want to Learn More?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-95">
              We'd love to tell you more about our programs and answer any questions
            </p>
            <a
              href="mailto:happyspaceworld@gmail.com"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-white/90 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
