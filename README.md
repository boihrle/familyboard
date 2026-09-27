# FamilyBoard

Shop preview for FamilyBoard (Chores board + packs). Static site for GitHub Pages.

Clickable product UX so the catalogue is easy to visualise. **Not production payments.** Preview prices only. Stripe Checkout can replace the fake Pay step later — do not add Stripe keys here.

## Live preview

[https://boihrle.github.io/familyboard/](https://boihrle.github.io/familyboard/)

GitHub Pages serves this public repo for free from `main` at `/` (root). To confirm or change that: [Settings → Pages](https://github.com/boihrle/familyboard/settings/pages) → **Deploy from a branch** → `main` · `/ (root)`.

## Local preview

No build step. From this repo:

```bash
python3 -m http.server 4173
```

Then open [http://localhost:4173/](http://localhost:4173/).

## What you can click

- **Home** — short fridge-lifestyle strip, then Boards (Chores card shows a board thumb) and Packs.
- **Chores board** (only board type in this preview): Magnets-style weekly grid, board-only hero (no fridge chrome). Line count 3–7 swaps the hero to that many full-name rows. Day labels are magnetic tiles (`sun`–`sat`), not printed. Size A4 / A5; mount Magnetic / Stick / Nonstick; Add to cart.
- **Chores word pack** — includes day tiles `sun`–`sat` plus chore words.
- **Custom / names word pack** — you type the words; fewer tiles and a higher price.
- **Emoji pack** — magnetic.
- **Sticker pack** — non-magnetic.
- **Cart** holds a board plus packs. **Pay** goes to a fake success page.

Name tiles match chore and day tiles (white, black text). Empty cells on the mockup are intentional.

Other board types get their own pages later.
