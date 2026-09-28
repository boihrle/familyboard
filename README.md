# FamilyBoard

Shop preview for FamilyBoard (thin magnetic boards + packs). Static site for GitHub Pages.

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

- **Home** — short fridge-lifestyle strip (grey fridge face, no handle), then Boards, Packs, and Extras. Board and pack cards use locked product photos on light wood.
- **Chores board** — Magnets-style weekly board **photos** as the hero (light wood, no fridge). Line count 3–7 swaps matching photos. Size A4 / A5; mount Magnetic / Stick / Nonstick. Home Chores card stays the 3-line photo.
- **Meal plan** — printed Mon–Sun, blank pen write-in (not lunch/dinner magnets).
- **Shopping list** — Fruit/veg · Fridge · Pantry · Other.
- **Weekly** — days as rows, people as columns.
- **Morning / Afternoon / Night** — title at the top, people as columns. People-count option updates the cart, not the locked photo.
- **House rules** — header plus empty write-in lines only.
- **Chores word pack** — chore tiles only. Day tiles are a separate pack.
- **Day tiles pack** — `sun`–`sat`.
- **Jobs pack** — routine jobs for Morning / Afternoon / Night.
- **Custom / names word pack** — you type the words; fewer tiles and a higher price.
- **Emoji pack** — magnetic.
- **Sticker pack** — non-magnetic.
- **Pen holder** — magnetic holder plus erasable marker.
- **Cart** holds a board plus packs. **Pay** goes to a fake success page.

Name tiles match chore and day tiles (white, black text). Empty cells on the mockups are intentional.
