# Project Overview: House of Anna — High-End Tailoring Portfolio & Inquiry System

## 1. AI Rules of Engagement & System Directives

- **User Authority:** The human developer leads all architecture decisions. The AI is a strict assistant. The AI MUST NOT generate unsolicited code blocks, auto-implement features, or change the stack without explicit permission. Await the developer's prompt for each step.
- **Strict TypeScript:** This project is 100% TypeScript. JavaScript (`.js` or `.jsx`) files are prohibited. Enforce strict type checking. Define interfaces for all Firebase payloads.
- **Framework Rules:** Use React via Vite. **Next.js is strictly prohibited.** No server components, no Next.js routing.
- **IDE Context:** Google Antigravity IDE. Format code outputs cleanly for this environment.
- **Deployment Pipeline:** Firebase Hosting for production. Use Vercel for staging.

## 2. Project Summary

**House of Anna** is a high-end portfolio web app for Anna Peter, a bespoke tailor and fashion designer. It showcases her work across fabric categories (Crepe, Vintage, Silk, Ankara, High/Medium/Small-target) and converts visitors into clients via an inquiry system.

**Core MVP Features:**

1. **Luxury Portfolio Gallery:** Masonry grid with category filtering and lightbox view.
2. **Inquiry Management:** Contact form + WhatsApp integration for client leads.
3. **Admin Dashboard:** Secure area for Anna to upload/delete gallery images and manage inquiries.
4. **Offline-Ready (PWA optional):** Firestore offline persistence for gallery viewing without internet.

## 3. Technology Stack

- **Frontend:** React 19, Vite, TypeScript, Tailwind CSS, Framer Motion
- **Backend / Database:** Firebase Firestore (with offline persistence enabled)
- **Authentication:** Firebase Auth (Email/Password — admin only)
- **Storage:** Firebase Storage (for gallery images)
- **State Management:** React Context API (no Zustand unless complexity grows)
- **Hosting:** Firebase Hosting

## 4. UI/UX & Branding Guidelines

All styling must adhere strictly to the House of Anna brand identity using Tailwind custom theme variables defined in `index.css`.

### Color Palette

| Role                | Color              | Hex                   | Tailwind Variable                       |
| ------------------- | ------------------ | --------------------- | --------------------------------------- |
| Primary background  | Off-white / Cream  | `#FDFBF7`             | `bg-brand-cream`                        |
| Secondary (accents) | Deep Navy          | `#1E2A3A`             | `bg-brand-navy`                         |
| Primary text        | Almost black       | `#1A1A1A`             | `text-brand-dark`                       |
| Secondary text      | Warm gray          | `#5A5A5A`             | `text-brand-gray`                       |
| Gold highlight      | Soft metallic gold | `#C9A87C`             | `border-brand-gold` / `text-brand-gold` |
| Buttons / CTAs      | Gold or Dark Navy  | `#C9A87C` / `#1E2A3A` | `bg-brand-gold` / `bg-brand-navy`       |
| Footer / overlay    | Dark Charcoal      | `#2C2C2C`             | `bg-brand-charcoal`                     |

### Typography

| Element            | Font               | Fallback              | Tailwind Class |
| ------------------ | ------------------ | --------------------- | -------------- |
| Headings           | Playfair Display   | Georgia, serif        | `font-serif`   |
| Body text          | Inter              | Helvetica, sans-serif | `font-sans`    |
| Accents (monogram) | Cormorant Garamond | Times, serif          | `font-serif`   |

### Design Ethos

- Minimalist luxury with generous whitespace
- Gold line dividers: `<hr class="h-px w-20 bg-brand-gold">`
- Soft shadows, subtle borders, full-bleed images on hover
- Mobile-first but luxurious on desktop

### Animations (Framer Motion)

- Page transitions: fade + upward slide (0.5s)
- Gallery grid: staggered fade-in
- CTA button: gentle scale on hover
- Inquiry modal: scale + opacity

## 5. Architectural Breakdown

### A. Public Routes (No Auth Required)

| Route        | Page      | Description                                                                       |
| ------------ | --------- | --------------------------------------------------------------------------------- |
| `/`          | Homepage  | Hero, featured works, services summary, testimonials                              |
| `/portfolio` | Portfolio | Gallery with category filters (Crepe, Vintage, Silk, Ankara, High, Medium, Small) |
| `/services`  | Services  | List of services with indicative pricing                                          |
| `/about`     | About     | Anna's story, philosophy, headshot                                                |
| `/contact`   | Contact   | Inquiry form + WhatsApp button                                                    |

### B. Protected Routes (Admin Only)

| Route              | Page            | Description                                             |
| ------------------ | --------------- | ------------------------------------------------------- |
| `/admin`           | Admin Dashboard | Image upload (with category picker), gallery management |
| `/admin/inquiries` | Inquiries List  | View, filter, update status (new/contacted/booked)      |

### C. Core Components

