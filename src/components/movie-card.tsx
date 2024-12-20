"use client";

import { ProcessedMovie } from "@/lib/tmdb";
import { Badge } from "./ui/badge";

interface MovieCardProps {
  movie: ProcessedMovie & { link: string };
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <div
      className="relative group rounded-lg overflow-hidden cursor-pointer will-change-transform"
      onClick={() => window.open(movie.link, "_blank")}
    >
      <div className="aspect-[2/3] relative transform transition-all duration-500 ease-out">
        <img
          src={movie.image}
          alt={movie.title}
          className="object-cover w-full h-full transform transition-all duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-0 left-0 right-0 p-4 transform transition-all duration-500 ease-out translate-y-0 group-hover:translate-y-[-calc(100%-4rem)]">
          <h3 className="text-lg font-bold mb-2 text-white">{movie.title}</h3>
          <div className="flex flex-wrap gap-1">
            {movie.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-black/50 text-xs backdrop-blur-sm"
              >
                {tag}
              </Badge>
            ))}
            {movie.year && (
              <Badge 
                variant="secondary" 
                className="bg-black/50 text-xs backdrop-blur-sm"
              >
                {movie.year}
              </Badge>
            )}
          </div>
        </div>

        <div 
          className="absolute inset-0 p-4 bg-card opacity-0 transform transition-all duration-500 ease-out 
            group-hover:opacity-100 backdrop-blur-sm"
        >
          <div className="h-full flex flex-col">
            <h3 className="text-lg font-bold mb-4">{movie.title}</h3>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-[12]">
                {movie.description}
              </p>
              {movie.rating && (
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Rating:</span>
                    <span className="text-sm text-muted-foreground">
                      {movie.rating.toFixed(1)} / 10
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-auto text-sm text-blue-500 font-semibold">
              Click for more information &rarr;
            </div>
            <div className="mt-4">
              <div className="flex flex-wrap gap-1">
                {movie.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}