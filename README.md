<div align="center">
<img alt="Portfolio" src="https://github.com/dillionverma/portfolio/assets/16860528/57ffca81-3f0a-4425-b31d-094f61725455" width="90%">
</div>

# Portfolio

> This project is a modified version of [dillionverma/portfolio](https://github.com/dillionverma/portfolio), customized and enhanced with additional features.

Built with next.js, [shadcn/ui](https://ui.shadcn.com/), and [magic ui](https://magicui.design/), deployed on Vercel.

# Features

Original features:
- Setup only takes a few minutes by editing the [single config file](./src/data/resume.tsx)
- Built using Next.js 14, React, Typescript, Shadcn/UI, TailwindCSS, Framer Motion, Magic UI
- Responsive for different devices
- Optimized for Next.js and Vercel

Added features and modifications:
- 📸 Projects Showcase:
  - Dedicated projects page with detailed descriptions
  - Latest projects preview on homepage
  - Project categorization with tech stack tags
  - Direct links to GitHub repositories
  - Animated transitions and hover effects
- 📸 Course Notes Integration:
  - Organized course catalog with descriptions
  - Course type categorization with colored tags
  - Direct links to GitHub repositories
  - Animated transitions and hover effects
  - Responsive grid layout
- 📸 Enhanced image gallery with:
  - Hover effects and descriptions
  - Responsive masonry layout
  - Smooth animations
  - Custom image component
- 🎨 Modified layout:
  - Two-column responsive design
  - Improved content organization
  - Better mobile experience
- 🚀️ Interactive Travel Map:
  - Heat map showing visited locations with customizable weights
  - Current location marker with pulse animation
  - Automatic theme switching (dark/light mode)
  - Smooth transitions and interactions
  - Responsive design with touch support
- 🎮 Entertainment Integration:
  - Steam games with real-time playtime tracking
  - TMDB movies and TV shows with ratings
  - Smooth carousel navigation with drag support
  - Interactive cards with hover animations
  - Automatic data caching and updates

# Project Structure

```
src/
├── components/
│   ├── gallery.tsx              # Image gallery component
│   ├── city-map.tsx            # Interactive map component
│   ├── entertainment-carousel.tsx # Entertainment carousel
│   ├── movie-card.tsx          # Movie card component
│   └── magicui/                # Animation components
├── app/
│   ├── page.tsx                # Main layout
│   ├── projects/               # Projects section
│   │   └── page.tsx           # Projects showcase page
│   └── notes/                  # Notes section
│       └── page.tsx            # Course catalog page
├── data/
│   ├── resume.ts               # Basic configuration
│   ├── locations.ts            # Map location data
│   ├── media.ts                # Entertainment media data
│   └── cache/                  # Cache directory
├── types/
│   └── course.ts               # Course type definitions
└── lib/
    ├── steam.ts               # Steam API integration
    ├── tmdb.ts               # TMDB API integration
    ├── books.ts              # Google Books API (inactive)
    └── cache.ts              # Cache management
```

# Getting Started

1. Clone and install:
```bash
git clone https://github.com/lzy-0321/portfolio
cd portfolio
pnpm install
```

2. Configure environment:
- Copy `.env.example` to `.env.local`
- Add your API keys
- Create cache directory

3. Start development:
```bash
pnpm dev
```

# Configuration Guide

## Basic Configuration

1. Open the [Config file](./src/data/resume.tsx) and make changes

## Travel Map Configuration

1. Edit the locations data in `src/data/locations.ts`:
```typescript
export interface Location {
  coordinates: [number, number];  // [longitude, latitude]
  weight: number;                 // Visit frequency (0-1)
}

export const VISITED_LOCATIONS: Location[] = [
  // Long-term stays (weight: 0.8-1.0)
  { coordinates: [151.2093, -33.8688], weight: 1 },    // Sydney (Current)
  
  // Frequent visits (weight: 0.6-0.8)
  { coordinates: [144.9631, -37.8136], weight: 0.7 },  // Melbourne
  
  // Regular visits (weight: 0.5-0.6)
  { coordinates: [118.7674, 32.0415], weight: 0.6 },   // Nanjing
  
  // Single visits (weight: 0.4)
  { coordinates: [103.8198, 1.3521], weight: 0.4 },    // Singapore
];

// Current location marker
export const CURRENT_LOCATION: {
  coordinates: [number, number];
  name: string;
} = {
  coordinates: [151.2093, -33.8688],
  name: "Sydney"
};

// Map configuration
export const MAP_CONFIG = {
  center: [151.2093, -33.8688],
  zoom: 4,
  maxZoom: 7,
  minZoom: 2
};
```

## Entertainment Section Setup

### 1. Steam Games
Edit `src/data/media.ts`:
```typescript
export const GAME_TITLES = [
  {
    id: "1172470",          // Unique identifier
    title: "Apex Legends",  // Display name
    steamId: "1172470"      // Steam App ID
  }
];
```

### 2. Movies & TV Shows
Edit `src/data/media.ts`:
```typescript
export const MOVIE_TITLES = [
  "The Expanse",
  "Game of Thrones",
  // Exact titles from TMDB
];
```

## API Configuration

1. Create `.env.local` file:
```plaintext
# Steam Integration
STEAM_API_KEY=your_steam_api_key
STEAM_ID=your_steam_id

# TMDB Integration
TMDB_API_KEY=your_tmdb_api_key
```

2. Get API Keys:
- Steam: https://steamcommunity.com/dev/apikey
- TMDB: https://www.themoviedb.org/settings/api

## Cache System

The project implements a secure file-based caching system:

1. Cache Directory Setup:
```bash
mkdir -p src/data/cache
chmod 755 src/data/cache
```

2. Cache Files:
- `games-cache.json`: Steam games data
- `movies-cache.json`: TMDB movies/shows data
- Cache expiry: 1 hour (configurable in `src/lib/cache.ts`)

3. Cache Format:
```typescript
interface CacheData<T> {
  data: T[];
  lastUpdate: number;
}
```

## Security Measures

1. API Protection:
- All API calls are server-side only
- Environment variables for credentials
- Request rate limiting
- Error handling and logging

2. Cache Security:
- Proper file permissions
- Server-side only updates
- Expiry mechanism
- Data validation

3. Best Practices:
- Type safety with TypeScript
- Input validation
- Secure HTTP headers
- Error boundaries

## Course Notes Configuration

1. Edit the courses data in `src/data/resume.tsx`:
```typescript
courses: [
  {
    code: "COMP3211",           // Course code
    name: "Computer Architecture", // Course name
    university: "University of new south wales",
    description: "Course description...",
    type: ["Systems", "Hardware"], // Course categories
    link: "https://github.com/..." // Optional GitHub link
  }
]
```

2. Available course types:
- AI
- Database
- Systems
- Networks
- Programming
- Hardware
- Design
- Theory
- Software Engineering

# License & Acknowledgments

This project is licensed under the MIT License.

## Original Project
- Based on [dillionverma/portfolio](https://github.com/dillionverma/portfolio)
- Original work by [Dillion Verma](https://github.com/dillionverma)

## MIT License Explained
- ✅ You can: use commercially, modify, distribute, use privately
- ⚠️ You must: include the original license and copyright notice
- ❌ No warranty or liability provided

## Acknowledgments

- [dillionverma](https://github.com/dillionverma) for the original portfolio template
- [shadcn/ui](https://ui.shadcn.com/) for UI components
- [magic ui](https://magicui.design/) for animations
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Next.js](https://nextjs.org/) for the framework


[Previous sections remain unchanged...]
