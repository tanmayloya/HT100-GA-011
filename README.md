# ChithraVani - Where Images Speak

A modern photo-to-story generator that transforms your image albums into creative narratives using AI.

## ✨ Features

- **Split-Screen Interface**: Timeline sidebar + storybook reading view
- **Drag & Drop Reordering**: Rearrange photos to change your story flow
- **Interactive Character Builder**: Define your protagonists and their traits
- **8 Story Genres**: Fantasy, Adventure, Mystery, Romance, Sci-Fi, Horror, Comedy, Drama
- **Premium Design**: Glassmorphism, serif fonts, smooth animations
- **Real-time Feedback**: Visual status indicators during AI processing

## 🎨 Design Philosophy

Inspired by modern productivity tools and e-readers:

- **Playfair Display** serif font for story text (book-like feel)
- **Inter** sans-serif for UI elements (clean & readable)
- Warm stone palette with coral/teal accents
- Shimmer loading states
- Smooth layout transitions with Framer Motion

## 🚀 Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Drag & Drop**: @dnd-kit
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Backend API**: Gemini (Google Generative AI)

## 📦 Installation

```bash
npm install
```

## 🛠️ Development

```bash
npm run dev
```

Runs on http://localhost:3000

## 🏗️ Build

```bash
npm run build
```

## 🔌 Backend Setup

The frontend expects a backend API at `http://localhost:8000/api/generate-story` that accepts:

- `files`: Array of images (multipart/form-data)
- `genre`: String (genre selection)
- `characters`: String (character descriptions)

Returns: `{ story: "..." }`

## 📝 Environment Variables

Create a `.env` file:

```
VITE_API_URL=http://localhost:8000
```

## 🎯 Usage

1. Upload photos via drag & drop
2. Reorder them in the timeline
3. Select your story genre
4. Describe your characters
5. Click "Generate Story"
6. Read your personalized narrative!

---

Built with ❤️ by ChithraVani Team
