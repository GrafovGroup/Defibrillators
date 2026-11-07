# Phase 1A design system

The approved visual direction is implemented as semantic HTML: navy utility bar; modern italic navy/red wordmark with red pulse underline; white masthead and uppercase navigation; a tall split hero with real AED/cabinet photography; red primary and outlined secondary actions; a four-item support strip; and four prominent photographic service cards. Lower sections continue the same restrained clinical/corporate style.

## Tokens

| Role           | Token                                 |
| -------------- | ------------------------------------- |
| Primary navy   | `#102B4E`                             |
| Deep navy      | `#09213E`                             |
| Action red     | `#D62839`                             |
| Action hover   | `#B91C2C`                             |
| Canvas         | `#F5F8FB`                             |
| Body text      | `#18324F`                             |
| Secondary text | `#506278`                             |
| Borders        | `#D9E2EB`                             |
| Focus ring     | `#1872CB`, 3px with 5px offset        |
| Container      | 1480px maximum, fluid 20–64px gutters |
| CTA radius     | 8px                                   |
| Card radius    | 10px                                  |
| Type           | Self-hosted Inter, Arial fallback     |

## Responsive behaviour

Desktop navigation becomes a native expandable menu below 901px. Four service columns become two below 901px and one below 600px. The split hero stacks below 600px. Programs, resources and contact become single-column layouts at tablet widths. Primary actions remain at least 50px tall; language controls provide 42px-tall targets. No sticky header obscures focus or anchor targets.

Shared components ensure consistent navigation and structure across locales. Headings and buttons allow French text expansion. The language selector links to equivalent localized homepages. The root presents both languages without relying on browser language detection or scripting.

## Brand deliverables

`public/brand/wordmark-{light,dark}.svg` contains only outlined lettering and an original pulse. `logo-{en,fr}-{light,dark}.svg` includes outlined localized taglines. Favicon uses a navy tile, white pulse and red dot. SVG title elements and HTML image alt/accessible link names provide alternatives. All logos remain scalable without embedded raster artwork or external fonts.

## Visual differences requiring approval

The approved mockup's exact generated product/lobby scene is not used because the master prompt requires real, licensed product imagery. A licensed photograph of an actual wall-mounted AED cabinet replaces it. Service cards use separate licensed equipment images; a real training photo illustrates program coordination. These are illustrative examples and should be replaced with approved supplier/current installation photography when available. The semantic layout, proportions and colour direction follow the reference.

## Accessibility approach

Semantic landmarks, one H1, skip link, native disclosure controls, meaningful image alternatives, visible focus styles, reduced-motion overrides and tested palette contrast. The site does not claim a complete WCAG certification. Browser checks and current testing limits are recorded in `QA.md`.
