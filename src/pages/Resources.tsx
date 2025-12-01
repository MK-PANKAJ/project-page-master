import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { NewsletterForm } from "@/components/NewsletterForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Video, BookOpen, Download } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface Resource {
  id: string;
  title: string;
  description: string | null;
  category: string;
  file_url: string | null;
  downloads: number;
  audience: string;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'video':
      return Video;
    case 'article':
      return BookOpen;
    case 'worksheet':
    case 'guide':
    default:
      return FileText;
  }
};

const getCategoryLabel = (category: string) => {
  switch (category) {
    case 'worksheet': return 'Worksheet';
    case 'guide': return 'Guide';
    case 'video': return 'Video';
    case 'article': return 'Article';
    default: return category;
  }
};

const Resources = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAudience, setSelectedAudience] = useState<string>('all');

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setResources(data || []);
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredResources = () => {
    if (selectedAudience === 'all') {
      return resources;
    }
    return resources.filter(
      resource => resource.audience === selectedAudience || resource.audience === 'all'
    );
  };

  return (
    <>
      <SEOHead 
        title="Mental Wellness Resources - Happy Space World"
        description="Access free mental health resources, worksheets, and guides for students"
      />
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
            <Tabs defaultValue="all" className="max-w-6xl mx-auto" onValueChange={setSelectedAudience}>
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-12">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="students">For Students</TabsTrigger>
                <TabsTrigger value="parents">For Parents</TabsTrigger>
                <TabsTrigger value="educators">For Educators</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-8">
                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <Card key={i}>
                        <CardHeader>
                          <div className="flex items-start justify-between mb-3">
                            <Skeleton className="w-12 h-12 rounded-lg" />
                            <Skeleton className="h-5 w-20 rounded-full" />
                          </div>
                          <Skeleton className="h-6 w-3/4" />
                        </CardHeader>
                        <CardContent>
                          <Skeleton className="h-16 w-full mb-4" />
                          <Skeleton className="h-8 w-24" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getFilteredResources().map((resource) => {
                      const IconComponent = getCategoryIcon(resource.category);
                      return (
                        <Card key={resource.id} className="hover:shadow-lg transition-all duration-300 border-border">
                          <CardHeader>
                            <div className="flex items-start justify-between mb-3">
                              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                <IconComponent className="h-6 w-6 text-primary" />
                              </div>
                              <span className="text-xs px-3 py-1 bg-secondary/10 text-secondary rounded-full font-medium">
                                {getCategoryLabel(resource.category)}
                              </span>
                            </div>
                            <CardTitle className="text-lg">{resource.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">
                              {resource.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">{resource.downloads} downloads</span>
                              <Button 
                                size="sm" 
                                variant="outline"
                                asChild={!!resource.file_url}
                                disabled={!resource.file_url}
                              >
                                {resource.file_url ? (
                                  <a href={resource.file_url} target="_blank" rel="noopener noreferrer">
                                    <Download className="h-4 w-4 mr-2" />
                                    Access
                                  </a>
                                ) : (
                                  <>
                                    <Download className="h-4 w-4 mr-2" />
                                    Coming Soon
                                  </>
                                )}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="students" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getFilteredResources().map((resource) => {
                    const IconComponent = getCategoryIcon(resource.category);
                    return (
                      <Card key={resource.id} className="hover:shadow-lg transition-all duration-300 border-border">
                        <CardHeader>
                          <div className="flex items-start justify-between mb-3">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                              <IconComponent className="h-6 w-6 text-primary" />
                            </div>
                            <span className="text-xs px-3 py-1 bg-secondary/10 text-secondary rounded-full font-medium">
                              {getCategoryLabel(resource.category)}
                            </span>
                          </div>
                          <CardTitle className="text-lg">{resource.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">
                            {resource.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">{resource.downloads} downloads</span>
                            <Button 
                              size="sm" 
                              variant="outline"
                              asChild={!!resource.file_url}
                              disabled={!resource.file_url}
                            >
                              {resource.file_url ? (
                                <a href={resource.file_url} target="_blank" rel="noopener noreferrer">
                                  <Download className="h-4 w-4 mr-2" />
                                  Access
                                </a>
                              ) : (
                                <>
                                  <Download className="h-4 w-4 mr-2" />
                                  Coming Soon
                                </>
                              )}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="parents" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getFilteredResources().map((resource) => {
                    const IconComponent = getCategoryIcon(resource.category);
                    return (
                      <Card key={resource.id} className="hover:shadow-lg transition-all duration-300 border-border">
                        <CardHeader>
                          <div className="flex items-start justify-between mb-3">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                              <IconComponent className="h-6 w-6 text-primary" />
                            </div>
                            <span className="text-xs px-3 py-1 bg-secondary/10 text-secondary rounded-full font-medium">
                              {getCategoryLabel(resource.category)}
                            </span>
                          </div>
                          <CardTitle className="text-lg">{resource.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">
                            {resource.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">{resource.downloads} downloads</span>
                            <Button 
                              size="sm" 
                              variant="outline"
                              asChild={!!resource.file_url}
                              disabled={!resource.file_url}
                            >
                              {resource.file_url ? (
                                <a href={resource.file_url} target="_blank" rel="noopener noreferrer">
                                  <Download className="h-4 w-4 mr-2" />
                                  Access
                                </a>
                              ) : (
                                <>
                                  <Download className="h-4 w-4 mr-2" />
                                  Coming Soon
                                </>
                              )}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="educators" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getFilteredResources().map((resource) => {
                    const IconComponent = getCategoryIcon(resource.category);
                    return (
                      <Card key={resource.id} className="hover:shadow-lg transition-all duration-300 border-border">
                        <CardHeader>
                          <div className="flex items-start justify-between mb-3">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                              <IconComponent className="h-6 w-6 text-primary" />
                            </div>
                            <span className="text-xs px-3 py-1 bg-secondary/10 text-secondary rounded-full font-medium">
                              {getCategoryLabel(resource.category)}
                            </span>
                          </div>
                          <CardTitle className="text-lg">{resource.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">
                            {resource.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">{resource.downloads} downloads</span>
                            <Button 
                              size="sm" 
                              variant="outline"
                              asChild={!!resource.file_url}
                              disabled={!resource.file_url}
                            >
                              {resource.file_url ? (
                                <a href={resource.file_url} target="_blank" rel="noopener noreferrer">
                                  <Download className="h-4 w-4 mr-2" />
                                  Access
                                </a>
                              ) : (
                                <>
                                  <Download className="h-4 w-4 mr-2" />
                                  Coming Soon
                                </>
                              )}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>
            </Tabs>
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
            <NewsletterForm />
          </div>
        </section>
      </main>

      <Footer />
    </div>
    </>
  );
};

export default Resources;
