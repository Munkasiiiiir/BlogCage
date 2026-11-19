<div align="center">

# BlogCage

**Your thoughts, beautifully organized.**

A clean, modern space to write, manage, and grow your blog posts.

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Supabase](https://img.shields.io/badge/Supabase-Auth%20%26%20DB-3FCF8E?logo=supabase&logoColor=white)](https://supabase.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

<br />

[Live Repo](https://github.com/Munkasiiiiir/BlogCage) · [Issues](https://github.com/Munkasiiiiir/BlogCage/issues)

</div>

---

## Overview

BlogCage helps you focus on writing — not on complicated tools.

Create an account, publish ideas from a calm dashboard, and keep everything private to your profile with secure authentication and row-level security.

---

## Features

| | |
| --- | --- |
| **Auth** | Email & password signup / login powered by Supabase |
| **Posts** | Create, edit, and delete your blogs in one place |
| **Dashboard** | See all your posts at a glance |
| **Profile** | Update username and account details |
| **Design** | Responsive UI with Tailwind CSS + shadcn/ui |

---

## Tech Stack

```text
Frontend     React 18 · TypeScript · Vite
UI           Tailwind CSS · shadcn/ui · Lucide icons
Backend      Supabase Auth · Postgres · RLS
Forms        React Hook Form · Zod
Routing      React Router
Testing      Vitest
```

---

## Quick Start

### 1. Clone

```bash
git clone https://github.com/Munkasiiiiir/BlogCage.git
cd blogcage
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
VITE_SUPABASE_PROJECT_ID=your-project-id
```

> Apply the SQL migration from `supabase/migrations/` in your Supabase SQL editor.

### 3. Run

```bash
npm run dev
```

Open **[http://localhost:8080](http://localhost:8080)**

---

## Project Structure

```text
blogcage/
├── public/                 # Static assets
├── src/
│   ├── components/         # Blog UI + layout
│   │   └── ui/             # shadcn/ui primitives
│   ├── hooks/              # useAuth · useBlogs
│   ├── integrations/       # Supabase client & types
│   ├── pages/              # Landing · Auth · Dashboard · Profile
│   └── test/               # Vitest setup
├── supabase/
│   └── migrations/         # Profiles & blogs schema
├── .env.example
└── package.json
```

---

## App Routes

| Route | Purpose |
| :---: | --- |
| `/` | Landing page |
| `/auth` | Login & signup |
| `/dashboard` | Blog management |
| `/profile` | Account settings |

---

## Scripts

```bash
npm run dev       # start local server
npm run build     # production build
npm run preview   # preview build
npm run lint      # eslint
npm test          # vitest
```

---

## Author

**Md. Munkasir Haque**  
GitHub: [@Munkasiiiiir](https://github.com/Munkasiiiiir)

---

<div align="center">

Made with care for clearer writing.

</div>
