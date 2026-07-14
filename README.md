# System.Connect // Tafsir's Personal Portfolio 🚀

A modern, terminal-inspired, and highly interactive personal portfolio website designed to showcase my projects, skills, and experience as a Full-Stack Developer. 

![Portfolio Version](https://img.shields.io/badge/Version-2.0-06b6d4?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.2-20232a?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

---

## 👽 The Aesthetic
This portfolio is built with a unique **cyberpunk/terminal** aesthetic. It features:
- Dark slate backgrounds with neon navy and olive green accents.
- Monospace typographies paired with clean sans-serif for readability.
- Grid-pattern overlays, HUD-style corner borders, and interactive radar/scramble text animations.

## 🛠️ Tech Stack & Dependencies
- **Frontend Framework:** React 19 (via Vite)
- **Styling:** Tailwind CSS + custom configurations
- **Animations:** Framer Motion (page transitions, scroll reveals, scramble text)
- **Icons:** Lucide React & React Icons
- **Scrolling:** Lenis (smooth scrolling experience)
- **Carousels:** Swiper
- **Email Service:** @emailjs/browser (custom HTML template matched with the theme)

## 📦 Features
1. **Interactive Hero Section:** Terminal-styled introductions.
2. **Projects Showcase:** Detailed cards for full-stack applications with beautiful hover states and image carousels.
3. **Experience Timeline:** Clean, animated representation of my professional journey.
4. **Secure Communication (Contact):** fully functional email transmission powered by EmailJS without exposing backend APIs.

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js and npm installed.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Tafsirchy/My-Portfolio.git
   ```
2. Navigate to the project directory:
   ```bash
   cd My-Portfolio
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Environment Variables
Create a `.env` file in the root directory and configure your EmailJS credentials:
```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### Running Locally
Start the Vite development server:
```bash
npm run dev
```

### Deployment
The project is configured for seamless deployment on platforms like **Vercel** or **Firebase Hosting**.
```bash
npm run build
firebase deploy
```
*(Currently live at: https://tafsir-portfolio.web.app)*

---

## 🤝 Let's Connect
Feel free to reach out if you want to collaborate on a project or just say hi!
- **Email:** [EMAIL_ADDRESS] (Replace with actual if needed)
- **GitHub:** [@Tafsirchy](https://github.com/Tafsirchy)

> "Transmitting data securely..." 👾
