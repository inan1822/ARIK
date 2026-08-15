---
name: arik-website
description: >
  Build, edit, or extend "האתר הרשמי של אריק" (The Official Arik Website) — a deadpan-humorous
  Hebrew RTL one-pager styled as a maximalist 90s Geocities fan site, built with React + TypeScript
  in C:\FULLSTACK\WEBS\ARIK\CODE. Use this skill whenever the user mentions Arik, אריק, the Arik
  website/site/project, the ARIK folder, the quiz about Arik, Arik photos/gallery, or asks to build,
  run, change, redesign, or add content to anything under C:\FULLSTACK\WEBS\ARIK — even if they only
  ask about one section (hero, gallery, quiz, facts, contact) or one joke. Also use it when writing
  ANY new content for the site (facts, quiz questions, captions), because the humor rules here are
  non-negotiable and easy to get wrong.
---

# The Official Arik Website — אתר האינטרנט הרשמי של אריק

A one-page joke website dedicated to Arik, 26, born in 2000. It's an inside joke among friends;
Arik knows and wants it. The site is built like a lavish, completely serious 90s celebrity fan
site (gallery, facts, trivia quiz, contact) — but every single "fact" about Arik is a statement
so generic it is true of every human being alive. The comedy lives entirely in that gap.

## Fixed decisions (already confirmed by the user — do not re-ask)

| Decision | Value |
|---|---|
| Tech stack | React + TypeScript (Vite), plain CSS. No UI libraries. |
| Project location | `C:\FULLSTACK\WEBS\ARIK\CODE` (create the Vite project here) |
| Source photos | `C:\FULLSTACK\WEBS\ARIK\UI\arik IMAGES` — 24 WhatsApp .jpeg files |
| Style inspiration | `C:\FULLSTACK\WEBS\ARIK\UI\inperation` — look at these before styling |
| Page frame | Plain full-page 90s site. NO fake Windows-95 browser-window chrome. |
| Arik's email | `arikshmarik88@yahoo.com` |
| Birth year | 2000 ("בן אדם מאז 2000") |
| Quiz reward | Every answered question instantly reveals one Arik photo with a deadpan caption |
| Gallery | 8 best photos; the remaining ~16 are distributed to other sections (quiz rewards, hero, facts, contact) |
| Language | Full Hebrew, `dir="rtl"`, `lang="he"` |

## The humor — read this before writing a single word of content

All site copy lives in `references/content.md`. Read that file before creating or editing any
content. It contains the complete approved Hebrew copy plus rules for extending it.

The six golden rules (violating any one of them breaks the site):

1. **Absolute deadpan.** The site never winks at the audience. Tone is always celebratory and
   earnest, as if Arik were a world-famous celebrity. No irony markers anywhere.
2. **The most generic possible answer.** If a statement can be replaced by one that is true of
   every living person, use that one. "מה הריח של אריק?" → "לאריק יש ריח."
3. **Pride in baseline achievements.** "מכיר את האלפבית" and "מצחצח שיניים פעמיים ביום" are
   presented as impressive accomplishments.
4. **Fake depth.** Needless elaboration of the self-evident: "לאריק יש שתי רגליים — אחת שמאלית
   ואחת ימנית."
5. **Never at Arik's expense.** No insults, no real personal information (the email is the only
   real detail). The joke is that there is *no information*, not that Arik is weird.
6. **Dry, factual phrasing.** No "חחח", no emojis inside the content text itself. The emptiness
   of the fact is the punchline; never decorate the punchline.

Litmus test for any new fact/question/caption: *Would this sentence be equally true if you
replaced "אריק" with any random stranger?* If yes — it's correct. If it reveals anything
specific about Arik — rewrite it.

## Build workflow

### 1. Scaffold

Create a Vite React-TS project in `C:\FULLSTACK\WEBS\ARIK\CODE` (the folder may not exist yet).
Set `dir="rtl" lang="he"` on `<html>` in `index.html`, title `האתר הרשמי של אריק`, and a star
favicon via inline SVG data URI (`⭐`). Delete Vite demo content.

### 2. Image pipeline

