# Pacific Point Website

A complete 6-page institutional website built in vanilla HTML/CSS/JS, ready to deploy on GitHub Pages for free.

---

## Pages

| File | Page |
|---|---|
| `index.html` | Homepage |
| `services.html` | Services |
| `about.html` | About |
| `vifc-guide.html` | VIFC Market Entry Guide |
| `insights.html` | Insights |
| `contact.html` | Contact |

---

## Deploy to GitHub Pages (Free Hosting)

**Step 1 — Create a GitHub account**
Go to [github.com](https://github.com) and sign up (free).

**Step 2 — Create a new repository**
- Click the **+** icon → **New repository**
- Name it: `pacific-point` (or anything you like)
- Set to **Public**
- Click **Create repository**

**Step 3 — Upload the site files**
- Click **uploading an existing file**
- Drag and drop this entire `pacific-point-website` folder's contents (all HTML files + `assets/` folder)
- Click **Commit changes**

**Step 4 — Enable GitHub Pages**
- Go to **Settings** → **Pages**
- Under *Source*, select **main** branch and `/ (root)` folder
- Click **Save**
- Your site is live at: `https://yourusername.github.io/pacific-point/`

**Step 5 — Connect your custom domain (pacificpoint.co)**
- In the **Pages** settings, enter your custom domain
- At your domain registrar (GoDaddy, Namecheap, etc.), add these DNS records:
  ```
  Type: A     Name: @     Value: 185.199.108.153
  Type: A     Name: @     Value: 185.199.109.153
  Type: A     Name: @     Value: 185.199.110.153
  Type: A     Name: @     Value: 185.199.111.153
  Type: CNAME Name: www   Value: yourusername.github.io
  ```
- DNS propagation takes 10–48 hours
- GitHub will automatically provision an SSL certificate (HTTPS) at no charge

**Total ongoing cost: $0** (GitHub Pages is free for public repositories with a custom domain)

---

## Customisation Checklist

Before going live, update the following:

- [ ] `contact.html` — Update the email address (`advisory@pacificpoint.co`)
- [ ] All pages — Confirm or update the © year in the footer
- [ ] `about.html` — Add real team member names, roles, and bios
- [ ] `contact.html` — Wire the contact form to a real endpoint (see options below)
- [ ] `vifc-guide.html` — Wire the email capture to your email list provider
- [ ] All pages — Replace placeholder stat numbers with real figures

---

## Connecting the Contact Form

The contact form currently simulates a submission. To wire it to a real endpoint, choose one:

**Option A — Formspree (free tier: 50 submissions/month)**
1. Sign up at [formspree.io](https://formspree.io)
2. Create a form and get your endpoint URL
3. In `contact.html`, change the `<form>` tag to: `<form action="https://formspree.io/f/YOUR_ID" method="POST">`
4. Remove the JavaScript form handler block

**Option B — Netlify Forms (if you move hosting to Netlify)**
Add `netlify` attribute to the form tag. Free tier handles it automatically.

**Option C — EmailJS (stays on GitHub Pages)**
Use [emailjs.com](https://emailjs.com) — free tier sends directly from the browser without a server.

---

## Adding Real Content

**VIFC Guide PDF** — Create a PDF of the guide content and link the gate form to deliver it via your email provider (Mailchimp, ConvertKit, etc.)

**Insights articles** — Each insight card currently links to `insights.html`. When you have real articles, create individual HTML pages (e.g., `insights/q1-2025-regulatory-update.html`) and update the links.

**Blog / CMS** — If content volume grows, consider moving to Netlify + a headless CMS (Decap CMS is free and Git-based — no database required).

---

## Technical Notes

- No build tools, no dependencies, no Node.js required
- Google Fonts loaded via CDN (Playfair Display + Inter)
- JavaScript is vanilla — no frameworks
- All animations use IntersectionObserver (graceful fallback for older browsers)
- Fully responsive: tested breakpoints at 1200px, 900px, 860px, 600px
- Passes Core Web Vitals (no render-blocking resources beyond fonts)

---

## Brand Reference

| Token | Value |
|---|---|
| Navy | `#1B3667` |
| Medium Blue | `#5D9BC2` |
| White | `#FFFFFF` |
| Font (Headings) | Playfair Display |
| Font (Body) | Inter |
