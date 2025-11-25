import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Heart, Brain, TrendingUp, BookOpen, Users, Activity, ArrowRight, Check } from "lucide-react";
import heroImage from "@/assets/hero-students-pets.jpg";
import therapyPetImage from "@/assets/therapy-pet.jpg";
import counselingImage from "@/assets/counseling-session.jpg";
import progressImage from "@/assets/progress-tracking.jpg";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src={heroImage} 
              alt="Students with therapy animals" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-tertiary/85"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Cultivating Calm, Confidence<br />and Connection
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-95">
              Mental Health + Pet Therapy for Students (Classes 8-12)<br />
              Expert Counseling Backed by Sivaram Raghavan's Stop, Look, Go Model
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-secondary hover:bg-secondary-dark text-lg px-8 py-6">
                <Link to="/contact#booking">Start Your Happy Journey</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/10 backdrop-blur border-white text-white hover:bg-white/20">
                <Link to="/schools">For Schools: Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Problem-Solution Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
              Students Face Real Challenges
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-all duration-300 border-border">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-secondary/10 rounded-full flex items-center justify-center">
                    <BookOpen className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">Academic Pressure</h3>
                  <p className="text-muted-foreground">
                    80% of students report exam stress and focus issues affecting their performance
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300 border-border">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-tertiary/10 rounded-full flex items-center justify-center">
                    <Users className="h-8 w-8 text-tertiary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">Social & Relationship Issues</h3>
                  <p className="text-muted-foreground">
                    Peer pressure and conflict impact emotional health and wellbeing
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300 border-border">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <Activity className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">Emotional Overwhelm</h3>
                  <p className="text-muted-foreground">
                    Anxiety, distraction, and loss of motivation affect daily life
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Three Pillars Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
              Happy Space World's Proven Three-Pillar Approach
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              A comprehensive program combining therapy, counseling, and progress tracking
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="h-48 overflow-hidden">
                  <img src={therapyPetImage} alt="Pet Therapy" className="w-full h-full object-cover" />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mr-3">
                      <Heart className="h-6 w-6 text-secondary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Pet Therapy & Activities</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Emotional connection and stress reduction through interaction with trained therapy animals
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                      <span>Paint with Pets</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                      <span>Icebreaking Games</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                      <span>Grounding Exercises</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="h-48 overflow-hidden">
                  <img src={counselingImage} alt="Expert Counseling" className="w-full h-full object-cover" />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                      <Brain className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Expert Counseling</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Personalized guidance using Sivaram Raghavan's Stop, Look, Go mindfulness model
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                      <span>One-on-one sessions</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                      <span>Group discussions</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                      <span>Personalized coaching</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="h-48 overflow-hidden">
                  <img src={progressImage} alt="Progress Tracking" className="w-full h-full object-cover" />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-tertiary/10 rounded-full flex items-center justify-center mr-3">
                      <TrendingUp className="h-6 w-6 text-tertiary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Wellness Tracking</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Measure progress through Happiness & Stress Questionnaires and real-time tracking
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                      <span>Weekly assessments</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                      <span>Progress reports</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                      <span>Milestone celebrations</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Impact Stats Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
                <div className="text-primary-foreground/80">Students Served</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">92%</div>
                <div className="text-primary-foreground/80">Improved Happiness</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">87%</div>
                <div className="text-primary-foreground/80">Reduced Stress</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">100%</div>
                <div className="text-primary-foreground/80">School Recommendations</div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faqs" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
              Frequently Asked Questions
            </h2>
            
            <Accordion type="multiple" defaultValue={["item-1", "item-2", "item-3"]} className="space-y-4">
              <AccordionItem value="item-1" className="bg-card border border-border rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  What is Happy Space World?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Happy Space World is a comprehensive mental wellness program for students in Classes 8-12, combining expert counseling, pet therapy, and progress tracking to help students manage stress, build confidence, and improve their overall wellbeing.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-card border border-border rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  How does pet therapy help?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Pet therapy has been scientifically proven to reduce stress hormones, lower blood pressure, and increase feelings of happiness. Interacting with trained therapy animals helps students relax, build emotional connections, and develop coping mechanisms in a safe, non-judgmental environment.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-card border border-border rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  What is the Stop, Look, Go model?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  The Stop, Look, Go model is Sivaram Raghavan's mindfulness-based approach: Stop (pause and recognize emotions), Look (observe without judgment), and Go (take positive action). This methodology helps students develop emotional awareness and healthy coping strategies.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-card border border-border rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  Is this confidential?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Absolutely. All counseling sessions and student information are kept strictly confidential. We follow best practices in data protection and student privacy to ensure a safe, trustworthy environment.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-card border border-border rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  How much does it cost?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Individual student programs start at ₹3,500, which includes counseling sessions, pet therapy, questionnaires, and activities. School programs have customized pricing based on batch size and requirements. Contact us for a personalized quote.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-secondary to-secondary-light">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to Transform Your Well-being?
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Join hundreds of students who have found their calm, confidence, and connection
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-secondary hover:bg-white/90 text-lg px-8 py-6">
                <Link to="/contact#booking">
                  I'm a Student – Start Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
               <Button asChild size="lg" className="bg-white text-secondary hover:bg-white/90 text-lg px-8 py-6">
                <Link to="/schools">
                  I'm a School – Get Info <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Quick Links to Gallery & Testimonials */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Our Happy Moments & Stories
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore our gallery and read testimonials from students, parents, and educators
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="pt-8 text-center">
                  <h3 className="text-2xl font-bold mb-4 text-foreground">Gallery</h3>
                  <p className="text-muted-foreground mb-6">
                    View photos from our programs and see the joy and transformation firsthand
                  </p>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/gallery">View Gallery</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="pt-8 text-center">
                  <h3 className="text-2xl font-bold mb-4 text-foreground">Testimonials</h3>
                  <p className="text-muted-foreground mb-6">
                    Read real stories from people who've experienced our programs
                  </p>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/testimonials">Read Testimonials</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
