# Dabble - Craft Discovery App

A web app where users can discover crafting tutorials based on the materials they have and the time they have available.

## Features

- **Material Selection**: Select materials you already have or want to use
- **Time Filtering**: Filter crafts by available time (15 min, 30 min, 1 hr, 2+ hrs, or custom)
- **Smart Matching**: Crafts are matched based on materials and sorted by:
  - Perfect matches (all materials available)
  - Partial matches (missing only 1-2 materials)
  - Other suggestions
- **Craft Details**: Full step-by-step instructions for each craft
- **Save/Favorite**: Save crafts for later using local storage
- **Mobile-First Design**: Responsive, playful UI with a pastel craft-themed palette

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **State Management**: React Context API
- **Styling**: CSS-in-JS (styled-jsx)
- **Data Storage**: Local JSON file (ready for API upgrade)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
CraftProject/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page with filters
│   ├── results/           # Results page
│   ├── craft/[id]/        # Craft detail page
│   ├── saved/             # Saved crafts page
│   ├── layout.tsx         # Root layout with providers
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Header.tsx
│   ├── MaterialSelector.tsx
│   ├── TimeSelector.tsx
│   └── CraftCard.tsx
├── context/               # Context providers
│   └── AppContext.tsx
├── data/                  # Data files
│   └── crafts.json        # Craft database
├── types/                 # TypeScript types
│   └── craft.ts
└── utils/                 # Utility functions
    ├── filterCrafts.ts    # Filtering and sorting logic
    └── localStorage.ts    # Local storage helpers
```

## Core Filtering Logic

The app uses a smart matching algorithm:

1. **Material Matching**: Counts how many required materials the user has
2. **Time Filtering**: Only shows crafts with duration ≤ selected time
3. **Sorting**:
   - Perfect matches first (all materials available)
   - Partial matches next (missing 1-2 materials)
   - Other suggestions last
   - Within each group, sorted by time (ascending)

## Future Enhancements

- Upload your own craft tutorials
- Image recognition of supplies
- AI-generated instructions
- Difficulty levels (already in data, can be used for filtering)
- Categories (paper crafts, home decor, upcycling, etc.)
- API integration with authentication
- User accounts and cloud sync

## Notes

- Images are referenced but not included. You can add placeholder images or use a service like Unsplash.
- The app uses local storage for saved crafts, so data persists across sessions.
- All crafts data is stored in `data/crafts.json` and can be easily expanded.

