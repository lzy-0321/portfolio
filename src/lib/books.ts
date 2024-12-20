import { updateBooksCache } from './cache';
import { BOOK_TITLES } from '@/data/media';

export interface ProcessedBook {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  author: string;
  tags: string[];
  link: string;
}

const DEFAULT_BOOK: ProcessedBook = {
  id: '',
  title: 'Unknown Book',
  category: 'Books',
  image: '/placeholder-book.jpg',
  description: 'No description available',
  author: 'Unknown Author',
  tags: [],
  link: '',
};

async function fetchBookFromGoogle(title: string, author: string): Promise<ProcessedBook | null> {
  try {
    const searchQuery = `${title} ${author}`;
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}&langRestrict=en&maxResults=1`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch from Google Books: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      return null;
    }

    const book = data.items[0].volumeInfo;

    return {
      id: data.items[0].id || title,
      title: book.title || title,
      category: 'Books',
      image: book.imageLinks?.thumbnail?.replace('http:', 'https:') || DEFAULT_BOOK.image,
      description: book.description || DEFAULT_BOOK.description,
      author: book.authors?.join(', ') || author,
      tags: book.categories || [],
      link: book.infoLink || `https://books.google.com/books?id=${data.items[0].id}`
    };
  } catch (error) {
    console.error(`Error fetching book "${title}" from Google Books:`, error);
    return null;
  }
}

export const getBooksData = async (): Promise<ProcessedBook[]> => {
  try {
    const processedBooks = await Promise.all(
      BOOK_TITLES.map(async (book) => {
        const result = await fetchBookFromGoogle(book.title, book.author);

        if (!result) {
          return {
            ...DEFAULT_BOOK,
            id: book.isbn,
            title: book.title,
            author: book.author,
          };
        }

        return result;
      })
    );

    // Add delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));

    updateBooksCache(processedBooks);
    return processedBooks;
  } catch (error) {
    console.error('❌ Error fetching books data:', error);
    return BOOK_TITLES.map(book => ({
      ...DEFAULT_BOOK,
      id: book.isbn,
      title: book.title,
      author: book.author,
    }));
  }
};
