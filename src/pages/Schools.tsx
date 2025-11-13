import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Award, TrendingUp, Users, FileCheck, Star, CheckCircle2 } from "lucide-react";

const Schools = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary to-tertiary text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Transform Your School's Mental Wellness
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-95">
              Make your school a mental wellness pioneer with Happy Space World certification and programs
            </p>
            <Button asChild size="lg" className="bg-secondary hover:bg-secondary-dark">
              <Link to="/contact">Request School Demo</Link>
            </Button>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
              Why Schools Choose Happy Space World
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-border">
                <CardHeader>
                  <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mb-3">
                    <TrendingUp className="h-6 w-6 text-success" />
                  </div>
                  <CardTitle>Improved Student Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    92% improvement in happiness index and 87% reduction in stress levels leads to better academic outcomes
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Prestigious Certification</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Earn Happy Space World Certified School status with Gold, Silver, or Bronze tier recognition
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-3">
                    <Users className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle>Enhanced Reputation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Stand out as a wellness-focused institution with certification badge and media visibility
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <div className="w-12 h-12 bg-tertiary/10 rounded-full flex items-center justify-center mb-3">
                    <FileCheck className="h-6 w-6 text-tertiary" />
                  </div>
                  <CardTitle>Comprehensive Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Receive detailed annual wellness reports and data-driven insights about student progress
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mb-3">
                    <Star className="h-6 w-6 text-warning" />
                  </div>
                  <CardTitle>Parent Satisfaction</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Parents notice visible improvements in their children's focus, confidence, and emotional wellbeing
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <div className="w-12 h-12 bg-calm-blue/10 rounded-full flex items-center justify-center mb-3">
                    <CheckCircle2 className="h-6 w-6 text-calm-blue" />
                  </div>
                  <CardTitle>Expert Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Guidance from Sivaram Raghavan and trained counselors using proven methodologies
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Certification Process */}
        <section id="certification" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
              Certification Pathway
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              A simple 5-step process to become a Happy Space World Certified School
            </p>
            
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">Baseline Assessment</h3>
                    <p className="text-muted-foreground">
                      Conduct initial Happiness Index Survey to understand current student mental wellness levels
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">Program Execution</h3>
                    <p className="text-muted-foreground">
                      4-6 week comprehensive program with pet therapy sessions, expert counseling, and wellness activities
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">Post-Program Assessment</h3>
                    <p className="text-muted-foreground">
                      Re-survey students and analyze improvement data to measure program impact
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">Certification Award</h3>
                    <p className="text-muted-foreground">
                      Receive Gold, Silver, or Bronze tier certification based on measurable impact metrics
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                    5
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">Recognition & Media</h3>
                    <p className="text-muted-foreground">
                      Display certification badge, receive media coverage, and get annual wellness reports
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
              Transparent, Flexible Pricing
            </h2>
            <p className="text-center text-muted-foreground mb-12">
              Choose the package that fits your school's needs
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-2xl">Starter Program</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-primary">₹1,05,000</span>
                    <p className="text-sm text-muted-foreground mt-2">Single batch (30 students)</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">6-week program</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">Pet therapy sessions</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">Expert counseling</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">Wellness questionnaires</span>
                    </li>
                  </ul>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/contact">Choose Starter</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-secondary shadow-xl">
                <div className="bg-secondary text-white text-center py-2 text-sm font-semibold">
                  RECOMMENDED
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl">Growth Program</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-primary">₹2,10,000+</span>
                    <p className="text-sm text-muted-foreground mt-2">Multiple batches (60-90 students)</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">All Starter features</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">School certification</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">Annual wellness report</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">Bulk discount pricing</span>
                    </li>
                  </ul>
                  <Button asChild className="w-full bg-secondary hover:bg-secondary-dark">
                    <Link to="/contact">Choose Growth</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-2xl">Premium Program</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-primary">Custom</span>
                    <p className="text-sm text-muted-foreground mt-2">School-wide (90+ students)</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">All Growth features</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">Staff training workshops</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">Parent engagement sessions</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">Media campaign support</span>
                    </li>
                  </ul>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/contact">Request Quote</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
              See the Impact
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-border">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-lg">Delhi Public School</CardTitle>
                    <Award className="h-6 w-6 text-warning" />
                  </div>
                  <p className="text-sm text-muted-foreground">45 students participated</p>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-primary mb-1">78%</div>
                    <p className="text-sm text-muted-foreground">Happiness improvement</p>
                  </div>
                  <p className="text-sm text-muted-foreground italic">
                    "This program transformed our school culture and student wellbeing."
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-lg">Mumbai International</CardTitle>
                    <Award className="h-6 w-6 text-warning" />
                  </div>
                  <p className="text-sm text-muted-foreground">60 students participated</p>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-primary mb-1">85%</div>
                    <p className="text-sm text-muted-foreground">Stress reduction</p>
                  </div>
                  <p className="text-sm text-muted-foreground italic">
                    "Parents noticed visible change in focus and emotional regulation."
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-warning">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-lg">Bangalore Academy</CardTitle>
                    <div className="flex items-center space-x-1">
                      <Star className="h-5 w-5 fill-warning text-warning" />
                      <span className="text-xs font-semibold text-warning">GOLD</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">30 students participated</p>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-primary mb-1">Gold Tier</div>
                    <p className="text-sm text-muted-foreground">Certified Happy Space World</p>
                  </div>
                  <p className="text-sm text-muted-foreground italic">
                    "Best decision we made for our students' mental health."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-tertiary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your School?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-95">
              Join leading schools in prioritizing student mental wellness
            </p>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
              <Link to="/contact">Request a Demo</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Schools;
