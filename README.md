# CarCall Cleaning — Frontend Platform

> **Predictable Monthly Vehicle Care & Windshield QR Digital History**  
> Serving apartment and gated residential communities across North Bengaluru.

---

## 🚀 Features

- **Modern Responsive Landing Page**: 18 specialized sections showcasing packages, 6-visit recurring cadence, before/after transformations, live society density map, service standards, customer reviews, and FAQs.
- **Interactive Multi-Role Portals**:
  - **🌐 Public Landing Page**: Customer-facing presentation and instant booking.
  - **🚗 Customer 'My Car' Portal**: Vehicle health, entitlements, clean history, before/after inspection photos, and subscription management.
  - **🧼 Cleaner PWA**: Mobile-optimized field technician workflow for society visits, vehicle checklists, photo uploads, and scan confirmation.
  - **📊 Supervisor Ops Dashboard**: Real-time team metrics, attendance, active jobs, society coverage, and quality audits.
  - **📱 Windshield QR Scan View**: Zero-leak private vehicle ID view for security guards, residents, and cleaners.
  - **🔔 Simulated WhatsApp Notification Stream**: Real-time updates for vehicle inspection reports, arrivals, and renewals.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19, TypeScript
- **Styling**: Tailwind CSS v4, Vanilla CSS
- **Icons**: Lucide React
- **Performance**: Fully statically pre-rendered with zero runtime overhead

---

## 💻 Getting Started Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
├── public/                 # Static assets (images, logo)
│   ├── Carcall-logo.png
│   └── images/
├── src/
│   ├── app/                # Next.js App Router (layout, page, styles)
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── layout/         # Header Navbar & Footer
│   │   ├── portals/        # Interactive customer, cleaner, admin dashboards
│   │   └── sections/       # Landing page modular presentation sections
│   ├── context/            # CarCallContext state management
│   └── data/               # Carwash catalog, plans, societies, mock service logs
├── next.config.ts          # Next.js configuration
├── package.json            # Scripts & dependencies
├── postcss.config.mjs      # PostCSS configuration
└── tsconfig.json           # TypeScript configuration
```

---

## 📄 License

Proprietary © CarCall Technologies Pvt. Ltd. All rights reserved.
