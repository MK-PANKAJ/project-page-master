import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GalleryImage {
  src: string;
  alt: string;
  title?: string;
}

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  initial: string;
  colorClass: string;
}

interface GalleryTestimonialsProps {
  images: GalleryImage[];
  testimonials: Testimonial[];
}

export const GalleryTestimonials = ({ images, testimonials }: GalleryTestimonialsProps) => {
  const [currentGalleryPage, setCurrentGalleryPage] = useState(0);
  const [currentTestimonialPage, setCurrentTestimonialPage] = useState(0);
  
  const itemsPerPage = 6;
  const totalGalleryPages = Math.ceil(images.length / itemsPerPage);
  const totalTestimonialPages = Math.ceil(testimonials.length / itemsPerPage);

  const paginatedImages = images.slice(
    currentGalleryPage * itemsPerPage,
    (currentGalleryPage + 1) * itemsPerPage
  );

  const paginatedTestimonials = testimonials.slice(
    currentTestimonialPage * itemsPerPage,
    (currentTestimonialPage + 1) * itemsPerPage
  );

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <Tabs defaultValue="gallery" className="w-full">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
              Our Happy Moments & Stories
            </h2>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl">
              Experience the joy and transformation through our programs
            </p>
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
              <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            </TabsList>
          </div>

          {/* Gallery Tab */}
          <TabsContent value="gallery" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {paginatedImages.map((image, index) => (
                <Card
                  key={`${currentGalleryPage}-${index}`}
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

            {/* Gallery Pagination */}
            {totalGalleryPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentGalleryPage((prev) => Math.max(0, prev - 1))}
                  disabled={currentGalleryPage === 0}
                  className="hover-scale"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {currentGalleryPage + 1} of {totalGalleryPages}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentGalleryPage((prev) => Math.min(totalGalleryPages - 1, prev + 1))}
                  disabled={currentGalleryPage === totalGalleryPages - 1}
                  className="hover-scale"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
              {paginatedTestimonials.map((testimonial, index) => (
                <Card
                  key={`${currentTestimonialPage}-${index}`}
                  className="border-border hover:shadow-lg transition-all duration-300 hover-scale animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-warning text-warning" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full ${testimonial.colorClass} flex items-center justify-center mr-3`}>
                        <span className="font-semibold">{testimonial.initial}</span>
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Testimonials Pagination */}
            {totalTestimonialPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentTestimonialPage((prev) => Math.max(0, prev - 1))}
                  disabled={currentTestimonialPage === 0}
                  className="hover-scale"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {currentTestimonialPage + 1} of {totalTestimonialPages}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentTestimonialPage((prev) => Math.min(totalTestimonialPages - 1, prev + 1))}
                  disabled={currentTestimonialPage === totalTestimonialPages - 1}
                  className="hover-scale"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
