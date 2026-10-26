# Fyna website

A static website (no build step, no frameworks). Plain HTML, CSS and JavaScript.

## Run it in VS Code
1. Open this folder in VS Code (File > Open Folder).
2. Install the **Live Server** extension (Ritwick Dey).
3. Right-click `index.html` > **Open with Live Server**.
   (Double-clicking `index.html` also works. Fonts and the QR code need internet.)

## Folder structure
```
index.html          the page structure and text
css/styles.css      all the styling (colours and fonts are at the top)
js/script.js        all the behaviour (SETTINGS block at the top)
js/init.js          tiny helper that switches on scroll animations
assets/img/*.webp   the real app screens used in the phones
```

## How to edit things
| I want to change...                    | Edit this                                             |
|----------------------------------------|-------------------------------------------------------|
| Brand colours / fonts                  | `css/styles.css` > section 1 VARIABLES (`--red`, `--navy`, `--d`, `--b`) |
| Brand name "Fyna"                      | Search and replace `Fyna` in `index.html` (and in the `<title>`) |
| Headline, buttons, any text            | `index.html` (search for the text)                    |
| Exchange rates, fee, balances          | `js/script.js` > `SETTINGS`                           |
| Account details (Get paid section)     | `js/script.js` > `SETTINGS.accounts`                  |
| Savings goals                          | `js/script.js` > `SETTINGS.goals`                     |
| FAQ questions and answers              | `js/script.js` > `SETTINGS.faqs`                      |
| Story screens (How it works)           | `js/script.js` > `SETTINGS.storyChapters`             |
| QR code link                           | `js/script.js` > `SETTINGS.qrLink`                    |
| App Store / Google Play links          | `index.html` > download section, the two `href="#get"` buttons |
| Swap an app screen                     | Replace the file in `assets/img/` (keep the same name) |
| Add a new app screen                   | Put the image in `assets/img/`, add it to `SETTINGS.images`, then use `<img data-i="yourname">` |

## Things that are still placeholders
- The name **Fyna** (your real app name is not shown in the screens)
- QR link, store links, account numbers, sample exchange rates (GBP and EUR) and balances
- Security and fee statements: only publish what is true for your product

## Libraries / fonts loaded from the internet
- Google Fonts: Bricolage Grotesque and Instrument Sans
- qrcode.js (cdnjs) for the QR code
