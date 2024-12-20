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
- 📸 Enhanced image gallery with:
  - Hover effects and descriptions
  - Responsive masonry layout
  - Smooth animations
  - Custom image component
- 🎨 Modified layout:
  - Two-column responsive design
  - Improved content organization
  - Better mobile experience
- 🚀 New components:
  - Modular gallery component
  - Custom project cards
  - Coming soon section
- 🎮 Steam integration:
  - Real-time display of recently played Steam games
  - Game cards showing playtime and tags
  - Draggable carousel display
  - Automatic game data caching and updates
  - Responsive layout for different devices



# Getting Started Locally

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/portfolio
   ```

2. Move to the cloned directory

   ```bash
   cd portfolio
   ```

3. Install dependencies:

   ```bash
   pnpm install
   ```

4. Start the local Server:

   ```bash
   pnpm dev
   ```

5. Open the [Config file](./src/data/resume.tsx) and make changes

# Project Structure

Key modifications and additions:
```
src/
├── components/
│   ├── gallery.tsx          # New: Custom gallery component
│   └── magicui/            # Enhanced animations
├── app/
│   └── page.tsx            # Modified: Two-column layout
└── data/
    └── resume.ts           # Modified: Added gallery data
```

# License

This project is licensed under the MIT License.

### Original Project
- Based on [dillionverma/portfolio](https://github.com/dillionverma/portfolio)
- Original work by [Dillion Verma](https://github.com/dillionverma)

### MIT License Explained
- ✅ You can: use commercially, modify, distribute, use privately
- ⚠️ You must: include the original license and copyright notice
- ❌ No warranty or liability provided

# Acknowledgments

- [dillionverma](https://github.com/dillionverma) for the original portfolio template
- [shadcn/ui](https://ui.shadcn.com/) for UI components
- [magic ui](https://magicui.design/) for animations
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Next.js](https://nextjs.org/) for the framework

## Steam Games Integration

The website features a dynamic entertainment section that displays your recently played Steam games. To set this up:

1. Get your Steam API credentials:
   - Get your Steam API Key from: https://steamcommunity.com/dev/apikey
   - Find your Steam ID using: https://steamid.io/

2. Add the credentials to your `.env.local`:
   ```plaintext
   STEAM_API_KEY=your_steam_api_key
   STEAM_ID=your_steam_id
   ```

3. The integration will:
   - Display your recently played games
   - Show game descriptions and playtime
   - Auto-update based on your Steam activity
   - Cache results to minimize API calls

Note: Make sure your Steam profile's game details are set to public for this feature to work.

## Security Enhancements

The Steam games integration has been enhanced with several security measures:

1. Server-Side Only API Calls
   - All Steam API calls are restricted to server-side execution
   - Client-side API calls are prevented with runtime checks
   - Uses Next.js server components for secure data fetching

2. Data Caching System
   - Implements a secure file-based caching mechanism
   - Cache expiry set to 1 hour by default
   - Reduces API call frequency and potential abuse
   - Cache updates handled exclusively on server side

3. Environment Variables
   ```plaintext
   STEAM_API_KEY=your_steam_api_key    # Required for Steam API access
   STEAM_ID=your_steam_id              # Your Steam account ID
   ```

4. Best Practices
   - API credentials are never exposed to the client
   - Uses proper HTTP headers for API requests
   - Implements error handling and logging
   - Cache directory is properly secured

Note: Make sure to keep your API keys and credentials secure and never commit them to version control.
