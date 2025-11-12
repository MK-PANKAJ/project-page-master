import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { User, Users, BookOpen, Calendar, TrendingUp, Award } from "lucide-react";

const Students = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary to-primary-light text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Your Personal Wellness Hub</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-95">
              Track your progress, celebrate your success, and discover your path to calm and confidence
            </p>
            <Button asChild size="lg" className="bg-secondary hover:bg-secondary-dark">
              <Link to="/contact#booking">Book Your First Session</Link>
            </Button>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
              Our Services for Students
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>1-on-1 Expert Counseling</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Personalized guidance from Sivaram Raghavan's network of trained counselors
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                    <li>• Duration: 45-60 minutes</li>
                    <li>• Frequency: Weekly or bi-weekly</li>
                    <li>• Confidential & supportive</li>
                  </ul>
                  <Button asChild className="w-full">
                    <Link to="/contact#booking">Book Session</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 border-2 border-secondary">
                <CardHeader>
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                    <Users className="h-8 w-8 text-secondary" />
                  </div>
                  <CardTitle>Group Wellness Programs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Pet therapy, icebreakers, and group discussions with your schoolmates
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                    <li>• Max 30 students per group</li>
                    <li>• Duration: 60-90 minutes</li>
                    <li>• Interactive & fun activities</li>
                  </ul>
                  <Button asChild className="w-full bg-secondary hover:bg-secondary-dark">
                    <Link to="/contact#booking">Join Program</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-tertiary/10 rounded-full flex items-center justify-center mb-4">
                    <BookOpen className="h-8 w-8 text-tertiary" />
                  </div>
                  <CardTitle>Digital Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Self-help tools, worksheets, video tutorials, and blog content
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                    <li>• Available 24/7</li>
                    <li>• Downloadable materials</li>
                    <li>• Mobile-friendly access</li>
                  </ul>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/resources">Explore Resources</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* What You'll Get Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
              What You'll Experience
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Regular Sessions</h3>
                  <p className="text-muted-foreground">
                    Schedule weekly or bi-weekly sessions that fit your school routine and personal needs
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Progress Tracking</h3>
                  <p className="text-muted-foreground">
                    Monitor your mood, stress levels, and happiness scores with weekly check-ins
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-tertiary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Award className="h-6 w-6 text-tertiary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Achievement Badges</h3>
                  <p className="text-muted-foreground">
                    Earn recognition for milestones like session completion and progress streaks
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="h-6 w-6 text-success" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Peer Support</h3>
                  <p className="text-muted-foreground">
                    Connect with other students in group activities and build a supportive community
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
              Simple, Transparent Pricing
            </h2>
            <p className="text-center text-muted-foreground mb-12">
              Invest in your mental wellness with our comprehensive program
            </p>
            
            <Card className="max-w-md mx-auto border-2 border-primary">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-3xl font-bold text-foreground">Student Package</CardTitle>
                <div className="mt-4">
                  <span className="text-5xl font-bold text-primary">₹3,500</span>
                  <span className="text-muted-foreground"> / student</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-success/10 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                      <svg className="h-4 w-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-muted-foreground">Expert counseling sessions</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-success/10 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                      <svg className="h-4 w-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-muted-foreground">Pet therapy activities</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-success/10 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                      <svg className="h-4 w-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-muted-foreground">Happiness & stress questionnaires</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-success/10 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                      <svg className="h-4 w-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-muted-foreground">Progress tracking dashboard</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-success/10 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                      <svg className="h-4 w-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-muted-foreground">Digital resources access</span>
                  </li>
                </ul>
                <Button asChild className="w-full" size="lg">
                  <Link to="/contact#booking">Get Started Today</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-tertiary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-95">
              Join Happy Space today and discover a calmer, more confident you
            </p>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
              <Link to="/contact#booking">Book Your First Session</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Students;
