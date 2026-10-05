# FamilyBoards

FamilyBoards shop: thin magnetic boards and packs. Static site on GitHub Pages.

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

- **Home** — Sticky header is FamilyBoards on its own line with a hamburger and Cart. The menu is Boards, Packs, Extras, FAQs, Our Story. Catalogue cards follow. Board and pack cards use locked product photos on light wood.
- **FAQs** — heading only.
- **Our Story** — heading plus the locked family copy.
- **Chores** — Magnets-style weekly board **photos** as the hero (light wood). Line count 3–7 swaps matching photos. Day labels on the board are Mon–Sun.
- **Routines** — one board: option Morning | Afternoon | Night swaps title + hero. People as columns. On-board titles are MORNING, AFTERNOON, NIGHT.
- **Weekly** — days as rows, people as columns. Day labels on the board are SUN–SAT.
- **Meal Plan** — A5 only. Centered title MEAL PLAN; printed MON–SUN; one write-in column (not a multi-column meal grid).
- **Shopping** — A5 only. Header Shopping plus empty write-in lines (like House Rules).
- **House Rules** — A5 only. Title HOUSE RULES; empty write-in lines only.
- **Chores Word Pack** — chore tiles only. Day Word Pack is separate. (Jobs pack redirects here.)
- **Day Word Pack** — Mon–Sun.
- **Custom Words** — you type the words; fewer tiles and a higher price.
- **Emoji Pack** — magnetic.
- **Sticker Pack** — non-magnetic.
- **Black Pen 5 Pack**, **Coloured Pen 5 Pack**, and **Fridge Holder** — extras, $12 each.
- **Cart** holds a board plus packs. **Pay** completes the order.

Name tiles match chore tiles and day words (white, black text). Empty cells on the mockups are intentional.
