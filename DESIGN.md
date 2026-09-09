---
name: Beaver Money
description: A craftsman's ledger for households who log every transaction by hand.
colors:
  beaver-pelt-amber: "oklch(0.852 0.199 91.936)"
  beaver-pelt-amber-foreground: "oklch(0.421 0.095 57.708)"
  amber-deep: "oklch(0.795 0.184 86.047)"
  burnished-gold: "oklch(0.681 0.162 75.834)"
  paper-white: "oklch(1 0.002 92)"
  bone-cream: "oklch(0.985 0.005 92)"
  light-vellum: "oklch(0.97 0.005 92)"
  pencil-grey: "oklch(0.922 0.005 92)"
  graphite-mid: "oklch(0.708 0.008 92)"
  ink-mid: "oklch(0.556 0.008 92)"
  ink-deep: "oklch(0.205 0.008 92)"
  ink-near-black: "oklch(0.145 0.005 92)"
  warm-walnut: "oklch(0.269 0.008 92)"
  crimson-error: "oklch(0.577 0.245 27.325)"
  account-net-worth: "oklch(0.72 0.19 142)"
  account-liquidity: "oklch(0.67 0.2 258)"
  account-investment: "oklch(0.78 0.17 55)"
  account-property: "oklch(0.65 0.22 340)"
  account-receivable: "oklch(0.7 0.18 200)"
  account-liability: "oklch(0.65 0.22 25)"
  account-asset: "oklch(0.72 0.17 300)"
typography:
  display:
    fontFamily: "Inter Variable, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Inter Variable, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Inter Variable, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "normal"
  body:
    fontFamily: "Inter Variable, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "Inter Variable, system-ui, sans-serif"
    fontSize: "0.625rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.02em"
rounded:
  none: "0"
  sm: "0.375rem"
  md: "0.5rem"
  lg: "0.625rem"
  xl: "0.875rem"
spacing:
  px: "1px"
  half: "2px"
  one: "4px"
  one-half: "6px"
  two: "8px"
  two-half: "10px"
  three: "12px"
  four: "16px"
  six: "24px"
  twelve: "48px"
components:
  button-default:
    backgroundColor: "{colors.beaver-pelt-amber}"
    textColor: "{colors.beaver-pelt-amber-foreground}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "0 8px"
    height: "28px"
  button-default-hover:
    backgroundColor: "{colors.beaver-pelt-amber}"
    textColor: "{colors.beaver-pelt-amber-foreground}"
  button-outline:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.ink-near-black}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "0 8px"
    height: "28px"
  button-secondary:
    backgroundColor: "{colors.light-vellum}"
    textColor: "{colors.ink-deep}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "0 8px"
    height: "28px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink-near-black}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "0 8px"
    height: "28px"
  button-destructive:
    backgroundColor: "{colors.crimson-error}"
    textColor: "{colors.paper-white}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "0 8px"
    height: "28px"
  card:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.ink-near-black}"
    rounded: "{rounded.lg}"
    padding: "16px"
  input:
    backgroundColor: "{colors.pencil-grey}"
    textColor: "{colors.ink-near-black}"
    typography: "{typography.title}"
    rounded: "{rounded.md}"
    padding: "0 8px"
    height: "28px"
  sidebar:
    backgroundColor: "{colors.bone-cream}"
    textColor: "{colors.ink-near-black}"
---

# Design System: Beaver Money

## 1. Overview

**Creative North Star: "The Ledger Workshop"**

Beaver Money's interface is a craftsman's bench: tools within reach, columns straight, surfaces uncluttered, a single warm amber that reads as worked wood and brass instrument. Every component earns its space. Numbers are the substance; chrome is the box. The user is logging by hand because logging by hand is the point. The system supports that ritual rather than decorating around it.

Density is the policy, not an accident. Default rows are tight (`h-7` for inputs and buttons, `text-xs/relaxed` for body), targets are real but compact, and there is no breathing room offered "to look modern." The aesthetic lineage runs through Linear, Raycast, Stripe Dashboard, Beancount, and the better personal-finance managers (Monarch, Copilot, Lunch Money) without inheriting their consumer-fintech polish. We sit closer to a measurement instrument than to a marketing page.

