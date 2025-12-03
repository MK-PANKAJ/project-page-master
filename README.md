🌍 Happy Space World
Cultivating Calm, Confidence, and Connection for Students
Happy Space World is a full-stack mental wellness platform designed for students (Classes 8-12) and schools. It integrates expert counseling based on the "Stop, Look, Go" mindfulness model with the healing power of pet therapy.
This repository contains the frontend application built with React and Vite, integrated with a Supabase backend for content management, authentication, and data storage.
🚀 Features
🌟 Public Platform
Tailored Landing Pages: Dedicated sections for Students and Schools outlining programs and benefits.
Resource Library: A filterable repository of worksheets, guides, and videos for Students, Parents, and Educators.
Dynamic Blog: Content management for wellness articles with SEO optimization.
Gallery & Testimonials: Visual showcases of pet therapy sessions and success stories.
Interactive Forms:
Booking System: Request forms for 1-on-1 counseling or school workshops.
Newsletter: Subscription system with spam protection (honeypot).
🛡️ Admin Dashboard (Protected)
A comprehensive CMS located at /admin for managing all site content:
Dashboard Modules:
Contacts & Bookings: View and manage incoming inquiries.
Content Management: CRUD operations for Blogs, Testimonials, Gallery Items, and Plans.
Resource Center: Upload PDF/Doc files and link Google Drive resources.
SEO Manager: Configure Meta Titles, Descriptions, and OG Images for every page path.
Newsletter: View subscribers and export lists to CSV.
Announcements: Toggle site-wide banner alerts.
Authentication: Secure OTP-based login for administrators via Supabase Edge Functions.
🛠️ Tech Stack
Frontend
Framework: React + TypeScript
Build Tool: Vite
Styling: Tailwind CSS
UI Components: shadcn/ui (Radix UI + Tailwind)
State Management: TanStack Query (React Query)
Routing: React Router
SEO: React Helmet Async
Backend (Supabase)
Database: PostgreSQL
Authentication: Supabase Auth (Passwordless/OTP)
Storage: Buckets for Blog, Gallery, and Testimonial images.
Edge Functions:
send-notification-email: Email triggers for new bookings via Resend.
send-admin-otp: Custom admin authentication logic.
subscribe-newsletter: Handling subscriptions.
🗄️ Database Schema
The application uses the following Supabase tables:
blog_posts: Content, tags, and SEO metadata for articles.
gallery_items: Images and captions for the gallery page.
resources: Downloadable files and links categorized by audience.
testimonials: Client feedback and ratings.
plans: Pricing packages for students and schools.
contact_submissions: General contact form data.
booking_requests: Specific session requests.
newsletter_subscriptions: Email list.
page_metadata: Dynamic SEO settings per route.
announcements: Site-wide alert banners.
⚙️ Getting Started
Prerequisites
Node.js (v18+)
npm or yarn
A Supabase project
Environment Variables
Create a .env file in the root directory:
VITE_SUPABASE_PROJECT_ID="your_project_id"
VITE_SUPABASE_URL="[https://your-project-id.supabase.co](https://your-project-id.supabase.co)"
VITE_SUPABASE_PUBLISHABLE_KEY="your_anon_key"


Installation
Clone the repository:
git clone [https://github.com/your-repo/happy-space-world.git](https://github.com/your-repo/happy-space-world.git)
cd happy-space-world


Install dependencies:
npm install
# or
bun install


Run Development Server:
npm run dev

The app will start at http://localhost:8080.
🏗️ Project Structure
src/
├── assets/             # Static images
├── components/
│   ├── admin/          # Dashboard specific components (Tabs, Uploaders)
│   ├── layout/         # Header, Footer
│   ├── ui/             # shadcn/ui reusable components
│   └── ...
├── hooks/              # Custom hooks (useToast, useAutoSignOut)
├── integrations/       # Supabase client setup
├── lib/                # Utilities (cn, image optimization)
├── pages/              # Route components (Home, Admin, Blog, etc.)
└── ...


📦 Deployment
The project is configured for deployment on static hosting services like GitHub Pages or Vercel.
Build for Production:
npm run build


