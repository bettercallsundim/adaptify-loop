# PayGuard – Payment Tracking and Verification System

A secure payment management and verification system featuring user authentication, admin dashboards, document uploads, and payment tracking. Built with **Next.js**, **Tailwind CSS**, **shadcn/ui**, **Postgresql**, **Prisma** and **Supabase**.

## Live Demo

[Live Application URL](https://adaptify-loop.vercel.app/) (Hosted on Vercel)

## Admin Credentials

- **Email**: `admin@test.com`
- **Password**: `admin123`

## User Credentials

- **Email**: `user@test.com`
- **Password**: `user123`

---

## Features

### User Authentication

- Signup, Login, and Logout using **Supabase Auth** (email/password).
- Role-based access control for **Admin** and **User**.

### Payment Management

- **User Features**:

  - Create a payment request (Title, Amount, Status).
  - View and track payment status (`Pending`, `Approved`, `Rejected`).
  - Checkout with Stripe.

- **Admin Features**:
  - View all payments submitted by users.
  - Approve or reject payment requests and update their status.

### Document Upload and Verification

- Users upload identity verification documents (PDF/JPG/PNG, max size: 5MB).
- Admin reviews and updates verification status (`Pending`, `Approved`, `Rejected`).

### Admin Dashboard

- Summary of total payments and status-based breakdowns.

---

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS, shadcn/ui, TypeScript
- **Backend**: Next.js API Routes
- **Authentication**: Supabase Auth
- **Database**: PostgreSQL (via Neon DB)
- **Storage**: Supabase Storage
- **Deployment**: Vercel

---

## Installation & Setup

### Environment Variables

Create a `.env` file in the root directory and add the following:

```env
NEXT_PUBLIC_SUPABASE_URL=<your_supabase_url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_supabase_anon_key>
NEXT_PUBLIC_APP_URL = "http://localhost:3000"
DATABASE_URL= <your_database_url>
STRIPE_SECRET_KEY = <your_stripe_secret_key>
```

### Run the development server:

```bash
npm run dev
```

### To Do

- **Email Notifications**: Updates for status changes.
- **PDF Invoices**: Generate invoices for completed payments.