This system explicitly rejects every visual idiom that signals "fintech" at a glance: gradient hero metrics, navy-and-gold legacy bank chrome, neon-on-black crypto trading, indiscriminate glass cards, soft-pastel SaaS-cream, gamified streaks, and identical icon-heading-text card grids. Translucency belongs to navigation and floating layers, never the ledger itself.

**Key Characteristics:**

- Rounded precision. A 10px root radius softens the enclosure while compact controls remain tightly shaped.
- Single warm hue (92°) tints every neutral. There is no cool grey anywhere in this product.
- Material hierarchy. Opaque ledger surfaces use rings and restrained ambient depth; navigation and overlays use warm translucent glass.
- One typeface (Inter Variable). Hierarchy by scale and weight, never by family.
- Semantic chart palette is fixed and meaningful. Colors map to account categories, not decoration.
- Privacy-mode masking is a first-class state. Every numeric value must support it.

## 2. Colors: The Beaver Pelt Palette

Tinted neutrals around hue 92° (warm amber) plus one saturated brand hue and a fixed seven-role semantic chart palette. Cool greys are forbidden; every neutral carries chroma 0.005-0.01 toward the brand hue.

### Primary

- **Beaver Pelt Amber** (`oklch(0.852 0.199 91.936)`): the brand hue at light-canvas saturation. Used on primary buttons, primary actions, brand surfaces, and the household-record indicator. In dark mode this shifts to **Amber Deep** (`oklch(0.795 0.184 86.047)`) for contrast against warm-dark backgrounds.
- **Burnished Gold** (`oklch(0.681 0.162 75.834)`): the sidebar primary, deeper and more saturated than the main amber. Used to mark "active" navigation in the sidebar without competing with the main brand swatch elsewhere.

### Neutral

- **Paper White** (`oklch(1 0.002 92)`): main background and card surface in light mode. Tinted toward amber by chroma 0.002, never pure `#ffffff`.
- **Bone Cream** (`oklch(0.985 0.005 92)`): the sidebar surface; just barely warmer than paper white so the chrome separates from content without a border.
- **Light Vellum** (`oklch(0.97 0.005 92)`): muted/secondary/accent surface for buttons and pill backgrounds.
- **Pencil Grey** (`oklch(0.922 0.005 92)`): borders and input field backgrounds (used at full opacity for borders, at 20% for input fills via `bg-input/20`).
- **Graphite Mid** (`oklch(0.708 0.008 92)`): focus ring color and disabled-state grey.
- **Ink Mid** (`oklch(0.556 0.008 92)`): muted-foreground for descriptions, captions, and secondary metadata.
- **Ink Deep** (`oklch(0.205 0.008 92)`): used for secondary-button foreground and dark-mode card surface.
- **Ink Near-Black** (`oklch(0.145 0.005 92)`): primary foreground in light mode; primary background in dark mode (it pivots).
- **Warm Walnut** (`oklch(0.269 0.008 92)`): muted/accent surface in dark mode, the equivalent of Light Vellum's role.

### Semantic (account categories)

The chart palette is **not a decoration system**. Each color is bound to an account category and must be used consistently across every chart, sankey, badge, dot, or icon that represents that category. Aim for the color to carry meaning at a glance after one exposure.

- **Account / Net Worth Green** (`oklch(0.72 0.19 142)`): household net worth, total assets minus liabilities.
- **Account / Liquidity Blue** (`oklch(0.67 0.2 258)`): cash, checking, savings.
- **Account / Investment Amber** (`oklch(0.78 0.17 55)`): brokerage accounts, holdings. Sits adjacent to the brand hue intentionally, since investments are a significant first-class surface.
- **Account / Property Magenta** (`oklch(0.65 0.22 340)`): real estate, vehicles, illiquid assets.
- **Account / Receivable Cyan** (`oklch(0.7 0.18 200)`): money owed to the household.
- **Account / Liability Red** (`oklch(0.65 0.22 25)`): credit cards, loans, debt.
- **Account / Asset Purple** (`oklch(0.72 0.17 300)`): generic asset bucket distinct from property.

A separate **chart-1..chart-5** grey ramp (`oklch(0.87 0.005 92)` down to `oklch(0.269 0.008 92)`) is used when the chart is non-categorical (e.g., a series over time without account semantics). In dark mode, the grey ramp is lifted into the readable band (≥0.45 lightness) so it reads on a dark canvas.

