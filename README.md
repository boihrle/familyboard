# FamilyBoard

Shop preview for FamilyBoard (Chores board + packs). Static site for GitHub Pages.

Clickable product UX so the catalogue is easy to visualise. **Not production payments.** Preview prices only. Stripe Checkout can replace the fake Pay step later — do not add Stripe keys here.

## Live preview

[https://boihrle.github.io/familyboard/](https://boihrle.github.io/familyboard/)

The shop lives at the root of `main` (`index.html`). GitHub Pages is free for this public repo. A GitHub App cannot turn Pages on; the repo owner does that once:

1. Open [Settings → Pages](https://github.com/boihrle/familyboard/settings/pages)
2. **Build and deployment → Source:** Deploy from a branch
3. **Branch:** `main` · **Folder:** `/ (root)`
4. Save. The site is usually up within a minute.

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
