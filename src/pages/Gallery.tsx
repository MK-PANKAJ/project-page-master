import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-students-pets.jpg";
import therapyPetImage from "@/assets/therapy-pet.jpg";
import counselingImage from "@/assets/counseling-session.jpg";
import progressImage from "@/assets/progress-tracking.jpg";

interface GalleryImage {
  src: string;
  alt: string;
  title?: string;
}

const Gallery = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 9;

  const galleryImages: GalleryImage[] = [
    { src: heroImage, alt: "Students with therapy pets", title: "Happy Students" },
    { src: therapyPetImage, alt: "Therapy pet session", title: "Therapy Sessions" },
    { src: counselingImage, alt: "Counseling session", title: "Counseling" },
    { src: progressImage, alt: "Progress tracking", title: "Progress Reports" },
    { src: heroImage, alt: "Group activity", title: "Group Activities" },
    { src: therapyPetImage, alt: "Pet interaction", title: "Pet Therapy" },
    { src: counselingImage, alt: "Individual counseling", title: "One-on-One Sessions" },
    { src: progressImage, alt: "Achievement tracking", title: "Student Success" },
    { src: heroImage, alt: "Outdoor activities", title: "Outdoor Programs" },
  ];

  const totalPages = Math.ceil(galleryImages.length / itemsPerPage);
  const paginatedImages = galleryImages.slice(
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Gallery</h1>
            <p className="text-xl max-w-2xl mx-auto opacity-95">
              Explore moments of joy, growth, and transformation from our programs
            </p>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {paginatedImages.map((image, index) => (
                <Card
                  key={`${currentPage}-${index}`}
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {image.title && (
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <p className="text-white p-4 font-semibold">{image.title}</p>
                      </div>
                    )}
                  </div>
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
  );
};

export default Gallery;
