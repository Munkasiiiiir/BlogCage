# BlogCage

**Your thoughts, beautifully organized.**

BlogCage is a simple blog manager for writing, editing, and organizing posts. Sign in, manage your content from a clean dashboard, and keep your profile up to date.

## Features

- Secure email/password authentication via Supabase
- Create, edit, and delete blog posts
- Dashboard overview of your posts
- User profile management
- Responsive UI built with Tailwind CSS and shadcn/ui

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React 18, TypeScript, Vite |
| Styling | Tailwind CSS, shadcn/ui |
| Auth & Database | Supabase |
| Routing | React Router |
| Forms / Validation | React Hook Form, Zod |
| Testing | Vitest |

## Project Structure

```text
src/
  components/     # Blog UI and shared layout components
  components/ui/  # shadcn/ui primitives
  hooks/          # Auth and blog data hooks
  integrations/   # Supabase client and types
  pages/          # Landing, Auth, Dashboard, Profile
  test/           # Vitest setup and tests
supabase/
  migrations/     # Database schema (profiles + blogs)
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```sh
git clone https://github.com/Munkasiiiiir/blog-manager-suite.git
cd blog-manager-suite
npm install
```

### Environment variables

```sh
cp .env.example .env
```

Set your Supabase project values in `.env`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
VITE_SUPABASE_PROJECT_ID=your-project-id
```

Apply the SQL migration in `supabase/migrations/` to your Supabase project (profiles and blogs tables with RLS).

### Run the app

```sh
npm run dev
```

Open [http://localhost:8080](http://localhost:8080).

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run Vitest tests |

## Pages

- `/` — Landing page
- `/auth` — Login / signup
- `/dashboard` — Manage blogs
- `/profile` — Account settings

## Author

**Md. Munkasir Haque** ([@Munkasiiiiir](https://github.com/Munkasiiiiir))

## License

This project is for personal / educational use.
