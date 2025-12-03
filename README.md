# 🌍 Happy Space World

Cultivating Calm, Confidence, and Connection for Students

Happy Space World is a full-stack mental wellness platform designed for students (Classes 8–12) and schools. It integrates expert counseling based on the mindfulness model with the healing power of pet therapy to support emotional resilience and psychological safety in and beyond classrooms.

This repository contains the **frontend application** built with React and Vite, integrated with a **Supabase** backend for content management, authentication, and data storage.

---


<img width="25" height="25" alt="image" src="https://github.com/user-attachments/assets/bf727e43-8ac5-4cfa-8e85-a28920bff8e1" />Built with React, Supabase, and tooling such as [Lovable](https://lovable.dev) to speed up development.

---
## ✨ Key Highlights

- Student-first mental wellness journeys combining mindfulness, counseling, and pet-assisted interventions.
- Dedicated experiences for Students, Parents, and Schools.
- Full-featured admin dashboard for content, communication, and SEO.
- Built for modern web: React + TypeScript + Tailwind + shadcn/ui, powered by Supabase.

---

## 🚀 Features

### 🌟 Public Platform

- **Tailored Landing Pages**  
  Separate sections for **Students** and **Schools** describing programs, benefits, and outcomes in age-appropriate language.

- **Resource Library**  
  Filterable repository of:
  - Worksheets and journaling prompts  
  - Guides for parents and educators  
  - Short videos and activity ideas  

- **Dynamic Blog**  
  - Wellness articles with tags and categories  
  - SEO-optimized titles, descriptions, and slugs  
  - Auto-updating blog listing and detail pages

- **Gallery & Testimonials**  
  - Photo and video gallery of pet therapy sessions and school programs  
  - Testimonials from students, parents, and school partners

- **Interactive Forms**  
  - **Booking System**: Request 1‑on‑1 counseling, group circles, or school workshops.  
  - **Newsletter**: Email subscription with basic spam protection (honeypot field).

---

### 🛡️ Admin Dashboard (`/admin`)

A protected, CMS-style dashboard to manage all site content and communication.

**Modules**

- **Contacts & Bookings**
  - View contact form submissions and booking requests.
  - Update status and add internal notes for follow-up.

- **Content Management**
  - CRUD for:
    - Blog posts  
    - Testimonials  
    - Gallery items  
    - Plans / Programs (students, schools, bundles)

- **Resource Center**
  - Upload PDF/DOC resources to Supabase Storage.
  - Attach Google Drive links for existing school content.

- **SEO Manager**
  - Configure per-route:
    - Meta Title  
    - Meta Description  
    - OG Image URL  

- **Newsletter**
  - View all subscribers.
  - Export subscriber list to CSV for campaigns.

- **Announcements**
  - Configure a site-wide banner (message + type).
  - Toggle visibility for time-sensitive announcements (exams, awareness weeks, events).

**Authentication**

- Passwordless / OTP-based admin login using Supabase Auth and Edge Functions for custom OTP delivery and verification.

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: React + TypeScript (Vite)
- **Build Tool**: Vite dev server and bundler
- **Styling**: Tailwind CSS utility-first styling
- **UI Components**: shadcn/ui (Radix UI + Tailwind-based components)
- **State & Data**: TanStack Query (React Query) for server state and caching
- **Routing**: React Router for SPA routing
- **SEO**: React Helmet Async for meta and head management

### Backend (Supabase)

- **Database**: PostgreSQL managed by Supabase
- **Auth**: Supabase Auth (OTP/passwordless for admins)
- **Storage**: Supabase Storage buckets for:
  - Blog cover images
  - Gallery images
  - Testimonial avatars
- **Edge Functions** (examples):
  - `send-notification-email`: Trigger transactional emails on new bookings via providers like Resend.
  - `send-admin-otp`: Custom admin login flow using OTP.
  - `subscribe-newsletter`: Securely handle newsletter subscriptions and duplicate checks.

---

## 🗄️ Database Schema (Supabase)

The app expects the following tables (names can be adjusted via config, but these are the defaults):

- **`blog_posts`**
  - `id`, `title`, `slug`, `content`, `tags`, `cover_image_url`
  - `seo_title`, `seo_description`, `published_at`, `is_published`

- **`gallery_items`**
  - `id`, `image_url`, `caption`, `category`, `order_index`

- **`resources`**
  - `id`, `title`, `description`, `audience` (`student` | `parent` | `educator`)
  - `file_url`, `drive_link`, `tags`

- **`testimonials`**
  - `id`, `name`, `role` (Student/Parent/Teacher/School Leader)
  - `message`, `rating`, `avatar_url`

- **`plans`**
  - `id`, `name`, `description`, `target_audience`
  - `price`, `features` (JSON/array), `is_featured`

- **`contact_submissions`**
  - `id`, `name`, `email`, `phone`, `message`, `source_page`

- **`booking_requests`**
  - `id`, `name`, `email`, `phone`, `organization`
  - `requested_service`, `preferred_dates`, `notes`, `status`

- **`newsletter_subscriptions`**
  - `id`, `email`, `source`, `created_at`

- **`page_metadata`**
  - `id`, `path`, `meta_title`, `meta_description`, `og_image_url`

- **`announcements`**
  - `id`, `message`, `type`, `is_active`, `start_at`, `end_at`

Supabase automatically exposes type-safe APIs over these tables that can be consumed from the React app.

---

## ⚙️ Getting Started

### Prerequisites

- Node.js **v18+**
- `npm`, `pnpm`, or `yarn`
- A Supabase project with:
  - Database
  - Auth configured
  - Storage buckets for images/resources

### 1. Clone the Repository

```bash
git clone https://github.com/MK-PANKAJ/project-page-master.git
cd main
```


### 2. Install Dependencies

```bash
npm install
 or
yarn install
 or
pnpm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```bash
VITE_SUPABASE_PROJECT_ID="your_project_id"
VITE_SUPABASE_URL="https://your-project-id.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="your_anon_key"
```

You can obtain these values from your Supabase project settings and API keys page.

### 4. Run the Development Server

```bash
npm run dev
```

By default, Vite will start the app at `http://localhost:8080` (or the port configured in your Vite setup).

---

## 🏗️ Project Structure

```txt
src/
├── assets/             # Static images and icons
├── components/
│   ├── admin/          # Dashboard-specific components (tables, forms, uploaders)
│   ├── layout/         # Header, Footer, Layout wrappers
│   ├── ui/             # shadcn/ui reusable primitives
│   └── common/         # Shared widgets (cards, sections, etc.)
├── hooks/              # Custom hooks (e.g., useToast, useAutoSignOut)
├── integrations/       # Supabase client, API bindings
├── lib/                # Utilities (cn, formatting, image helpers)
├── pages/              # Route components (Home, Blog, Admin, Resources, etc.)
└── main.tsx            # App bootstrap and routing
```

This structure follows common React + Vite conventions for clarity and scalability.

---

## 📦 Deployment

The app can be deployed to any static hosting provider that supports SPA routing, such as **Vercel**, **Netlify**, or **GitHub Pages**.

### Production Build

```bash
npm run build
```

This generates an optimized production bundle in the `dist/` directory. You can then:

- Deploy to **Vercel** by connecting your GitHub repo and selecting the Vite framework preset.
- Deploy to **Netlify** with a build command of `npm run build` and publish directory `dist`.
- Deploy to **GitHub Pages** via GitHub Actions or manual upload.

---

## 🤝 Contributing

Contributions that improve stability, accessibility, or student experience are welcome.

1. Fork the repository.
2. Create a feature branch:  
   `git checkout -b feature/amazing-feature`
3. Commit your changes with clear messages.
4. Push the branch:  
   `git push origin feature/amazing-feature`
5. Open a Pull Request with a short description and screenshots if relevant.

---

## 📄 License

This project is open source under the **[MIT License](https://choosealicense.com/licenses/mit/)**.

---

## 💙 Acknowledgments

- Students, parents, and educators who prioritize mental wellness in academic spaces.
- Supabase for the Postgres + Auth + Storage platform that powers the backend.
- The React, Vite, Tailwind, and shadcn/ui communities for excellent tooling and documentation.
- [Lovable](https://lovable.dev) was used to accelerate parts of the frontend and backend development workflow. 

Let's build calmer, kinder learning spaces together. 🌱
