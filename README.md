# Personal Portfolio & Connected Admin Dashboard

A full-stack portfolio web application crafted with the refined **scrolltide.co aesthetic** (dusty blue-gray tones, editorial serif typography, italicized keyword highlights, and subtle micro-interactions), featuring a **connected live Admin CMS** sharing a unified Express backend and MongoDB database.

---

## 🌟 Key Architecture & Highlights

```
/
├── client/                     # Vite + React 18 + Tailwind CSS + Framer Motion + React Router
│   ├── src/
│   │   ├── pages/
│   │   │   ├── PortfolioPage.jsx       # Public portfolio (/)
│   │   │   └── AdminDashboardPage.jsx  # Secret slug CMS (/x7k9-admin)
│   │   ├── components/                 # Hero, Stats, GitHub Projects, LinkedIn Widget, Editors
│   │   ├── context/                    # Dynamic theme injection & real-time updates
│   │   └── services/                   # Unified API client
├── server/                     # Node.js + Express API
│   ├── src/
│   │   ├── config/db.js                # MongoDB Atlas + zero-friction local fallback store
│   │   ├── models/Site.js              # Site schema
│   │   └── routes/                     # /api/site, /api/github/:user/repos, /api/upload
├── api/                        # Vercel Serverless Function entrypoint
├── shared/                     # Shared schema & defaults
├── vercel.json                 # Vercel deployment routing config
```

- **Two Interconnected Route Groups (One React App)**:
  - `/` &rarr; **Public Portfolio** (live-rendered from DB)
  - `/x7k9-admin` &rarr; **Admin Dashboard** (real-time CRUD editor with live preview pane)
- **Live GitHub Integration**: Proxied server-side via `GET /api/github/:username/repos` with a 1-hour in-memory cache to prevent GitHub rate limits.
- **LinkedIn Integration**: Embeds the official LinkedIn public profile badge widget + direct profile links.
- **Visual Theme Customizer**: Real-time color pickers (Background `#B9C4CC`, Accent `#D05A3F`, Typography) and Google Fonts pairings (Playfair Display, Fraunces, Cinzel, Plus Jakarta Sans, Inter).
- **Zero-Friction Database Resilience**: Connects to MongoDB Atlas when `MONGODB_URI` is provided, or seamlessly falls back to a persistent local JSON store if you're developing offline without DB credentials.

---

## 🔒 Security & Admin Slug Trade-off

> [!IMPORTANT]
> **Authentication Model**: The admin dashboard is accessible via a randomized, secret route: `/x7k9-admin`.
>
> As requested by design specifications, this route **has no password/login gate** and relies solely on **URL secrecy**.
> - The route includes `<meta name="robots" content="noindex, nofollow">` to prevent search engine indexing.
> - **Recommendation**: Keep this URL private and do not link to it from public articles. If you wish to implement authentication in the future, you can easily add a lightweight PIN passcode modal or JWT authentication middleware.

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### 1. Installation

Install dependencies across the root, server, and client:

```bash
# Install root, server, and client dependencies in one command
npm run install:all
```

Or install individually:
```bash
npm install
cd server && npm install
cd ../client && npm install
```

### 2. Environment Configuration (Optional)

Copy `.env.example` to `.env` in the root folder:

```bash
cp .env.example .env
```

| Variable | Description | Default |
| :--- | :--- | :--- |
| `MONGODB_URI` | MongoDB Atlas connection string | *Falls back to local file store if empty* |
| `PORT` | Backend Express server port | `7001` |
| `GITHUB_TOKEN` | Optional GitHub Personal Access Token | *Optional (increases rate limit)* |
| `CLOUDINARY_*` | Optional Cloudinary API keys for image uploads | *Falls back to Base64 data URIs if empty* |

### 3. Run Development Servers

Start both the backend Express API and Vite React frontend concurrently:

```bash
npm run dev
```

- **Public Portfolio**: [http://localhost:7000](http://localhost:7000)
- **Admin Dashboard**: [http://localhost:7000/x7k9-admin](http://localhost:7000/x7k9-admin)
- **Backend API**: [http://localhost:7001/api/site](http://localhost:7001/api/site)

---

## 🌐 Deploying to Vercel

The project is structured with `vercel.json` to deploy seamlessly as a **static Vite build + Vercel Serverless Functions**:

1. Push your repository to GitHub.
2. Import the repository into [Vercel](https://vercel.com).
3. Under **Project Settings &rarr; Environment Variables**, add:
   - `MONGODB_URI`: Your MongoDB Atlas connection string.
   - `GITHUB_TOKEN`: *(Optional)* For higher GitHub API rate limits.
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`: *(Optional)* For CDN image storage.
4. Click **Deploy**. Vercel will automatically build the static React frontend from `client/` and route `/api/*` to the serverless function in `api/index.js`.

---

## 🛠️ API Specification

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/site` | Fetches full portfolio configuration data |
| `PUT` | `/api/site` | Updates portfolio content & theme settings from Admin CMS |
| `GET` | `/api/github/:username/repos` | Proxies GitHub repositories with 1-hour in-memory cache |
| `POST` | `/api/upload` | Uploads image file (Cloudinary or Base64 fallback) |
| `GET` | `/api/health` | Healthcheck endpoint |

---

## 🎨 Design Philosophy & Customization

- **Dusty Blue-Gray (`#B9C4CC`)**: Evokes an editorial, tactile aesthetic paired with warm terracotta accent highlights (`#D05A3F`).
- **Typography Pairing**: Serif display headlines (*Playfair Display*, *Fraunces*) contrasting with clean, modern sans-serif body copy (*Plus Jakarta Sans*).
- **Dynamic CSS Variables**: All design tokens are managed via CSS custom properties on `:root`, allowing live real-time preview in the admin panel before saving.
