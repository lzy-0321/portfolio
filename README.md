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
