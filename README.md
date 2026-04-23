# Sahil Kaushik — Portfolio Website

[![DCRUST](https://img.shields.io/badge/DCRUST-Murthal-a855f7?style=flat-square)](https://dcrust.edu.in)
[![B.Tech CSE](https://img.shields.io/badge/B.Tech-CSE-ec4899?style=flat-square)]()
[![CGPA](https://img.shields.io/badge/CGPA-8.27-06b6d4?style=flat-square)]()

Personal portfolio website for **Sahil Kaushik** — B.Tech CSE student at DCRUST Murthal, Haryana.

---

## 📂 File Structure

```
sahil-portfolio/
├── index.html          ← Main HTML file
├── sahil.jpg           ← PUT YOUR PHOTO HERE (see instructions below)
├── Sahil_Resume.pdf    ← PUT YOUR RESUME HERE
├── css/
│   ├── style.css       ← All styles (Gen-Z vibrant theme)
│   └── responsive.css  ← Mobile & tablet responsive styles
├── js/
│   └── main.js         ← Navigation, EmailJS, scroll animations
└── README.md
```

---

## 🖼️ Adding Your Photo

1. Name your photo file exactly: **`sahil.jpg`**
2. Place it in the **same folder** as `index.html`
3. In `index.html`, find this block (inside the Hero section):

```html
<!-- Replace this div: -->
<div class="profile-placeholder">SK</div>

<!-- With this img tag: -->
<img src="sahil.jpg"
     alt="Sahil Kaushik — B.Tech CSE DCRUST"
     class="profile-image"
     loading="eager"
     width="250" height="250">
```

---

## 📧 Setting Up EmailJS (Contact Form)

Your **public key is already set**: `K6rXzEU1RNb3kXih2`

You just need to add your Service ID and Template ID:

### Steps:
1. Go to [emailjs.com](https://emailjs.com) and log in
2. **Email Services** → Add Service (use Gmail) → copy the **Service ID**
3. **Email Templates** → Create template with these variables:
   ```
   From: {{from_name}} <{{from_email}}>
   Subject: {{subject}}
   Body: {{message}}
   Reply-To: {{reply_to}}
   ```
   Copy the **Template ID**
4. Open `js/main.js` and replace:
   ```js
   const SERVICE_ID  = 'YOUR_SERVICE_ID';   // ← paste your Service ID here
   const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // ← paste your Template ID here
   ```

> **Note:** If EmailJS isn't set up, the form automatically falls back to opening your device's mail client — so it always works!

---

## 📄 Adding Your Resume

1. Name your resume file: **`Sahil_Resume.pdf`**
2. Place it in the **same folder** as `index.html`

---

## 🚀 Deployment

**Vercel (recommended):**
```bash
npm i -g vercel
vercel --prod
```

**Netlify:**  
Drag and drop the folder at [netlify.com/drop](https://app.netlify.com/drop)

**GitHub Pages:**  
Push to a repo → Settings → Pages → Deploy from main branch

---

## 👤 Profile Info

| | |
|---|---|
| **Name** | Sahil Kaushik |
| **University** | DCRUST Murthal |
| **Degree** | B.Tech CSE |
| **CGPA** | 8.27 |
| **Email** | kaushik93503@gmail.com |
| **Phone** | +91 8607372833 |
| **GitHub** | [sahil-kau5hik](https://github.com/sahil-kau5hik) |
| **LinkedIn** | [sahil-kaushik-33b124325](https://linkedin.com/in/sahil-kaushik-33b124325) |
| **LeetCode** | [Sahil_kau5hik](https://leetcode.com/u/Sahil_kau5hik/) |
