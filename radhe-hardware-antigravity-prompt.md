# Antigravity Build Prompt — Radhe Hardware Website

Copy everything below into Antigravity as a single prompt.

---

## Project

Build a modern, mobile-first marketing/business website for **Radhe Hardware** (રાધે હાર્ડવેર), a farm-irrigation hardware supplier in Gujarat, India. The site should feel like a premium e-commerce discovery app (soft, rounded, image-first cards, one confident accent color) even though the business is a local agricultural hardware shop — think "Shop.app meets a village hardware store," not a generic Bootstrap template.

Use **Next.js (App Router) + Tailwind CSS v4** with the design tokens below. Support both Gujarati and English copy (Gujarati is primary; add an English toggle/translation for the same content). Fully responsive, but design mobile-first since most visitors will be on phones.

---

## Business Information (use exactly as given)

- **Name:** Radhe Hardware (રાધે હાર્ડવેર)
- **Category:** Agricultural irrigation hardware & PVC pipe supplier (sprinklers, mini-sprinklers, full sprinkler-system setups, ISI-certified PVC pipes, fittings, hoses, spare parts) — wholesale & retail
- **Address:** Near bus stop, Lalpur, Ta. Kapadwanj, Gujarat 387650, India
- **Google Maps coordinates:** 23.132298, 73.0762797 (embed a Google Map centered here, with a "Get Directions" button linking to `https://maps.app.goo.gl/xobBi1EDkKJd7onUA`)
- **Phone / WhatsApp:** +91 63553 47145 and +91 79900 57301 (click-to-call on mobile, click-to-WhatsApp buttons)
- **Hours:** Open daily, 7:00 AM – 7:00 PM
- **Certifications:** ISI Mark IS:4985, License CM/L-2840761 (PVC pipes) — display as trust badges
- **Brand taglines (Gujarati, keep verbatim as hero/section copy, with English translation alongside or on toggle):**
  - "ખેડૂતનો સાચો સાથી" — "The farmer's true companion"
  - "ઉતમ ગુણવતા • લાંબી ચાલ • ખેડૂતનો ભરોસો" — "Best quality • Long life • Farmer's trust"
  - "કૃષિ કામ માટેનો દરેક મોટીરયલ એક જ જગ્યાએ!" — "Every material for farm work, in one place!"
  - "ભરોસો અમારી, સાથે સદા તમારો" — "Our trust, always with you"
  - "કૃષ્ણનો આશીર્વાદ, ખેડૂતનો વિકાસ" — "Krishna's blessing, the farmer's progress"
  - "સબસિડી માન્ય P.V.C. પાઈપ મળી જશે" — "Subsidy-approved PVC pipes available"
- **Wholesale & retail delivery available** ("હોલસેલ અને રિટેલમાં મળવાનું રહેશે")
- **Reputation:** 5.0★ Google rating — reviews mention reasonable pricing, good product quality, and good staff behavior; feature 2–3 short testimonials in Gujarati/English.

## Product Categories (source: shop's own promotional posters — reproduce as real content, not stock photos)

1. **Sprinklers & Mini Sprinklers — Full Setup**
   - Sprinkler stand (with wooden/metal support poles)
   - Ball valve
   - Center filter
   - Mini sprinkler heads
   - Spare parts (fittings, nozzles, connectors, tubing, in assorted colors)
   - Copy: "All types of sprinklers, mini sprinklers & nozzles / Ball valves & grease fittings / Center filters & laterals / Fixtures, stands & hose lines / All spare parts available"
2. **PVC Pipes (Agriculture Class)**
   - Brand: Swarnim™ — 63mm and 75mm Agriculture Class-2 pipes shown in-store
   - Subsidy-approved, ISI certified (IS:4985, CM/L-2840761)
   - Benefits to highlight: durable & strong, leak-proof, long-lasting
3. **General irrigation accessories / spare parts bin** (as seen in the assorted-parts photo — couplers, connectors, tubing)

Use the two uploaded shop posters as the reference for tone, product framing, and badges (IS:4985 seal, "Best Quality" ribbon, "Premium Quality" seals) — recreate these as clean web UI elements (badge/chip components), not as scanned images.

---

## Design System (Design Tokens)

Adapt the color/type/shape system below (originally reference-tokenized from a fashion marketplace) to this business: keep the same structural language (rounded floating cards, single violet accent, warm-neutral palette) applied to irrigation/hardware product photography instead of fashion products.

### Colors
```css
--color-canvas-mist: #f2f4f5;   /* page background */
--color-pure-white: #ffffff;    /* cards, inputs, buttons */
--color-ink-black: #000000;     /* primary text/headings/icons */
--color-faint-border: #ebebeb;  /* hairline dividers, outlines */
--color-muted-gray: #787574;    /* secondary text, labels */
--color-cool-stone: #cccccc;    /* placeholders, disabled states */
--color-warm-fog: #acb0aa;      /* secondary surface tints */
--color-shop-violet: #5433eb;   /* THE single accent: CTAs, call/WhatsApp buttons, logo dot */
--color-violet-wash: #c0b5f3;   /* translucent glow behind violet buttons */
--color-slate-ink: #332f2d;     /* dark cards / overlay text */
--color-ash-veil: #665a54;      /* warm gray for imagery backdrops */
```

