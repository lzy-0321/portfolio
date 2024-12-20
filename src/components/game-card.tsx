"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface GameCardProps {
  game: {
    id: string;
    title: string;
    image: string;
    description: string;
    playtime?: number;
    tags?: string[];
    link: string;
    rating?: {
      summary: string;
      total: number;
      positive?: number;
      percentage?: number;
    };
  };
}

export function GameCard({ game }: GameCardProps) {
  return (
    <div
      className="h-full rounded-xl overflow-hidden bg-card shadow-lg transition-all duration-300 cursor-pointer group 
        hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:scale-[1.02] hover:-translate-y-1 hover:rotate-1"
      onClick={() => window.open(game.link, "_blank")}
    >
      <div className="group-hover:hidden flex flex-col h-full">
        <div className="relative aspect-[16/9]">
          <img
            src={game.image}
            alt={game.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col flex-grow justify-between p-4">
          <div className="space-y-2">
            <h4 className="font-semibold line-clamp-1">{game.title}</h4>
            <p className="text-sm text-muted-foreground line-clamp-4">{game.description}</p>
          </div>
          <div className="mt-2">
            {game.tags && (
              <div className="flex flex-wrap gap-2">
                {game.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs rounded-full bg-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

        <div className="hidden group-hover:flex h-full flex-col p-6 bg-gradient-to-br from-card to-muted/50">
          <h4 className="font-semibold mb-3">{game.title}</h4>
          {game.playtime?.toString() && (
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-medium">Playtime:</span>
              <span className="text-sm text-muted-foreground">
                {game.playtime} {game.playtime === 1 ? 'hour' : 'hours'}
              </span>
            </div>
          )}
          {game.rating && (
            <div className="flex flex-col gap-1 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Reviews:</span>
                <span className={cn(
                  "text-sm font-medium",
                  {
                    "text-green-500": game.rating.percentage && game.rating.percentage >= 70,
                    "text-yellow-500": game.rating.percentage && game.rating.percentage >= 40 && game.rating.percentage < 70,
                    "text-red-500": game.rating.percentage && game.rating.percentage < 40
                  }
                )}>
                  {game.rating.summary}
                </span>
              </div>
              {game.rating.total && game.rating.percentage && (
                <span className="text-sm text-muted-foreground">
                  ({game.rating.percentage}% of {game.rating.total.toLocaleString()})
                </span>
              )}
            </div>
          )}
          <p className="text-sm text-muted-foreground flex-grow overflow-y-auto">
            {game.description}
          </p>
          <div className="mt-auto text-sm text-blue-500 font-semibold cursor-pointer">
            Click for more information &rarr;
          </div>
          <div className="mt-4">
            {game.tags && (
              <div className="flex flex-wrap gap-2 mt-2">
                {game.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs rounded-full bg-muted/80 backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
  );
}