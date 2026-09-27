# FamilyBoard

Shop preview for FamilyBoard (Chores board + packs). Static site for GitHub Pages.

Clickable product UX so the catalogue is easy to visualise. **Not production payments.** Preview prices only. Stripe Checkout can replace the fake Pay step later — do not add Stripe keys here.

## Live preview

[https://boihrle.github.io/familyboard/](https://boihrle.github.io/familyboard/)

GitHub Pages is served from `main` (site root). First publish can take a minute after the workflow runs.

## Local preview

No build step. From this repo:

```bash
python3 -m http.server 4173
```

Then open [http://localhost:4173/](http://localhost:4173/).

## What you can click

- **Chores board** (only board type in this preview): line count 3 / 4 / 5 / 6 / 7 swaps the SVG hero so you can count name rows; size A4 / A5; mount Magnetic / Stick / Nonstick; Add to cart.
- **Chores word pack** — fixed magnetic tiles.
- **Custom / names word pack** — you type the words; fewer tiles and a higher price.
- **Emoji pack** — magnetic.
- **Sticker pack** — non-magnetic.
- **Cart** holds a board plus packs. **Pay** goes to a fake success page.

Name magnets are the same size as word magnets. Empty rows on the mockup are intentional.

Other board types get their own pages later.
