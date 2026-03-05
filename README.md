# KL Vistorias - Engenharia Automotiva & Vistoria Cautelar

A robust, high-performance landing page and lead-capture system designed for the automotive inspection sector. This project combines an elite dark-mode UI with automated WhatsApp integrations and dynamic social proof.

## Key Features

- **Premium UI/UX:** High-tech dark mode aesthetic using "Orbitron" and "Exo 2" typography with glassmorphism components.
- **Automated Lead Generation:** Custom WhatsApp capture forms integrated with Google Sheets via Webhooks.
- **Dynamic Social Proof:** Testimonials fetched in real-time from a Google Sheets CMS.
- **Technical SEO Masterpiece:** Comprehensive structured data (JSON-LD), semantic markup, and dynamic meta properties tailored for local dominance (SAB - Service Area Business).
- **Enterprise Security:** LGPD explicit consent flows, robust Content-Security-Policy/HSTS headers, and SAST-checked codebase.

---

## Tech Stack

- **Language**: TypeScript
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS 3.4 (with dynamic classes via `clsx` and `tailwind-merge`)
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **SEO Elements**: React Helmet Async
- **Testing/Linting**: ESLint (w/ Security & No-Secrets plugins)
- **Deployment**: Vercel (Auto-deployed via `vercel.json` SPA configuration)

---

## Prerequisites

- Node.js 20 or higher
- npm or pnpm
- (Optional) Google Workspace account for Apps Script / Sheets integration

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/kl-vistoria.git
cd kl-vistoria
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Configure the following variables:

| Variable | Description | Example |
| :--- | :--- | :--- |
| `VITE_GOOGLE_APPS_SCRIPT_URL` | Webhook URL pointing to your Google Apps Script | `https://script.google.com/macros/s/AKfyc.../exec` |

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Architecture

### Directory Structure

```
├── src/
│   ├── components/       # Main React components
│   │   ├── ui/           # Low-level UI parts (buttons, inputs)
│   │   ├── Hero.tsx      # Above-the-fold component
│   │   ├── Services.tsx  # Product/Service offerings
│   │   ├── Testimonials.tsx # Dynamic reviews fetched from Google Sheets
│   │   ├── Location.tsx  # Area of coverage & radar UI
│   │   ├── Footer.tsx    # Global footer
│   │   ├── WhatsAppPopup # Lead capture state machine
│   │   └── SEO.tsx       # JSON-LD Schema & Meta-tag injector
│   ├── data/             # Centralized constant data (COMPANY_INFO)
│   ├── hooks/            # Custom React hooks (e.g., useScroll, useTestimonials)
│   ├── App.tsx           # React root and component assembler
│   ├── index.css         # Global Tailwind directives & glass classes
│   └── main.tsx          # Vite App Entry Point
├── public/               # Static root resources (sitemap, robots, favicon)
├── vercel.json           # Vercel security headers and routes
└── eslintrc-security.json# Security scanning rules
```

### Data Flow: Lead Generation (WhatsApp)

1. User clicks "Agendar Visita Técnica".
2. `WhatsAppPopup.tsx` mounts requesting Name, Email, Phone, Vehicle, Service, and Address.
3. User must accept LGPD privacy terms (Toggle switch).
4. Upon Submission:
   - React sends an Async `POST` payload (`no-cors` mode) to `VITE_GOOGLE_APPS_SCRIPT_URL`.
   - The React app simultaneously constructs a `wa.me/` link with URL encoded messages and forwards the user to WhatsApp.

### Data Flow: Social Proof CMS

1. `Testimonials.tsx` fetches `GET` data from the Google Apps Script webhook on component mount.
2. The script parses the "Depoimentos" tab in Google Sheets.
3. Only reviews marked as "Aprovado" are sent to the frontend array.

---

## Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts Vite development server |
| `npm run build` | Compiles TypeScript and builds minified bundle |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Runs standard code quality ESLint |
| `npm run lint:security` | Runs SAST checks for secrets and malicious injection patterns |

---

## Deployment

This app is configured natively for **Vercel**.

1. Create a project on [Vercel](https://vercel.com).
2. Import the Git repository.
3. Set the environment variable `VITE_GOOGLE_APPS_SCRIPT_URL` via the settings GUI.
4. Click **Deploy**.

**Vercel Configuration (`vercel.json`)**
The application enforces strict header security upon deployment:
- `Strict-Transport-Security` (HSTS)
- `X-Frame-Options: DENY` (Prevent Clickjacking)
- `X-Content-Type-Options: nosniff` 
- Routes fallback to `/index.html` allowing React Router (if added later) to handle 404s.

---

## Troubleshooting

### Webhook Not Logging Data
**Error:** Form is submitted, WhatsApp opens, but Google Sheets remains empty.
**Solution:**
1. Check the Browser Network Tab for HTTP Status codes.
2. If `Failed to Fetch` or `CORS error`: Ensure your Apps Script is deployed as a "Web App" with the access level set to **"Anyone"** (Qualquer pessoa).
3. If updating the script code, remember to hit "Manage Deployments" -> "Edit" -> "New Version" inside Apps Script.

### Images Unloading or Giving 404
**Error:** `Failed to load resource: the server responded with a status of 404 (Not Found)`
**Solution:**
1. The project uses external Unsplash placeholders. Verify if the API limits were rate-capped or IDs vanished. If substituting, drop local files to `public/images` and call them via `/images/name.jpg`.

### ESLint Security Blocking Build
**Error:** Component fails `npm run build` with `Object injection` warnings.
**Solution:** 
1. Review the specific component flagged by `eslint-plugin-security`.
2. Disable the rule locally only if it is a trusted, non-user-supplied index: `// eslint-disable-next-line security/detect-object-injection`.
