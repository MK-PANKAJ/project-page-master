import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Video, BookOpen, Download } from "lucide-react";

const Resources = () => {
  const resources = [
    {
      title: "5 Mindfulness Techniques for Exam Stress",
      category: "For Students",
      type: "PDF",
      description: "Practical breathing exercises and mindfulness practices to manage test anxiety",
      icon: FileText,
    },
    {
      title: "Understanding the Stop, Look, Go Model",
      category: "For Parents",
      type: "Video",
      description: "A detailed explanation of Sivaram Raghavan's mindfulness methodology",
      icon: Video,
    },
    {
      title: "Pet Therapy Benefits: A Scientific Guide",
      category: "For Educators",
      type: "Article",
      description: "Research-backed evidence on how animal therapy reduces stress",
      icon: BookOpen,
    },
    {
      title: "Grounding Exercises Worksheet",
      category: "For Students",
      type: "PDF",
      description: "Downloadable activities to help stay present during anxious moments",
      icon: FileText,
    },
    {
      title: "Talking to Your Child About Mental Health",
      category: "For Parents",
      type: "Article",
      description: "Tips for opening conversations about emotions and wellbeing",
      icon: BookOpen,
    },
    {
      title: "Building Emotional Intelligence in Teens",
      category: "For Educators",
      type: "Video",
      description: "Strategies for helping students develop self-awareness and empathy",
      icon: Video,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-tertiary to-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Mental Health & Wellness Resources
            </h1>
            <p className="text-xl max-w-3xl mx-auto opacity-95">
              Free tools, guides, and insights to support your mental wellness journey
            </p>
          </div>
        </section>

        {/* Resources Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="all" className="max-w-6xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-12">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="students">For Students</TabsTrigger>
                <TabsTrigger value="parents">For Parents</TabsTrigger>
                <TabsTrigger value="educators">For Educators</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {resources.map((resource, index) => (
                    <Card key={index} className="hover:shadow-lg transition-all duration-300 border-border">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-3">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <resource.icon className="h-6 w-6 text-primary" />
                          </div>
                          <span className="text-xs px-3 py-1 bg-secondary/10 text-secondary rounded-full font-medium">
                            {resource.type}
                          </span>
                        </div>
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          {resource.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">{resource.category}</span>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Access
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="students">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {resources
                    .filter((r) => r.category === "For Students")
                    .map((resource, index) => (
                      <Card key={index} className="hover:shadow-lg transition-all duration-300 border-border">
                        <CardHeader>
                          <div className="flex items-start justify-between mb-3">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                              <resource.icon className="h-6 w-6 text-primary" />
                            </div>
                            <span className="text-xs px-3 py-1 bg-secondary/10 text-secondary rounded-full font-medium">
                              {resource.type}
                            </span>
                          </div>
                          <CardTitle className="text-lg">{resource.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">
                            {resource.description}
                          </p>
                          <Button size="sm" variant="outline" className="w-full">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="parents">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {resources
                    .filter((r) => r.category === "For Parents")
                    .map((resource, index) => (
                      <Card key={index} className="hover:shadow-lg transition-all duration-300 border-border">
                        <CardHeader>
                          <div className="flex items-start justify-between mb-3">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                              <resource.icon className="h-6 w-6 text-primary" />
                            </div>
                            <span className="text-xs px-3 py-1 bg-secondary/10 text-secondary rounded-full font-medium">
                              {resource.type}
                            </span>
                          </div>
                          <CardTitle className="text-lg">{resource.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">
                            {resource.description}
                          </p>
                          <Button size="sm" variant="outline" className="w-full">
                            <Download className="h-4 w-4 mr-2" />
                            Access
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="educators">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {resources
                    .filter((r) => r.category === "For Educators")
                    .map((resource, index) => (
                      <Card key={index} className="hover:shadow-lg transition-all duration-300 border-border">
                        <CardHeader>
                          <div className="flex items-start justify-between mb-3">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                              <resource.icon className="h-6 w-6 text-primary" />
                            </div>
                            <span className="text-xs px-3 py-1 bg-secondary/10 text-secondary rounded-full font-medium">
                              {resource.type}
                            </span>
                          </div>
                          <CardTitle className="text-lg">{resource.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">
                            {resource.description}
                          </p>
                          <Button size="sm" variant="outline" className="w-full">
                            <Download className="h-4 w-4 mr-2" />
                            Access
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Blog Preview Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
              Latest from Our Blog
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Expert insights and tips for mental wellness
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="h-48 bg-gradient-to-br from-primary to-primary-light"></div>
                <CardHeader>
                  <CardTitle className="text-lg">
                    How to Recognize Signs of Student Stress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Early warning signs parents and teachers should watch for, and steps to take when you notice them.
                  </p>
                  <Button variant="link" className="px-0">
                    Read More →
                  </Button>
                </CardContent>
              </Card>

              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="h-48 bg-gradient-to-br from-secondary to-secondary-light"></div>
                <CardHeader>
                  <CardTitle className="text-lg">
                    The Science Behind Pet Therapy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Understanding how interactions with therapy animals affect brain chemistry and emotional regulation.
                  </p>
                  <Button variant="link" className="px-0">
                    Read More →
                  </Button>
                </CardContent>
              </Card>

              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="h-48 bg-gradient-to-br from-tertiary to-tertiary-light"></div>
                <CardHeader>
                  <CardTitle className="text-lg">
                    5 Daily Mindfulness Practices for Teens
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Simple, practical techniques students can use anytime, anywhere to manage stress and stay grounded.
                  </p>
                  <Button variant="link" className="px-0">
                    Read More →
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Get Weekly Wellness Tips
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-95">
              Subscribe to receive helpful mental health resources and updates
            </p>
            <form className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-foreground"
              />
              <Button type="submit" className="bg-secondary hover:bg-secondary-dark">
                Subscribe
              </Button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Resources;
