import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { SEOHead } from "@/components/SEOHead";

interface GalleryItem {
  id: string;
  title: string;
  alt_text: string;
  image_url: string;
  collection: string | null;
}

const Gallery = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const itemsPerPage = 9;

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      const { data, error } = await supabase
        .from("gallery_items")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error("Error fetching gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  const collections = Array.from(new Set(items.map(item => item.collection).filter(Boolean)));
  const filteredItems = selectedCollection
    ? items.filter(item => item.collection === selectedCollection)
    : items;

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedImages = filteredItems.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <>
      <SEOHead
        title="Gallery - Happy Space World"
        description="Explore our gallery of student wellness activities, events, and therapy pet sessions."
      />
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-20 bg-gradient-to-br from-primary to-tertiary text-white">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Gallery</h1>
              <p className="text-xl max-w-2xl mx-auto opacity-95">
                Explore moments of joy, growth, and transformation from our programs
              </p>
            </div>
          </section>

          {/* Gallery Grid */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              {collections.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  <Button
                    variant={!selectedCollection ? "default" : "outline"}
                    onClick={() => setSelectedCollection(null)}
                  >
                    All
                  </Button>
                  {collections.map((collection) => (
                    <Button
                      key={collection}
                      variant={selectedCollection === collection ? "default" : "outline"}
                      onClick={() => {
                        setSelectedCollection(collection);
                        setCurrentPage(0);
                      }}
                    >
                      {collection}
                    </Button>
                  ))}
                </div>
              )}

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(9)].map((_, i) => (
                    <Skeleton key={i} className="h-64 rounded-lg" />
                  ))}
                </div>
              ) : paginatedImages.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-muted-foreground">No gallery items found.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                  {paginatedImages.map((image, index) => (
                    <Card
                      key={image.id}
                      className="overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer animate-scale-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={image.image_url}
                          alt={image.alt_text}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                          <p className="text-white p-4 font-semibold">{image.title}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

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
              Want to Be Part of Our Story?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join our programs and create your own moments of growth and happiness
            </p>
            <Button asChild size="lg">
              <a href="/contact#booking">Book Your Session</a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
    </>
  );
};

export default Gallery;
