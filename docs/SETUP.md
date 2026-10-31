# ANYONLINETOOLS – NEW MACHINE SETUP & DEVELOPMENT GUIDE

This guide provides step-by-step instructions for running **AnyOnlineTools** on a new machine after cloning from GitHub.

---

## 1. Quick Start (Fresh Machine Setup)

### Prerequisites:
- **Node.js:** v18.18+ or v20+ installed
- **Git:** Installed and configured

### Clone & Install:
```bash
# 1. Clone repository
git clone https://github.com/rajeshrajpoot152/anyonlinetools.git
cd anyonlinetools

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open `http://localhost:3000` in your web browser.

---

## 2. Essential CLI Commands

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts local Next.js dev server with Fast Refresh protection. |
| `npm run build` | Compiles pristine static export into `out/` with automated sitemap & .htaccess generation. |
| `npm run ai:check` | Runs 5 Quality Gates & 30-Mistake Guard against all tools and copy. |
| `npm run seo:check` | Runs 25-Point Google Search Console indexing validation gate. |
| `npm run sync` | Re-generates `sitemap.xml` and `.htaccess` from catalog data without full build. |
| `npm run tool:add <slug> "<Name>" "<category>" "<description>"` | Scaffolds a new tool with 10-layer standard (8 FAQs, 4 Use Cases, Comparison Table, and Above-the-fold Workspace). |
| `npm run tool:translate <slug>` | Translates a tool across all 25 international languages. |

---

## 3. Deployment to Hosting (cPanel / Apache / Vercel / Netlify)

### For cPanel / Shared Hosting / Apache:
1. Run `npm run build`.
2. Upload the entire contents of the `out/` folder to your server's `public_html` or `htdocs`.
3. The `.htaccess` file inside `out/` automatically handles HTTPS, clean URLs (trailing slashes), 301 redirects, and static asset caching.