### Status

- **Crimson Error** (`oklch(0.577 0.245 27.325)`): destructive actions, error states, validation failures. Lifts to `oklch(0.704 0.191 22.216)` in dark mode.

### Named Rules

**The Warm-Neutrals Rule.** Every neutral, in both themes, carries chroma 0.005-0.01 at hue 92°. There is no `#000`, no `#fff`, no cool grey, no slate. If a designer reaches for a neutral, it must come from this palette or be derived by adjusting only lightness on hue 92°.

**The Semantic-Chart Rule.** The seven account colors are bound to their category for the lifetime of the product. They are not a generic "data viz palette" to be reassigned per chart. A new chart picks colors from this list by what it represents, never by aesthetic preference.

**The One-Amber-At-A-Time Rule.** The main brand amber and the sidebar burnished gold do not appear on the same surface in the same role. Sidebar gold marks chrome (active nav); brand amber marks content actions (primary buttons, household indicators). Mixing them weakens both.

## 3. Typography

**Display Font:** Inter Variable, with system-ui and sans-serif fallback.
**Body Font:** Inter Variable. Identical family to the display.
**Mono / Numeric:** none distinct today; numerals are rendered in Inter using its tabular-numeric font features where alignment matters.

**Character:** A single optical-tuned grotesque doing all the work. Hierarchy comes from scale and weight contrast (≥1.25 ratio between steps), not from family change. The result reads as instrument-grade rather than editorial; the document feels like a notebook page, not a magazine spread.

### Hierarchy

- **Display** (700, `clamp(2.25rem, 5vw, 3rem)`, line-height 1.1, tracking -0.02em): landing-page hero (`/`) and large empty-state titles. Rare in the product surface; reserve for moments where the page is essentially a wordmark.
- **Headline** (600, 1.125rem / 18px, line-height 1.3, tracking -0.01em): page-level titles inside the app shell ("Transactions", "Investments"). One per route maximum.
- **Title** (500, 0.875rem / 14px, line-height 1.4): card titles, dialog titles, table column headers, section labels. The most-used "important text" size.
- **Body** (400, 0.75rem / 12px, line-height 1.625): the default body size. Transaction descriptions, form helper text, sidebar items, most table rows. Body line length should still cap at 65-75ch in long-form prose contexts (settings descriptions, empty-state copy).
- **Label** (500, 0.625rem / 10px, line-height 1.4, tracking 0.02em): metadata, badge text, the `xs` button size, and form micro-labels. Use sparingly; this size strains at desk distance.

### Named Rules

**The One-Family Rule.** A second typeface is not added to introduce hierarchy. If two pieces of text need to be visually distinct, change weight, scale, color, or column position, never the family.

**The Tabular-Numerics Rule.** Any column of numbers (account balances, transaction amounts, investment values, currency conversions) renders with `font-variant-numeric: tabular-nums`. Decimals align by point, the eye scans down a column, totals are reconcilable at a glance. A misaligned decimal in a financial table is a bug, not a style preference.

**The Compact-Default Rule.** Default body is 12px (`text-xs/relaxed`). Designers do not bump it to 14px because the page "feels too dense"; the density is the design. If a screen is genuinely overpacked, reduce content, not increase type.

## 4. Elevation

This system uses **layered material with restrained depth**. The financial ledger remains opaque and calm. Chrome and floating surfaces may become translucent when the material explains their position above content. Depth is conveyed by four mechanisms:

1. **Tonal layering**: surfaces lift via background lightness (sidebar Bone Cream sits on Paper White content; warm-walnut accents sit on dark-mode card surfaces).
2. **Ring borders**: cards and key containers carry `ring-1 ring-foreground/10` (a 10%-foreground hairline). This reads as a confident pencil line, not a glow.
3. **Border separators**: form inputs, table rows, and lists use `border-input` (Pencil Grey) at 1px to delimit fields. Borders are structural; they delineate, they don't decorate.
4. **Material depth**: floating navigation, menus, dialogs, drawers, and sheets may use a warm translucent fill, backdrop blur, a top-edge highlight, and a soft ambient shadow.

There is no hover tilt and no decorative parallax. State changes use color, ring, and a short 0.97 press scale that returns with an exponential ease.

### Named Rules

