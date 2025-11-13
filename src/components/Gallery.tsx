import { Card } from "@/components/ui/card";

interface GalleryImage {
  src: string;
  alt: string;
  title?: string;
}

interface GalleryProps {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
}

export const Gallery = ({ images, columns = 3 }: GalleryProps) => {
  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-6`}>
      {images.map((image, index) => (
        <Card
          key={index}
          className="overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer"
        >
          <div className="relative h-64 overflow-hidden">
            <img
              src={image.src}
              alt={image.alt}
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
  );
};
