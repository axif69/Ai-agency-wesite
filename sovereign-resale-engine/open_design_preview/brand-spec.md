---

# Brand Specification for Asif Digital Agency SaaS

## Color Palette (OKLch)
```css
:root {
  --bg: oklch(10% 0.02 260); /* Deep Space Onyx #0B0F19 */
  --surface: oklch(15% 0.05 260); /* Glassmorphism base */
  --fg: oklch(95% 0.03 100); /* White text */
  --muted: oklch(70% 0.02 100); /* Subtle text */
  --border: oklch(30% 0.05 200); /* Glass border */
  --accent: oklch(60% 0.22 250); /* Electric Blue #0071E3 */
  --accent-secondary: oklch(80% 0.18 195); /* Neon Cyan #00F0FF */
  --success: oklch(70% 0.15 140); /* Emerald Green #10B981 */
  --warning: oklch(80% 0.18 80); /* Amber #F59E0B */
}
```

## Typography
```css
:root {
  --font-display: "SF Pro", "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: "IBM Plex Mono", "SF Mono", Menlo, monospace;
  --font-body: var(--font-display);
}
```

## Glassmorphism Rules
```css
.glass-card {
  background: color-mix(in oklch, var(--surface) 80%, transparent);
  backdrop-filter: blur(25px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease;
}

.glass-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 113, 227, 0.2);
}
```

## Posture Rules
1. **Dark Mode Only**: All surfaces use `--bg` as base.
2. **Accent Rationing**: Max 2 visible `--accent` uses per screen (e.g., 1 chip + 1 CTA).
3. **Typography**: Display faces for headings, `--font-mono` for technical data.
4. **Animation**: Spring physics for hover states (cubic-bezier(0.4, 0, 0.2, 1)).
5. **Contrast**: Body text ≥ 4.5:1 on surfaces; UI components ≥ 3:1.

## System Statement
Ultra-luxurious B2B SaaS with futuristic glassmorphism, restrained accent usage, and typographic precision for executive decision-making.