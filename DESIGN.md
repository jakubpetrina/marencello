# Design System Strategy: The Azure Editorial

## 1. Overview & Creative North Star
**Creative North Star: "The Modern Navigator"**

This design system is not a utility; it is a curated experience. It moves away from the rigid, boxed-in layouts of traditional SaaS and toward the fluid, expansive feel of a high-end Mediterranean lifestyle journal. To achieve this "Modern Navigator" aesthetic, we prioritize **asymmetric balance** and **tonal depth** over structural lines. 

The system breaks the "template" look by using exaggerated whitespace (`spacing-24`) and overlapping elements—such as imagery bleeding off the edge of the viewport or typography layered over subtle glass containers—creating a sense of motion and coastal air.

---

## 2. Colors & Surface Philosophy
The palette is a monochromatic study in maritime depth. We move from the deep abyss of `primary` (#003f6c) to the sun-bleached clarity of `surface-container-lowest` (#ffffff).

### The "No-Line" Rule
**Standard 1px borders are strictly prohibited for sectioning.** 
Structural definition must be achieved through background shifts. A section using `surface-container-low` should sit directly against the `surface` background. The transition between these tonal blocks provides all the visual boundary needed for a premium feel.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers, like fine stationery stacked on a marble desk.
*   **Base:** `surface` (#f7f9ff)
*   **Secondary Content:** `surface-container-low` (#eff4fc)
*   **Floating UI/Cards:** `surface-container-lowest` (#ffffff)
*   **Tertiary Accents:** `surface-container-high` (#e4e8f0)

### The "Glass & Gradient" Rule
To avoid a flat, "out-of-the-box" appearance, floating elements (modals, navigation bars) should utilize **Glassmorphism**. Apply `surface-container-lowest` at 80% opacity with a `backdrop-filter: blur(12px)`. For primary CTAs, use a subtle linear gradient from `primary` (#003f6c) to `primary-container` (#005792) at a 135-degree angle to provide a "soulful" luster.

---

## 3. Typography
The typographic pairing reflects the brand’s dual nature: the heritage of the Mediterranean and the precision of modern yachting.

*   **Display & Headlines (Playfair Display):** Used to anchor the editorial feel. `display-lg` should be used sparingly, often set with slightly tighter letter-spacing (-0.02em) to feel like a masthead.
*   **Body & UI (Inter):** The "workhorse" that ensures clarity. Use `body-lg` for introductory paragraphs to maintain the "luxury journal" scale.
*   **Hierarchy as Identity:** Always lead with a `display` or `headline` element. The contrast between the high-waisted serifs of Playfair and the neutral, functional Inter creates an immediate sense of professional curation.

---

## 4. Elevation & Depth

### The Layering Principle
Depth is achieved by "stacking" tonal tiers. Place a `surface-container-lowest` card on a `surface-container-low` background. This creates a soft, natural lift that feels organic rather than digital.

### Ambient Shadows
Shadows must be invisible until noticed. 
*   **Style:** Extra-diffused.
*   **Values:** `box-shadow: 0 12px 40px rgba(0, 63, 108, 0.06);` 
*   Note the use of a tinted shadow (using a low-opacity `primary` blue) rather than grey. This mimics natural light reflecting off water.

### The "Ghost Border" Fallback
If a border is required for accessibility (e.g., input fields), use the `outline-variant` token at **20% opacity**. 100% opaque borders are too "heavy" for this system and are to be avoided.

---

## 5. Components

### Buttons
*   **Primary:** Gradient fill (`primary` to `primary-container`), white text, 8px (`DEFAULT`) radius. Large horizontal padding (`spacing-6`).
*   **Secondary:** No background. `primary` text with a "Ghost Border" (20% `outline-variant`).
*   **Tertiary/Ghost:** Text only, using `primary` color, with a subtle underline appearing only on hover.

### Cards & Lists
*   **Constraint:** Forbid the use of divider lines. 
*   **Alternative:** Use `spacing-5` or `spacing-6` between list items. For cards, use the "Layering Principle" (White card on a `surface-low` background).

### Inputs
*   **Style:** `surface-container-lowest` background with a 1px "Ghost Border." On focus, transition the border to `primary` at 50% opacity and add a soft blue ambient shadow.

### Signature Component: The "Editorial Float"
A decorative component where a `display-sm` heading overlaps a high-resolution image, partially contained within a glassmorphic blur block. This is the hallmark of the design system's layout.

---

## 6. Do’s and Don’ts

### Do:
*   **Do** embrace asymmetry. Center-aligned text should be rare; favor left-aligned editorial layouts.
*   **Do** use `spacing-16` and `spacing-20` to let key sections "breathe." Luxury is defined by the space you *don't* use.
*   **Do** use `notoSerif` (Playfair) for numbers in pricing or data displays to maintain the premium feel.

### Don’t:
*   **Don’t** use pure black (#000000). Always use `on-surface` (#171c22) or `Charcoal` for text to keep the palette soft.
*   **Don’t** use 1px solid dividers to separate content. Use tonal shifts or white space.
*   **Don’t** use high-intensity shadows. If the shadow looks like a "drop shadow," it is too dark.
*   **Don’t** cram content. If a screen feels busy, increase the `surface` area and move secondary information to a "Ghost" style button or tooltip.