"use client";

import { ProcessedBook } from "@/lib/books";

interface BookCardProps {
  book: ProcessedBook;
}

export function BookCard({ book }: BookCardProps) {
  return (
    <div className="h-full flex flex-col">
      {/* 默认视图 */}
      <div className="relative bg-white rounded-xl overflow-hidden shadow-lg mb-4 flex items-center justify-center p-4">
        <img
          src={book.image}
          alt={book.title}
          className="max-w-full max-h-[240px] w-auto h-auto object-contain"
        />
      </div>
      
      <div className="flex flex-col flex-grow">
        <h4 className="font-bold text-base mb-1">{book.title}</h4>
        <p className="text-sm text-muted-foreground">{book.author}</p>
        <a 
          href={book.link}
          target="_blank"
          rel="noopener noreferrer" 
          className="mt-auto text-sm text-muted-foreground hover:text-foreground"
        >
          View on Google Books ↗
        </a>
      </div>
    </div>
  );
} 