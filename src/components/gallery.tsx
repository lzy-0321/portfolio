import BlurFade from "@/components/magicui/blur-fade";

interface GalleryImage {
  src: string;
  alt: string;
  description: string;
}

interface GalleryProps {
  images: GalleryImage[];
  delay?: number;
}

export function Gallery({ images, delay = 0.04 }: GalleryProps) {
  return (
    <BlurFade delay={delay}>
      <div className="columns-2 md:columns-4 gap-4 space-y-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg break-inside-avoid group"
          >
            <img
              className="w-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:brightness-50"
              src={image.src}
              alt={image.alt}
            />
            <div className="absolute inset-0 flex items-end opacity-0 transition-opacity duration-300 group-hover:opacity-100 p-4">
              <p className="text-white text-sm font-medium">{image.description}</p>
            </div>
          </div>
        ))}
      </div>
    </BlurFade>
  );
} 