# ShoppingOye (v0 demo)

Pakistan ki bharosemand online shops ka pay-to-rank board.

Mechanic: bond = trust badge (refundable amanat), boost = rank (one-time cumulative total, non-refundable).
Model: Outbid-style public leaderboard + trust-bond twist for Pakistan's COD/trust problem.

## What works in v0 (static site, GitHub Pages)

- Homepage with live counters, 12 category boards (Daraz taxonomy), top shops
- Category board pages with ranking (boost desc, then bond desc)
- Shop detail pages with bond badge, rank and complaint entry
- Seller submit form and buyer complaint form (demo reference numbers)
- Rules page: bond, boost, dispute and honesty rules

Listings in v0 are sample data, clearly labelled as demo.

## Structure

- `index.html` — homepage
- `board.html?cat=<slug>` — category board
- `shop.html?id=<shop-id>` — shop detail
- `submit.html` — seller listing form
- `dispute.html` — buyer complaint form
- `rules.html` — board rules
- `assets/style.css` — shared styles
- `assets/data.js` — categories and seed data (page logic lives inline per page in v0)

## Phase 2 (next)

- Supabase database: shops, bonds, boosts, disputes (replaces `assets/data.js`)
- Admin verification of JazzCash/Easypaisa bond payments
- Real WhatsApp order buttons per shop
- Boost top-up and outbid alerts
- Custom domain (shoppingoye.com, available) once purchased and connected

## Rules that never change

- Bond money is amanat, never revenue. Refundable on clean exit minus 10%.
- No fake shops, no fake counters. One caught lie ends a listing permanently.
- Every ranked position is labelled as paid. Nothing here is an organic ranking.