- **`Navbar.tsx`** — Responsive (hamburger on mobile, horizontal on desktop)
- **`Footer.tsx`** — Social links, WhatsApp, copyright
- **`GalleryGrid.tsx`** — Masonry layout with category filtering
- **`ImageLightbox.tsx`** — Modal with image details and "Inquire" CTA
- **`InquiryModal.tsx`** — Form for requesting a quote on a specific design
- **`CategoryFilter.tsx`** — Chips/buttons for filtering portfolio
- **`WhatsAppButton.tsx`** — Sticky or inline button pre-filling message

## 6. Database Schema (Firestore)

### Collection: `gallery`

| Field          | Type          | Description                                                                                      |
| -------------- | ------------- | ------------------------------------------------------------------------------------------------ |
| `id`           | string (auto) | Firestore doc ID                                                                                 |
| `imageUrl`     | string        | Full-size image URL (Firebase Storage)                                                           |
| `thumbnailUrl` | string        | Compressed thumbnail URL                                                                         |
| `category`     | enum string   | `crepe` \| `vintage` \| `silk` \| `ankara` \| `high-target` \| `medium-target` \| `small-ankara` |
| `title`        | string        | e.g., "Gold Silk Gown"                                                                           |
| `description`  | string        | Fabric, occasion, custom notes                                                                   |
| `featured`     | boolean       | Show on homepage?                                                                                |
| `createdAt`    | timestamp     | For sorting                                                                                      |

### Collection: `inquiries`

| Field         | Type                 | Description                                    |
| ------------- | -------------------- | ---------------------------------------------- |
| `id`          | string (auto)        | Firestore doc ID                               |
| `name`        | string               | Client name                                    |
| `email`       | string               | Client email                                   |
| `phone`       | string               | Client phone (optional)                        |
| `serviceType` | string               | Which category/service they're inquiring about |
| `budgetRange` | string               | e.g., "₦50,000 - ₦100,000"                     |
| `eventDate`   | timestamp (optional) | Deadline for the outfit                        |
| `message`     | string               | Custom message                                 |
| `imageRef`    | string (optional)    | Storage path to reference image they upload    |
| `status`      | enum string          | `new` \| `contacted` \| `booked`               |
| `createdAt`   | timestamp            | When inquiry was submitted                     |

### Collection: `settings` (single document)

| Field             | Type   | Description              |
| ----------------- | ------ | ------------------------ |
| `heroImageUrl`    | string | Main homepage hero image |
| `aboutText`       | string | Anna's bio/story         |
| `aboutImageUrl`   | string | Anna's headshot          |
| `contactPhone`    | string | For WhatsApp link        |
| `instagramHandle` | string | For social link          |

### Security Rules

- `gallery`: read = true (public), write = admin only
- `inquiries`: create = true (anyone can submit), read/update = admin only
- `settings`: read = true, write = admin only
- Admin access via Firebase custom claims or email/password auth

## 7. Folder Structure

public/
├── assets/
│ ├── logo.svg
│ ├── favicon.ico
│ ├── hero-bg.jpg
│ └── anna-headshot.jpg
└── ...

src/
├── components/
│ ├── ui/ # Button, Input, Modal, Spinner, GoldDivider
│ ├── layout/ # Navbar, Footer, AppLayout
│ ├── gallery/ # GalleryGrid, GalleryCard, CategoryFilter, ImageLightbox
│ ├── inquiries/ # InquiryForm, InquiryModal, WhatsAppButton
│ └── admin/ # ImageUploader, InquiryList, StatusBadge
├── contexts/ # AdminContext.tsx (auth state)
├── hooks/ # useGallery.ts, useInquiries.ts, useFirebase.ts
├── pages/ # Home, Portfolio, Services, About, Contact, Admin, AdminInquiries
├── services/ # firebase.ts (init), storage.ts, firestore.ts
├── types/ # index.ts (GalleryItem, Inquiry, Category types)
├── utils/ # currency.ts (₦ formatting), dates.ts
├── App.tsx # Routes wrapper
├── main.tsx # Entry point
└── index.css # Tailwind v4 + brand custom theme

## 8. Execution Roadmap

_AI: Await developer's command before proceeding to next step._

- **Step 1:** Scaffold Vite + React + TypeScript + Tailwind + Framer Motion
- **Step 2:** Configure Firebase (Auth, Firestore, Storage) with offline persistence
- **Step 3:** Define TypeScript interfaces (`types/index.ts`)
- **Step 4:** Build App Shell (Navbar, Footer, layout)
- **Step 5:** Build Homepage (Hero, featured gallery, services preview)
- **Step 6:** Build Portfolio page (masonry grid + category filtering + lightbox)
- **Step 7:** Build Services & About pages
- **Step 8:** Build Contact page + inquiry form + WhatsApp integration
- **Step 9:** Build Admin auth + Admin dashboard (image upload, inquiry management)
- **Step 10:** Deploy to Firebase Hosting
- **Step 11:** Build Admin Settings Editor

## 9. Unique Value Additions (Post-MVP)

- Style quiz (recommend fabric based on occasion)
- Virtual consultation booking (Cal.com / Calendly embed)
- Lookbook PDF download (email gated)
- Pinterest-style save to favorites