**The Earned-Depth Rule.** Ambient shadows and blur belong only to surfaces that are physically above other content: app chrome, popovers, dialogs, sheets, drawers, and the floating action button. Ledger cards get at most a one-pixel ambient shadow plus an inset highlight.

**The Ring-Hairline Rule.** When a card needs an edge, it gets `ring-1 ring-foreground/10`. The ring sits inside the box; it does not affect layout; it does not change opacity on hover. It is the standard load-bearing edge for any container that holds tabular data.

**The Glass-Chrome Rule.** Glass is warm, never blue-grey. Light mode uses a cream material around 78% opacity; dark mode uses warm walnut around 76%. `backdrop-filter` is an enhancement, not a dependency, so the fallback remains fully legible.

## 5. Components

The product uses Base UI (`@base-ui/react`) primitives wrapped to shadcn `base-mira` style. Every component below is real today; this section captures the philosophy, not aspirational extensions.

### Buttons

- **Shape:** 10px corners (`rounded-lg`). Borders are 1px transparent except for the outline variant. Background-clip is `padding-box` so the border-tinted background does not bleed.
- **Default size:** 28px tall (`h-7`), 8px horizontal padding, 12px font (`text-xs/relaxed`), 500 weight. Icon size 14px (`size-3.5`) when present.
- **Primary:** `bg-primary` (Beaver Pelt Amber) with `text-primary-foreground` (warm dark brown). Hover dims background to `/80`. Active scales to 0.97 for 150ms. Focus shows a 2px ring at `ring/30`.
- **Outline:** opaque Paper White background, `border-input` (Pencil Grey), foreground text. Hover keeps the fill stable and shifts the border to Beaver Pelt Amber at 45% so date buttons and toggle-style fields behave like every other input.
- **Secondary:** Light Vellum background, Ink Deep text. Hover dims to `/80`.
- **Ghost:** transparent, no border. Hover fills with `bg-muted`. Used in dense toolbars where multiple buttons share a row.
- **Destructive:** translucent crimson background (`bg-destructive/10`), full crimson text. Hover deepens to `/20`. Reserves real saturated crimson for the foreground because that is where the user looks.
- **Link:** primary color text, `underline-offset-4`, underline on hover. Inline-only.
- **Sizes:** `xs` (20px tall, 10px text), `sm` (24px tall), `default` (28px), `lg` (32px). All compact by mainstream-product standards. Icon-only variants (`size-icon-*`) keep the same heights at square aspect.

### Inputs

- **Style:** 28px tall (`h-7`), `border-input` (Pencil Grey) at 1px, opaque Paper White fill, and 10px corners. Text inputs, textareas, selects, comboboxes, currency inputs, rich pickers, and outline/date buttons all consume the same shared control-surface primitive.
- **Type:** 14px (`text-sm`) for value, 12px (`text-xs/relaxed`) on `md:` breakpoints (responsive density). Placeholder uses Ink Mid.
- **Hover / focus:** hover shifts only the border to Beaver Pelt Amber at 45%. Focus uses the full primary border plus a 2px primary ring at 20%. Fill and geometry do not change between states.
- **Invalid:** `aria-invalid` colors the border crimson and adds a 2px crimson ring at `/20` opacity.
- **File inputs:** the file button inlines at 24px tall, transparent background, 12px font.

### Cards

- **Corner Style:** softly rounded (`rounded-xl`, 14px) so grouped ledger surfaces feel like a single machined tray.
- **Background:** Paper White in light mode, a slightly-lifted warm dark in dark mode (`oklch(0.205 0.008 92)`).
- **Edge:** `ring-1 ring-foreground/10` (the Ring-Hairline Rule) and a restrained one-pixel ambient shadow. No inset highlight and no hover lift.
- **Internal padding:** 16px vertical (`py-4`), 16px horizontal (`px-4`) at default size; 12px at `data-size="sm"`.
- **Title:** `font-heading text-sm font-medium` (which equals Inter Medium 14px, since `font-heading == font-sans`).
- **Description:** Ink Mid at 12px.
- **Image-leading cards:** when the first child is `<img>`, the card removes top padding so the image sits flush to the rounded top corners.

### Sidebar Navigation

