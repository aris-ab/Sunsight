---
name: Helios Geographic
colors:
  surface: '#0f131c'
  surface-dim: '#0f131c'
  surface-bright: '#353943'
  surface-container-lowest: '#0a0e17'
  surface-container-low: '#181b25'
  surface-container: '#1c1f29'
  surface-container-high: '#262a34'
  surface-container-highest: '#31353f'
  on-surface: '#dfe2ef'
  on-surface-variant: '#d8c3ad'
  inverse-surface: '#dfe2ef'
  inverse-on-surface: '#2c303a'
  outline: '#a08e7a'
  outline-variant: '#534434'
  surface-tint: '#ffb95f'
  primary: '#ffc174'
  on-primary: '#472a00'
  primary-container: '#f59e0b'
  on-primary-container: '#613b00'
  inverse-primary: '#855300'
  secondary: '#4cd7f6'
  on-secondary: '#003640'
  secondary-container: '#03b5d3'
  on-secondary-container: '#00424e'
  tertiary: '#56e5a9'
  on-tertiary: '#003824'
  tertiary-container: '#30c88f'
  on-tertiary-container: '#004e34'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffddb8'
  primary-fixed-dim: '#ffb95f'
  on-primary-fixed: '#2a1700'
  on-primary-fixed-variant: '#653e00'
  secondary-fixed: '#acedff'
  secondary-fixed-dim: '#4cd7f6'
  on-secondary-fixed: '#001f26'
  on-secondary-fixed-variant: '#004e5c'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#0f131c'
  on-background: '#dfe2ef'
  surface-variant: '#31353f'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.005em
  metric-stat:
    fontFamily: JetBrains Mono
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.03em
  metric-stat-sm:
    fontFamily: JetBrains Mono
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 22px
    letterSpacing: -0.02em
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.06em
  label-ui:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.01em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-lg: 1.5rem
  margin: 1rem
  margin-md: 1.5rem
  margin-lg: 2rem
  space-xxs: 0.125rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
  space-2xl: 2rem
  space-3xl: 3rem
---

## Brand & Style

This design system drives a high-precision solar intelligence and PV simulation suite. The aesthetic fuses aerospace-grade GIS tooling with modern analytical clarity. It evokes precision, environmental stewardship, cutting-edge engineering, and high-yield financial predictability.

The visual direction centers on **Technical Glassmorphism & High-Contrast Precision**:
- Ultra-deep, cold obsidian canvas layers allow high-luminance geospatial data (solar irradiance heatmaps, CAD roof planes) to command the primary focal plane.
- Translucent, frosted glass cards float cleanly over interactive 3D satellite tiles and vector topologies without occluding contextual topography.
- High-contrast, sharp typographic metrics paired with luminous energetic accents transform complex meteorological and electrical modeling into instant tactical decisions.

## Colors

The palette balances deep spatial voids with radiant, purposeful luminance tokens:

- **Canvas & Surface Tier:**
  - Base Viewport Canvas: `#090D16` (Deep Obsidian Slate)
  - Surface Tier 1 (Panel Backgrounds, Toolbars): `#0F172A` (Rich Zinc Slate)
  - Surface Tier 2 (Hover States, Inset Panels, Active Wells): `#1E293B` (Luminous Slate)
  - Ghost Borders & Separators: `rgba(148, 163, 184, 0.12)` to `rgba(255, 255, 255, 0.08)`
- **Luminance & Metric Semantics:**
  - **Solar Irradiance / Primary:** `#F59E0B` (Vibrant Solar Amber), with `#FBBF24` for focal hover states, active azimuth lines, and peak solar hour callouts.
  - **GIS / Tooling Highlights:** `#06B6D4` (Electric Cyan) and `#38BDF8` (Sky) for raytracing overlays, PV panel mesh wireframes, dimensional CAD bounds, and active toggle markers.
  - **Yield & Net Positive ROI:** `#10B981` (High-Efficiency Emerald) for annual production totals, offset metrics, payback timeline curves, and environmental credits.
  - **System Critical & Shadow Obstruction:** `#EF4444` (Infrared Crimson) for clipping planes, heavy LIDAR tree shading, and threshold warnings.

## Typography

The type ecosystem uses a tri-font pairing to establish strict hierarchy between structural headings, dense UI labels, and numerical telemetry:

- **Headlines (Plus Jakarta Sans):** Geometric, contemporary, and engineered with tight letterforms for clear hierarchy without visual bloat.
- **Body & Controls (Inter):** Highly legible, neutral workhorse engineered for dense analytical overlays, inspector sidebars, and parameter inputs.
- **Telemetry & Technical Indicators (JetBrains Mono):** Applied to all computational figures—kilowatt hours (kWh), rooftop tilt angles, coordinates, currency projections, and azimuth degrees. Monospaced numerals preserve layout stability during real-time slider drags and 3D camera rotations.

## Layout & Spacing

The architecture operates on an interactive **Full-Viewport GIS HUD Grid**:
- **Canvas Base:** Edge-to-edge satellite and 3D webGL mesh viewport taking 100% width and height.
- **Docked HUD Panels:** 
  - Left Tooling Inspector: Fixed 380px (desktop) or sheet-dock (mobile) anchored with `margin-lg` offset.
  - Floating Top Nav: 56px height, pill or full-width suspended with `space-lg` inset.
  - Floating Floating Contextual Toolbar (CAD controls, 3D compass, solar slider): Floats centrally at the bottom or top-right with `space-md` gaps.
