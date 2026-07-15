# aBrandr Solutions — Agency Website & Admin Panel

A premium, dark-themed agency website with a full admin CMS panel. Built with **Next.js 16**, **Tailwind CSS 4**, **Framer Motion**, **AOS**, **Drizzle ORM**, and **PostgreSQL**.

**Live demo credentials:**  
Admin URL: `/admin` → Email: `admin@abrandr.com` / Password: `admin123`

---

## Features

### Public Website
- **7 pages** — Home, Services, Work/Portfolio, About, Careers, Blog, Contact
- **Dark premium aesthetic** with glassmorphism, gradients, and noise textures
- **Cinematic animations** — Framer Motion parallax, stagger reveals, split-text, magnetic buttons, AOS scroll triggers
- **Custom cursor** — Dot + ring + 5 trailing particles with click/hover reactions (desktop only)
- **Infinite marquee** banners between sections
- **Counter animations** with scroll-triggered number counting
- **Responsive** — Mobile-first design tested on 320px–2560px viewports
- **SEO optimized** — SSR/SSG, meta tags, Open Graph, JSON-LD schema, sitemap.xml, robots.txt
- **Catchy display fonts** — Space Grotesk (headlines) + DM Sans (body)

### Admin Panel (`/admin`)
- **Session-based auth** with HMAC-signed cookies (7-day expiry)
- **Dashboard** with live stat cards (blog posts, projects, jobs, inquiries, applications)
- **Blog Posts CRUD** — Create, edit, delete, publish/unpublish
- **Projects CRUD** — Manage portfolio case studies with metrics, images, tags
- **Job Openings CRUD** — Manage career listings by department, location, type
- **Contact Inbox** — Read all contact form submissions
- **Career Applications** — Read all job applications
- **Fully responsive** — Mobile sidebar drawer, stacked forms, touch-friendly actions

### Backend (Next.js API Routes)
- RESTful CRUD endpoints for all content types
- PostgreSQL via Drizzle ORM with typed schema
- Contact form & career application persistence
- Admin authentication with password hashing

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5.9 |
| Styling | Tailwind CSS 4 |
| Animations | Framer Motion + AOS |
| Database | PostgreSQL |
| ORM | Drizzle ORM |
| Icons | Lucide React |
| Fonts | Space Grotesk + DM Sans (Google Fonts) |

---

## Project Structure

```
abrandr/
├── public/
│   └── images/
│       └── work/                    # Project case study images
│           ├── novapay-dashboard.jpg
│           ├── luxecart-ecommerce.jpg
│           ├── mediconnect-app.jpg
│           ├── techvault-rebrand.jpg
│           ├── cloudsync-website.jpg
│           └── greenleaf-app.jpg
│
├── src/
│   ├── app/
│   │   ├── layout.tsx               # Root layout (fonts, meta, JSON-LD, providers)
│   │   ├── globals.css              # Tailwind config, theme tokens, animations
│   │   ├── page.tsx                 # Homepage
│   │   ├── sitemap.ts               # Dynamic sitemap.xml
│   │   ├── robots.ts                # robots.txt
│   │   │
│   │   ├── services/page.tsx        # Services page
│   │   ├── work/page.tsx            # Portfolio / case studies page
│   │   ├── about/page.tsx           # About page
│   │   ├── careers/page.tsx         # Careers portal
│   │   ├── blog/
│   │   │   ├── page.tsx             # Blog listing page
│   │   │   └── [slug]/page.tsx      # Individual blog post
│   │   ├── contact/page.tsx         # Contact page with form
│   │   │
│   │   ├── admin/
│   │   │   ├── layout.tsx           # Admin layout (no public nav/footer)
│   │   │   ├── page.tsx             # Admin dashboard + CRUD panels
│   │   │   └── login/page.tsx       # Admin login page
│   │   │
│   │   └── api/
│   │       ├── health/route.ts      # Health check endpoint
│   │       ├── contact/route.ts     # Contact form submissions (POST)
│   │       ├── careers/route.ts     # Career applications (POST)
│   │       └── admin/
│   │           ├── login/route.ts   # Admin login (POST)
│   │           ├── logout/route.ts  # Admin logout (POST)
│   │           ├── me/route.ts      # Session check (GET)
│   │           ├── seed/route.ts    # Seed default admin user (POST)
│   │           ├── blog/route.ts    # Blog CRUD (GET/POST/PUT/DELETE)
│   │           ├── projects/route.ts # Projects CRUD (GET/POST/PUT/DELETE)
│   │           ├── jobs/route.ts    # Jobs CRUD (GET/POST/PUT/DELETE)
│   │           └── submissions/route.ts # Read submissions (GET)
│   │
│   ├── components/
│   │   ├── Navbar.tsx               # Main navigation (responsive, admin link)
│   │   ├── Footer.tsx               # Site footer with CTA, links, marquee
│   │   ├── HeroSection.tsx          # Homepage hero with parallax & split text
│   │   ├── MorphingBlobs.tsx        # Animated background orbs
│   │   ├── CinematicCursor.tsx      # Custom cursor with trail & click effects
│   │   ├── SmoothScroll.tsx         # Page transition wrapper
│   │   ├── AOSProvider.tsx          # AOS initialization
│   │   ├── AnimatedSection.tsx      # Scroll-reveal wrapper (5 variants)
│   │   ├── TextReveal.tsx           # Text slide-up reveal
│   │   ├── SplitTextReveal.tsx      # Character/word-by-word reveal
│   │   ├── ParallaxSection.tsx      # Parallax scroll wrapper
│   │   ├── MagneticButton.tsx       # Magnetic hover effect
│   │   ├── InfiniteMarquee.tsx      # Auto-scrolling text banner
│   │   ├── Counter.tsx              # Animated number counter
│   │   ├── PageHero.tsx             # Reusable page hero section
│   │   ├── ServiceCard.tsx          # Homepage service card
│   │   ├── ServiceDetailCard.tsx    # Detailed service card (services page)
│   │   ├── CaseStudyCard.tsx        # Homepage case study card
│   │   ├── ProjectCard.tsx          # Full project card (work page)
│   │   ├── TestimonialCard.tsx      # Testimonial card
│   │   ├── BlogCard.tsx             # Blog post card
│   │   ├── ContactForm.tsx          # Contact form component
│   │   ├── CareerApplicationForm.tsx # Career application form
│   │   ├── StaggerChildren.tsx      # Stagger animation container + item
│   │   ├── PageTransition.tsx       # Page transition overlay
│   │   ├── HorizontalScroll.tsx     # Horizontal scroll section
│   │   └── RevealOnScroll.tsx       # Clip-path scroll reveal
│   │
│   ├── db/
│   │   ├── index.ts                 # Database connection (PostgreSQL pool)
│   │   └── schema.ts               # Drizzle ORM schema (6 tables)
│   │
│   └── lib/
│       └── auth.ts                  # Admin auth utilities (hash, session, verify)
│
├── drizzle.config.json              # Drizzle Kit config
├── next.config.ts                   # Next.js config
├── tsconfig.json                    # TypeScript config
├── postcss.config.mjs               # PostCSS (Tailwind)
├── eslint.config.mjs                # ESLint config
├── package.json                     # Dependencies & scripts
├── .env                             # Environment variables (DATABASE_URL)
├── .gitignore                       # Git ignore rules
└── README.md                        # This file
```

