# BlogCage — Blog Manager Suite

A modern blog management app to create, edit, and organize your posts.

## Features

- Email/password authentication (Supabase)
- Create, edit, and delete blogs
- User profile management
- Responsive UI with Tailwind CSS and shadcn/ui

## Tech Stack

- Vite
- React + TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase

## Getting Started

### Prerequisites

- Node.js and npm ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))

### Setup

```sh
git clone https://github.com/Munkasiiiiir/blog-manager-suite.git
cd blog-manager-suite
npm i
```

Create a `.env` file from the example:

```sh
cp .env.example .env
```

Fill in your Supabase values:

```env
VITE_SUPABASE_PROJECT_ID=""
VITE_SUPABASE_PUBLISHABLE_KEY=""
VITE_SUPABASE_URL=""
```

### Run locally

```sh
npm run dev
```

Open [http://localhost:8080](http://localhost:8080).

### Other scripts

```sh
npm run build    # production build
npm run preview  # preview production build
npm run lint     # lint
npm test         # run tests
```

## License

Private / personal project.