- **Reflow & Adaptability:**
  - **Desktop (>=1280px):** Floating dual sidebars (left parameter panel, right financial chart deck) over full-bleed satellite canvas.
  - **Tablet (768px - 1279px):** Collapsible right rail; inspector collapses to a sliding tray.
  - **Mobile (<768px):** Satellite viewport remains constant; tooling and metrics compress into an expandable bottom drawer featuring snap heights (20%, 50%, 85% screen height).

## Elevation & Depth

Visual hierarchy is maintained via translucent frosted layers and high-precision boundary strokes rather than muddy, deep shadows.

- **Level 0 (Base Layer):** 3D WebGL map render, heatmaps, shadow simulation meshes.
- **Level 1 (Floating HUD & Contextual Toolbars):** Background `rgba(15, 23, 42, 0.75)`, backdrop blur `16px`, bordered with `1px solid rgba(255, 255, 255, 0.08)`. Shadow: `0 8px 32px -4px rgba(0, 0, 0, 0.4)`.
- **Level 2 (Inspector Overlays, Flyouts, Dropdowns):** Background `rgba(30, 41, 59, 0.88)`, backdrop blur `24px`, bordered with `1px solid rgba(148, 163, 184, 0.16)`. Shadow: `0 12px 40px -6px rgba(0, 0, 0, 0.6)`.
- **Level 3 (Modal Simulators, System Dialogs):** Background `#0F172A` with an ambient glow tinted toward the primary solar accent: `box-shadow: 0 0 0 1px rgba(245, 158, 11, 0.2), 0 24px 64px -12px rgba(0, 0, 0, 0.8)`.

## Shapes

The design system adopts a **Sleek Soft Industrial** shape profile (`roundedness: 1`):
- Tactical panels, toolbar docks, and analytical cards utilize `0.5rem` (`rounded-lg`).
- Interactive inputs, segmented switches, technical chips, and action buttons utilize `0.25rem` (`rounded-sm` / base soft).
- Precise HUD utilities (such as the 3D compass dial, sun-path arc scrubbers, and zoom clusters) retain strict circular geometry (`rounded-full`) to complement radial GIS indicators.

## Components

### Buttons
- **Primary (Solar Direct):** Vibrant amber background (`#F59E0B`), text `#090D16` (heavy weight), subtle inner top glow `inset 0 1px 0 rgba(255,255,255,0.3)`. Hover: `#FBBF24`.
- **Secondary / CAD Tooling:** Translucent slate (`rgba(30, 41, 59, 0.7)`), 1px border `rgba(148, 163, 184, 0.2)`, text `#F8FAFC`. Hover: Border `#06B6D4`, text `#38BDF8`.
- **Ghost Utility:** Borderless, text `#94A3B8`, hover background `rgba(255, 255, 255, 0.05)`, hover text `#FFFFFF`.

### Technical Badges & Metric Chips
- Inline labels displaying system status, pitch angle, or solar tier.
- Layout: Monospaced uppercase text, `2px 6px` padding, hairline border `rgba(255, 255, 255, 0.1)`.
- Variants:
  - *Solar Optimal:* Emerald border `rgba(16, 185, 129, 0.3)`, text `#10B981`, background `rgba(16, 185, 129, 0.08)`.
  - *Sub-Optimal / Shaded:* Amber border `rgba(245, 158, 11, 0.3)`, text `#F59E0B`, background `rgba(245, 158, 11, 0.08)`.

### Interactive Sliders (Time of Day / Azimuth / Offset Target)
- Track: 4px height, background `#1E293B`, filled range highlighted in dynamic gradient (`#F59E0B` to `#06B6D4`).
- Thumb: 16px circular puck, background `#FFFFFF`, border `2px solid #090D16`, ring `2px solid #F59E0B`. Active drag renders radial bloom shadow `0 0 12px #F59E0B`.
- Integrated tick marks for seasonal solstices and peak solar noon.

### Compass Dial & Orientation Widget
- Circular 64px HUD module suspended in the satellite corner.
- Dynamic rotating dial showing True North vs. Roof Azimuth.
- Precision degree readouts rendered in JetBrains Mono (`label-mono`) updating continuously during orbital panning.

### Input Fields & Parameter Controls
- Background `#090D16`, border `1px solid rgba(148, 163, 184, 0.15)`.
- Text `#F8FAFC`, placeholder `#64748B`.
- Focus state: Border `#06B6D4`, box-shadow `0 0 0 1px #06B6D4`.
- Integrated unit adornments (e.g., `sq ft`, `°`, `kW`, `$`) right-aligned in muted monospace.

### Cards & Analytical Panels
- Frosted dark base `rgba(15, 23, 42, 0.85)` with backdrop filter `blur(12px)`.
- Micro-headers containing module icon, uppercase category title, and secondary telemetry badge.
- Inner grid dividing stats into clear value-unit pairs with micro line graphs or yield distribution histograms.