---

## Database Schema

| Table | Columns | Purpose |
|---|---|---|
| `admin_users` | id, email, password_hash, name, created_at | Admin authentication |
| `blog_posts` | id, slug, title, excerpt, content, category, read_time, gradient, published, published_at, created_at, updated_at | Blog CMS |
| `projects` | id, slug, title, client, category, description, challenge, solution, image, gradient, tags, metrics_json, published, sort_order, created_at, updated_at | Portfolio CMS |
| `job_openings` | id, title, department, location, type, description, requirements, published, sort_order, created_at, updated_at | Careers CMS |
| `contact_submissions` | id, name, email, company, service, budget, message, created_at | Contact form entries |
| `career_applications` | id, name, email, phone, position, experience, portfolio, cover_letter, created_at | Job applications |

---

## Installation & Setup

### Prerequisites

- **Node.js** >= 18.x
- **PostgreSQL** >= 14.x
- **npm** >= 9.x (or yarn/pnpm)

### 1. Clone the repository

```bash
git clone https://github.com/your-org/abrandr.git
cd abrandr
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Create a `.env` file in the project root:

```env
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/app_db
```

Adjust the connection string to match your PostgreSQL setup.

### 4. Set up the database

Create the database if it doesn't exist:

```bash
createdb app_db
```

Push the schema to PostgreSQL:

```bash
npx drizzle-kit push
```

### 5. Seed the admin user

Start the dev server first, then seed:

```bash
npm run dev
```

In another terminal:

```bash
curl -X POST http://localhost:3000/api/admin/seed
```

This creates the default admin: `admin@abrandr.com` / `admin123`

### 6. Open the site

- **Website:** [http://localhost:3000](http://localhost:3000)
- **Admin panel:** [http://localhost:3000/admin](http://localhost:3000/admin)

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server (hot reload) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |
| `npx drizzle-kit push` | Push schema changes to database |
| `npx drizzle-kit studio` | Open Drizzle Studio (DB GUI) |

---

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to [Vercel](https://vercel.com)
3. Add `DATABASE_URL` environment variable (use Neon, Supabase, or any PostgreSQL provider)
4. Deploy — Vercel auto-detects Next.js

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Self-hosted

```bash
npm run build
NODE_ENV=production npm start
```

---

## Admin Panel Usage

1. Navigate to `/admin` or click the shield icon in the navbar
2. Login with `admin@abrandr.com` / `admin123`
3. Use the sidebar to switch between content types
4. Click **"Add"** to create new content
5. Click the **pencil icon** to edit existing content
6. Click the **trash icon** to delete
7. Toggle the **Published** checkbox to control visibility
8. View contact inquiries and career applications in read-only tabs

---

## Customization

### Colors
Edit `src/app/globals.css` → `@theme` block to change brand colors.

### Fonts
Edit `src/app/layout.tsx` Google Fonts link and `src/app/globals.css` `--font-display` / `--font-sans` values.

### Content
Static content lives in page files (`src/app/*/page.tsx`). Dynamic content is managed via the admin panel.

---

## License

MIT License. Built by [aBrandr Solutions](https://abrandr.com).