- **Style:** inset warm glass enclosure with a rounded 10px edge, a subtle ambient shadow, and backdrop blur where supported.
- **Item type:** 12px body, 500 weight when active, 400 when default.
- **Active state:** a neutral Vellum squircle with stronger label weight. It marks location without turning every navigation row into a capsule.
- **Hover state:** Light Vellum background, Ink Near-Black text.
- **Icon size:** 14px (`size-3.5`), Lucide icons exclusively.

### Privacy-Mode Numeric

- **Behavior:** when `usePrivacyMode` is true, every formatted-currency value renders as a fixed-width mask (e.g., `••••.••`) with `font-variant-numeric: tabular-nums` so the row layout does not jump.
- **Color:** unchanged from the underlying value. Privacy is about visibility, not de-emphasis.
- **Treat as:** a first-class component state, not an afterthought. Any new numeric display must support it.

### Charts

- **Library:** Recharts and `@nivo/sankey`.
- **Palette:** the seven semantic account colors above. The grey `chart-1..5` ramp is reserved for non-categorical series.
- **Grid lines:** Pencil Grey at 1px. Axis labels: Ink Mid at 10px Label.
- **No fill gradients.** Sankey ribbons and area charts use solid color or a tonal ramp on the same hue. Never a multi-hue gradient.

### Named Rules

**The Compact-Target Rule.** Buttons and inputs are 28px tall by default. Touch-priority surfaces (mobile sheet actions, mobile nav) may opt into 32-44px, but desktop never exceeds 28px without explicit reason. The hit area extends invisibly via `padding` for accessibility, but the visible chrome stays compact.

**The State-Motion Rule.** State changes (hover, focus, active, disabled, invalid) shift color and ring. Pressable controls may scale to 0.96-0.98 for 150ms. Overlays use opacity, scale, and transform for 150-250ms with quart or quint easing. Layout properties are never animated.

## 6. Do's and Don'ts

### Do

- **Do** use the 10px root radius consistently. Dense controls resolve to 8px; cards and floating chrome resolve to 14-22px.
- **Do** tint every neutral toward hue 92° with chroma 0.005-0.01.
- **Do** use OKLCH for color values in `styles.css`. Match the existing token format; never split the source of truth into hex/HSL/RGB.
- **Do** apply `font-variant-numeric: tabular-nums` to any column of numbers.
- **Do** use the seven-color semantic account palette consistently. Net worth is always green; liabilities are always red; investments are always amber-orange.
- **Do** use `ring-1 ring-foreground/10` to give cards an edge.
- **Do** reserve liquid glass for app chrome and floating layers. Keep ledger content opaque.
- **Do** keep buttons and inputs at `h-7` (28px) by default.
- **Do** use Lucide for every icon. Single-family icon set.
- **Do** make privacy-mode masking work for any new financial value rendered.
- **Do** respect `prefers-reduced-motion`, especially for any transition over 150ms.

### Don't

- **Don't** use `#000` or `#fff` anywhere. Every neutral must carry the warm hue tint.
- **Don't** use large shadows on inline content. Ambient depth is reserved for genuinely floating layers.
- **Don't** use `background-clip: text` with a gradient. No gradient text, no gradient hero metrics, no "background gradient meets soft glow." Solid colors only.
- **Don't** introduce a second typeface. Inter Variable does all the work. Hierarchy is scale + weight.
- **Don't** add cool greys, slate, navy, or "cyberpunk" neon. Even the dark theme stays warm-neutral.
- **Don't** use a `border-left` or `border-right` greater than 1px as a colored stripe accent on cards, alerts, or list items. This is the absolute-banned side-stripe pattern.
- **Don't** repurpose the seven account colors for non-categorical decoration. They are bound to their account category for the life of the product.
- **Don't** wrap every metric in a card. Tabular and inline displays are usually correct; the card is the lazy answer.
- **Don't** show identical icon-heading-text card grids. The landing page already brushes against this; no further surfaces should adopt the pattern.
- **Don't** imply auto-import is "coming soon" or that manual entry is a fallback. Manual is the feature; the design must say so.
- **Don't** gamify. No streaks, no confetti, no green/red "you saved!" dopamine. The reward for logging is the awareness, not the animation.
- **Don't** turn every card into glass. Blur on dense tables, charts, or financial values reduces trust and legibility.
- **Don't** bump default body size up "to feel more breathable." Density is the design.
