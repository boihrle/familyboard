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
- **Chores board** — Magnets-style weekly board **photos** as the hero (light wood, no fridge). Line count 3–7 swaps matching photos. Site copy uses Sun–Sat; the line-count photos themselves still show lowercase day tiles (no new Chores photo assets in this pass).
- **Meal plan** — centered title Meal plan; printed Mon–Sun; blank pen write-in (not lunch/dinner magnets).
- **Shopping list** — header plus empty write-in lines (like House Rules).
- **Weekly** — days as rows, people as columns. Site copy uses Sun–Sat; `weekly-hero.png` still has lowercase days baked in (no new Weekly photo in this pass).
- **Routines** — one board: option Morning | Afternoon | Night swaps title + hero. People as columns.
- **House Rules** — title House Rules (H and R); empty write-in lines only.
- **Chores word pack** — chore tiles only. Day tiles are a separate pack. (Jobs pack redirects here.)
- **Day tiles pack** — `Sun`–`Sat`.
- **Custom / names word pack** — you type the words; fewer tiles and a higher price.
- **Emoji pack** — magnetic.
- **Sticker pack** — non-magnetic.
- **Pen holder** — magnetic holder plus erasable marker.
- **Cart** holds a board plus packs. **Pay** goes to a fake success page.

Name tiles match chore and day tiles (white, black text). Empty cells on the mockups are intentional.
