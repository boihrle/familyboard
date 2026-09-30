# FamilyBoard

FamilyBoard shop: thin magnetic boards and packs. Static site on GitHub Pages.

Do not add Stripe keys to this repo.

## Live site

[https://boihrle.github.io/familyboard/](https://boihrle.github.io/familyboard/)

GitHub Pages serves this public repo for free from `main` at `/` (root). To confirm or change that: [Settings → Pages](https://github.com/boihrle/familyboard/settings/pages) → **Deploy from a branch** → `main` · `/ (root)`.

## Local site

No build step. From this repo:

```bash
python3 -m http.server 4173
```

Then open [http://localhost:4173/](http://localhost:4173/).

## What you can click

- **Home** — Sticky header is FamilyBoard (own line, Cart on the right), then Boards | Packs | Extras, then catalogue cards. Board and pack cards use locked product photos on light wood.
- **Chores** — Magnets-style weekly board **photos** as the hero (light wood). Line count 3–7 swaps matching photos. Site copy uses Sun–Sat; the line-count photos themselves still show lowercase day words (no new Chores photo assets in this pass).
- **Routines** — one board: option Morning | Afternoon | Night swaps title + hero. People as columns.
- **Weekly** — days as rows, people as columns. Site copy uses Sun–Sat; `weekly-hero.png` still has lowercase days baked in (no new Weekly photo in this pass).
- **Meal Plan** — A5 only. Centered title Meal Plan; printed Mon–Sun; one write-in column (not a multi-column meal grid).
- **Shopping List** — A5 only. Header plus empty write-in lines (like House Rules).
- **House Rules** — A5 only. Title House Rules (H and R); empty write-in lines only.
- **Chores Word Pack** — chore tiles only. Day Word Pack is separate. (Jobs pack redirects here.)
- **Day Word Pack** — `Sun`–`Sat`.
- **Custom Words** — you type the words; fewer tiles and a higher price.
- **Emoji Pack** — magnetic.
- **Sticker Pack** — non-magnetic.
- **Pen & Pen Holder** — magnetic holder plus erasable marker.
- **Cart** holds a board plus packs. **Pay** completes the order.

Name tiles match chore tiles and day words (white, black text). Empty cells on the mockups are intentional.