### Typography
- Primary typeface: GT Standard (fallback: Inter, system-ui, -apple-system) — regular weight everywhere; hierarchy comes from size + tight negative tracking, not bold.
- Scale: caption 11px/1.33, body-sm 12px/1.33, body 14px/1.33, body-lg 16px/1.38, headings 20px/1.1 semibold at -0.05em tracking.
- Secondary/system typeface (banners, cookie notices): Shopify Sans fallback Inter.

### Spacing & Shape
- Spacing scale: 4, 6, 8, 10, 11, 12, 16, 20, 24, 32, 38, 40, 48, 64px.
- Radii: cards 28px, pills/chips/inputs/search/buttons 9999px (fully round), inner images 20px (always ~8px smaller than the card that frames them — never crop an image to the exact card shape).
- Shadows:
  - `--shadow-sm: rgba(0,0,0,0.06) 0px 2px 8px 0px`
  - `--shadow-sm-2: rgba(0,0,0,0.1) 0px 4px 6px -1px, rgba(0,0,0,0.1) 0px 2px 4px -2px`
  - `--shadow-lg: rgba(0,0,0,0.12) 0px 4px 24px 0px`
  - `--shadow-lg-2: rgba(69,36,219,0.34) 0px 4px 24px 0px` (violet-tinted, reserved for the primary CTA/violet buttons)
- Layout: page max-width 1200px, section gap 64px, element gap 12px, card padding 0px (images bleed to the rounded edge).

Paste the full `@theme` Tailwind v4 block and CSS custom-properties block (provided as `theme.css` / `variables.css`) directly into the project's global stylesheet — don't regenerate them from scratch.

### Key Components to Build
- **Sticky top bar / hero**: logo (peacock feather + "રાધે હાર્ડવેર" wordmark, violet accent dot), tagline "ખેડૂતનો સાચો સાથી", full-bleed hero image of irrigation setup in the field, prominent violet "Call Now" / "WhatsApp" pill buttons with the violet-wash glow shadow.
- **Trust badge row**: ISI Mark, CM/L license number, "Best Quality", 5★ rating — small rounded chip components with faint borders.
- **Category cards** (28px radius, dual-layer shadow, 20px inner image radius, zero internal padding): one per product category (Sprinklers & Full Setup, PVC Pipes, Spare Parts) — image on top, category name 14px semibold below.
- **Product feature grid**: reproduce the 5-item breakdown from the sprinkler poster (Sprinkler Stand / Ball Valve / Center Filter / Mini Sprinkler / Spare Parts) as individual image tiles with overlay labels (semi-transparent white label chip, bottom-left, 12px radius).
- **Checklist section**: the "✅" bullet list from the poster (all sprinkler types, center filter & lateral, fixtures/stand/hose line, spare parts, ball valve & grease fitting) as a clean two-column checklist with violet check icons.
- **PVC pipe section**: Swarnim pipe imagery, subsidy-approved messaging, "ટકાઉ અને મજબૂત / લીકેજ પ્રૂફ / લાંબા સમય ટકાઉ" (durable & strong / leak-proof / long-lasting) as a 3-icon feature row.
- **Testimonials**: 2–3 short quote cards using the Google review sentiment (good pricing, good quality, good staff behavior).
- **Location & contact section**: embedded Google Map (center 23.132298, 73.0762797), address, hours (7 AM–7 PM daily), two phone numbers as click-to-call buttons, WhatsApp button, and "Get Directions" link to the Google Maps place page.
- **Footer**: business name, address, phone numbers, hours, and a note that wholesale & retail delivery is available.
- **Sidebar/bottom nav (mobile)**: simple icon rail — Home, Products, Location, Call — using the rounded 48px tappable area pattern from the reference system.

### Do
- Use 28px radius for all product/category cards, 9999px for every pill/button/input.
- Keep violet (#5433eb) as the *only* saturated accent — logo, CTAs, active states, WhatsApp/Call buttons.
- Let product photography (sprinklers, pipes, fittings) be the visual hero — minimal chrome, generous whitespace, compact 12px gaps with breathing room (64px) between major sections.
- Make the phone numbers and WhatsApp link tap-friendly and above-the-fold on mobile.

### Don't
- Don't introduce a second bright accent color.
- Don't use sharp corners anywhere in cards, buttons, or inputs.
- Don't bury the address/phone/hours below the fold — this is a local business site; contact info should be reachable within one scroll on mobile.

---

## Content Language

Default language: Gujarati (with the exact taglines above). Add a lightweight EN/GU toggle in the header so English-speaking visitors (or younger family members helping the shop) can read the same content in English.

## Deliverable

A responsive, production-ready static site (or Next.js app) with: Home/Hero, Products (Sprinklers & Setup, PVC Pipes, Spare Parts), About/Trust badges, Testimonials, and Contact/Location sections, styled entirely from the token system above.