Copy all 24 photos from `C:\FULLSTACK\WEBS\ARIK\UI\arik IMAGES` into `CODE\public\arik\` renamed
to `arik-01.jpg` … `arik-24.jpg` (source names contain spaces and parentheses — quote paths).
Then **view the images** (Read tool) and assign roles in the content data:

- **8 gallery photos** — pick visually varied ones; write each a caption that literally and
  accurately describes what is visible while conveying zero information (rule: the caption must
  be technically TRUE for its photo — "אריק מחזיק חפץ" must show Arik holding an object).
- **7–8 quiz reward photos** — one per quiz question.
- **1 hero photo** — a good frontal one, framed like a superstar portrait.
- **Remaining photos** — sprinkle as tilted polaroids beside the facts list and in the contact
  section (e.g., captioned "אריק, מוכן לקבל מיילים.").

Every photo gets `alt` text in the same deadpan style.

### 3. Architecture

One page, section components, and **one centralized content file** — `src/content.ts` — holding
ALL copy: facts, quiz questions+rewards, gallery photos+captions, marquee text, hero, contact
strings, footer. Typed interfaces (`Fact`, `QuizQuestion`, `Photo`…). Nothing hardcoded in
components, so adding a joke means editing one file. Components (suggested):
`Hero`, `NavButtons`, `Gallery`, `Quiz`, `Facts`, `Contact`, `Footer`, plus small shared bits
(`VisitorCounter`, `Marquee`, `RainbowHr`, `SpinningStar`, `MouseTrail`).

### 4. Section specs (top to bottom)

**Hero** — Giant WordArt-style title "האתר הרשמי של אריק" (rainbow gradient text, thick outline,
hard drop shadow); subtitle "אריק. בן אדם מאז 2000."; scrolling marquee (CSS animation is fine);
"Under Construction" banner (CSS/emoji imitation 🚧); fake odometer visitor counter starting at
000047 (increment +1 per visit via localStorage, keep 6-digit zero padding); badge
"Best viewed in Netscape Navigator 4.0, 800x600"; hero photo of Arik; grey 3D-beveled
(`border-style: outset`) anchor-nav buttons to every section.

**Gallery — "אריק בתמונות"** — 8 photos in thick frames / crooked polaroids (alternate small
CSS rotations), each with its deadpan caption; a flashing "!NEW" tag beside one photo.

**Quiz — "כמה טוב אתם מכירים את אריק?"** — 7–8 questions shown one at a time with radio options
and a "בדוק תשובה" button, progress "שאלה X מתוך Y". Every option is correct — the quiz is
impossible to fail; any selection flashes "!נכון" and reveals that question's reward photo with
a caption like "פרס: תמונה של אריק." Reward photos accumulate in a strip as you advance. Final
screen: the congratulation text from content.md and a "נסה שוב" button that resets everything
(pointless, since failure is impossible — that's the joke; keep it deadpan).

**Facts — "עובדות מרתקות על אריק"** — full facts list from content.md, each bulleted with a
spinning star (CSS-animated ⭐/✨); a couple of leftover photos as tilted polaroids beside the list.

**Contact — "צור קשר עם אריק"** — the email `arikshmarik88@yahoo.com` huge and blinking;
the contact copy lines from content.md; a guestbook-style table form: "שם (אם יש)",
"הודעה (במילים)", submit button "שלח לאריק" that opens
`mailto:arikshmarik88@yahoo.com?subject=...&body=...` with the typed values. Footer:
"© 2026 אריק. כל הזכויות שמורות לאריק. האתר נבנה באהבה ובחוסר סיבה."

### 5. Design — 90s to the bone

Look at the 5 images in `UI\inperation` first: pixel-cloud tiled backgrounds, odometer counters,
grey bevel buttons, guestbook tables, chaotic Geocities collages. Reproduce that energy.

- **Background:** repeating pixel star/cloud tile (tiny inline SVG/base64 tile) or royal blue.
  Deliberately ugly is desirable.
- **Colors:** glowing yellow, phosphor green, red, purple; rainbow gradients on headings.
- **Type:** Comic Sans MS for Latin text and digits; Arial/David for Hebrew. WordArt-style
  headings (gradient fill, outline, hard shadow).
- **Mandatory elements:** marquee (CSS keyframes), blinking text, grey `outset`-border buttons,
  bordered tables, rainbow `<hr>`s, animated GIF imitations in CSS/emoji (spinning star, flames,
  "!NEW"), the visitor counter.
- **Bonuses (include them):** star mouse-trail; a "הפעל מוזיקה" toggle that plays a cheesy
  MIDI-like loop via Web Audio API (square-wave oscillator melody, no external files); star favicon.
- **Forbidden:** modern UI libraries, soft rounded corners, generous whitespace, minimalism,
  tasteful palettes — anything that smells like 2026 gets deleted.
- **Responsive:** must work on mobile (stack sections, `max-width:100%` images) while keeping the
  800x600 badge joke intact.

### 6. Verify

Run the dev server (Vite) and open it in the browser pane. Check: RTL layout is actually
right-to-left; all 24 images resolve (no broken `img`); the quiz reveals a photo on every answer
and never fails; marquee, blink, counter, and mouse trail animate; mailto opens with prefilled
subject/body; mobile width (375px) doesn't horizontally scroll. Fix what's broken before
declaring done.
