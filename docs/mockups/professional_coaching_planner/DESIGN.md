---
name: Professional Coaching Planner
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#42474f'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#727780'
  outline-variant: '#c2c7d1'
  surface-tint: '#2d6197'
  primary: '#00355f'
  on-primary: '#ffffff'
  primary-container: '#0f4c81'
  on-primary-container: '#8ebdf9'
  inverse-primary: '#a0c9ff'
  secondary: '#855300'
  on-secondary: '#ffffff'
  secondary-container: '#fea619'
  on-secondary-container: '#684000'
  tertiary: '#532800'
  on-tertiary: '#ffffff'
  tertiary-container: '#743b00'
  on-tertiary-container: '#f9a767'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d2e4ff'
  primary-fixed-dim: '#a0c9ff'
  on-primary-fixed: '#001c37'
  on-primary-fixed-variant: '#07497d'
  secondary-fixed: '#ffddb8'
  secondary-fixed-dim: '#ffb95f'
  on-secondary-fixed: '#2a1700'
  on-secondary-fixed-variant: '#653e00'
  tertiary-fixed: '#ffdcc4'
  tertiary-fixed-dim: '#ffb780'
  on-tertiary-fixed: '#2f1400'
  on-tertiary-fixed-variant: '#6f3800'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  h1:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  h2:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  h3:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  data-mono:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  gutter: 24px
  margin: 32px
---

## Brand & Style
The design system is engineered for the high-stakes environment of management consulting. It prioritizes operational efficiency, clarity, and precision. The brand personality is authoritative yet accessible, evoking a sense of calm control over complex data.

The style is **Corporate Modern Minimalism**. It leverages significant whitespace to reduce the cognitive load of data-dense interfaces. Visual flourish is minimized in favor of functional clarity, ensuring that consultants can identify budget risks and schedule conflicts at a glance. The aesthetic is "operational premium"—it feels like a high-end tool built for serious work.

## Colors
The palette is rooted in a trustworthy **Corporate Blue** (#0F4C81) which serves as the primary anchor for actions and brand presence. 

- **Primary:** Used for primary buttons, active navigation states, and key progress indicators.
- **Secondary (Warning):** A clear **Amber** (#F59E0B) is reserved strictly for budget overruns, late tasks, and critical warnings. 
- **Neutrals:** A range of **Slate Grays** defines the UI structure. The background uses a very faint slate tint to reduce eye strain, while text utilizes deep slates for high legibility without the harshness of pure black.
- **Semantic:** Success is represented by a muted emerald, while standard data points remain in the slate scale.

## Typography
This design system utilizes **Inter** for its exceptional legibility in data-heavy environments. 

The typographic scale is disciplined. Headlines use a semi-bold weight with tight letter-spacing to feel grounded. Body text is optimized for long-form reading in reports. A specific "Data-Mono" style is utilized for numerical values in tables and budget breakdowns, ensuring that columns of numbers align perfectly for easy comparison.

## Layout & Spacing
The layout follows a **12-column fluid grid** system with fixed maximum widths for readability on ultra-wide monitors. 

Spacing follows a strict 4px/8px baseline grid. Dashboards should utilize a "Content-First" approach, where margins between cards are generous (24px) to prevent the interface from feeling cluttered despite high data density. Data tables should offer "Compact" and "Comfortable" density modes, toggling between 8px and 16px vertical cell padding.

## Elevation & Depth
Depth is conveyed through **Tonal Layering** and **Low-Contrast Outlines** rather than heavy shadows. 

- **Level 0 (Background):** The base canvas in the lightest slate tint.
- **Level 1 (Cards/Surface):** White surfaces with a 1px solid border in Slate-200. No shadow.
- **Level 2 (Overlays/Dropdowns):** White surfaces with a very soft, diffused ambient shadow (10% opacity) to provide separation from the base layers.

This "Flat-Plus" approach maintains the professional, clean aesthetic without the visual noise of skeuomorphism.

## Shapes
The shape language is defined by **Soft Rounded Corners**. 

Standard UI elements like buttons, input fields, and cards utilize a 0.5rem (8px) corner radius. This softens the "corporate" edge of the app, making it feel modern and user-friendly. Small components like tags and badges use a full pill-shape to distinguish them from interactive buttons.

## Components
- **Buttons:** Primary buttons are solid Corporate Blue with white text. Ghost buttons use a Slate-600 outline for secondary actions.
- **Data Visualizations:** Progress bars use a thick 8px track. The track is Slate-100; the fill is Primary Blue, switching to Warning Amber when budget exceeds 90%.
- **Structured Lists:** Used for project timelines. These feature high-contrast headers and subtle zebra-striping on hover to help the eye track across horizontal rows.
- **Input Fields:** Minimalist design with a focus on focus-states. When active, the border shifts to Primary Blue with a 2px outer glow. Labels are always persistent; never use placeholders as labels.
- **Cards:** Used as containers for dashboard widgets. Each card includes a standard header with a bottom border and an optional "Action" area in the footer.
- **Status Badges:** Small, pill-shaped indicators with low-opacity background tints and high-opacity text for project status (e.g., "In Progress," "Completed," "Delayed").