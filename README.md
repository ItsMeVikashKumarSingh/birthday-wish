# 🎂 Premium Birthday Wish Card

A highly interactive, customizable, and premium web-based birthday card to wish
your friends and family in a unique and memorable way.

## ✨ Features

- **Interactive Intro**: A cinematic entry with a customizable message.
- **NASA Satellite View**: A special section showing a view from space related
  to the recipient.
- **Personalized Wishes**: A dedicated space for your heartfelt long-form
  messages.
- **Interactive Puzzle**: A fun "Pop the Balloons" game to reveal hidden
  birthday wishes.
- **Envelope Finale**: A beautiful CSS-animated envelope containing the final
  love letter.
- **Glassmorphism UI**: Modern, sleek design with smooth transitions and
  animations.

## 🚀 Deployment

Choose your favorite platform to deploy your personalized card in seconds.

### 1. Vercel

Easily clone and deploy with all environment variables pre-configured.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FItsMeVikashKumarSingh%2Fbirthday-wish&env=NAME,PIC,NICKNAME,HBD_MSG,SMALL_MSG,PIC_CAPTION,NASA_INTRO,PIC2,PIC2_CAPTION,WISHES_TITLE,WISHES,SENDER_NAME,SCROLL_MSG,OPEN_DATE&project-name=my-birthday-wish&repo-name=birthday-wish)

### 2. Netlify

One-click deployment to Netlify.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/ItsMeVikashKumarSingh/birthday-wish)

### 3. Cloudflare Pages

To deploy on Cloudflare Pages:

1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Navigate to **Workers & Pages** > **Create application** > **Pages** >
   **Connect to Git**.
3. Select this repository.
4. Set the **Build command** to: `npm run build`
5. Set the **Build output directory** to: `dist`
6. Add your environment variables in **Settings** > **Environment variables**.

---

## 🛠️ Local Setup

1. **Clone the repository**
   ```sh
   git clone https://github.com/ItsMeVikashKumarSingh/birthday-wish.git
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Configure Environment** Create a `.env` file in the root directory. Refer
   to [Environment Variables](./docs/variables.md) for a full list of options.
   ```env
   NAME='Recipient Name'
   PIC='my-image.jpg' # Place image in ./local/
   SENDER_NAME='Your Name'
   ```

4. **Build and Run**
   ```sh
   npm run init-index-local
   npm run build:parcel
   ```
   Open `dist/index.html` to view your card.

---

## 📖 Documentation

- [Environment Variables](./docs/variables.md)
- [Customization Guide](./docs/customizations.md)
- [Attributions](./docs/attributions.md)

---

<div align="center">
Made with 💖 by **Vikash Kumar Singh**
</div>
