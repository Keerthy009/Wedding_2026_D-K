# Keerthy & Daniel — Wedding Invitation

This folder is the complete GitHub Pages website. All images, fonts, animations, live invitation text and scripts are included. No build step is needed.

## Deploy with GitHub Pages

1. Create a **public** GitHub repository, such as `wedding-invitation`.
2. Upload the **contents of this folder** to the repository root. `index.html` and `assets/` must be directly at the root, not inside another folder. Keep all subfolders intact. GitHub's Upload files interface supports dragging the extracted contents together. Commit the files.
3. Open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**.
4. Choose **main** and **/ (root)**, then click **Save**.
5. GitHub will show your public HTTPS address after deployment, typically `https://YOUR-USERNAME.github.io/wedding-invitation/`.

No npm install or build command is needed. Public repositories can use GitHub Pages on GitHub Free. Do not purchase a domain unless you want a custom address.

## WhatsApp preview

Once GitHub gives you the real HTTPS address, edit `index.html`:

- Replace `assets/whatsapp-preview.jpg` in the `og:image`, `og:image:secure_url`, and `twitter:image` meta tags with the full absolute image address: `https://YOUR-USERNAME.github.io/wedding-invitation/assets/whatsapp-preview.jpg`.
- Add `<meta property="og:url" content="YOUR-FULL-PAGES-URL">` and `<link rel="canonical" href="YOUR-FULL-PAGES-URL">` inside `<head>`.

The 1200 × 630 preview image is included. WhatsApp may cache a previous preview.

## Local preview

Run `python3 -m http.server 8765` from this folder and open `http://localhost:8765`.

## Edit

- `index.html`: selectable invitation wording and envelope artwork layers.
- `content.js`: directions link and the fixed celebration timestamp (`2026-11-22T18:30:00+05:30`).
- `style.css`: styling, phone layout, flap and candle animations.
- `app.js`: opening/replay sequence.
- `effects.js`: butterfly flight.
- `scenery.js`: candle masks and replacement flames.
- `time.js` and `countdown.js`: accurate countdown and after-event message.
- `assets/`: all required artwork and locally served fonts.

The original envelope seal is preserved as supplied. No RSVP or autoplay music is included. The site does not require visitor sign-in.
