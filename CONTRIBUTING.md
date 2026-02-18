# Contributing Guide

**English** | [한국어](CONTRIBUTING-ko.md)

---

Thanks for your interest in SoundBadge! Bug reports, feature requests, new themes/templates — all contributions are welcome.

## Getting Started

### Requirements

- Node.js 18+
- [bun](https://bun.sh) (do not use npm/yarn)
- [YouTube Data API v3 key](https://console.cloud.google.com/apis/library/youtube.googleapis.com)

### Local Setup

```bash
# 1. Fork & clone
git clone https://github.com/<your-username>/SoundBadge.git
cd SoundBadge

# 2. Install dependencies
bun install

# 3. Set up environment variables
cp .env.example .env.local
# Add your YOUTUBE_API_KEY to .env.local

# 4. Start dev server
bun dev
```

### Dev Commands

```bash
bun dev            # Dev server (Turbopack)
bun run build      # Production build
bun run lint       # ESLint
bun run typecheck  # TypeScript type check
```

## PR Workflow

1. Create a new branch from `main`
   ```bash
   git checkout -b feat/my-feature
   ```
2. Make your changes and commit
3. Ensure lint & type check pass
   ```bash
   bun run lint && bun run typecheck
   ```
4. Push and open a PR
   ```bash
   git push origin feat/my-feature
   ```

### Branch Naming

| Prefix | Purpose |
|--------|---------|
| `feat/` | New feature |
| `fix/` | Bug fix |
| `theme/` | New theme/template |
| `docs/` | Documentation |
| `refactor/` | Refactoring |

## Adding a Classic Theme

Classic themes are card styles with thumbnail + title + channel info.

### 1. Create Theme File

`src/themes/presets/your-theme.ts`:

```typescript
import type { Theme } from "../types";

export const yourTheme: Theme = {
  name: "your-theme",   // Must be added to ThemeName type
  label: "Your Theme",
  tokens: {
    bg: "#ffffff",       // Background (solid color or CSS gradient)
    fg: "#1a1a1a",       // Main text
    muted: "#6b7280",    // Sub text
    accent: "#3b82f6",   // Accent color
    border: "#e5e7eb",   // Border ("none" is also valid)
    shadow: "none",      // Shadow (CSS box-shadow or "none")
    radius: 12,          // Border radius (px)
    pattern: "none",     // Background pattern: "none" | "noise" | "grid" | "dots"
  },
};
```

### 2. Register Type

Add to the `ThemeName` union in `src/themes/types.ts`:

```typescript
export type ThemeName =
  | "minimal"
  // ...
  | "your-theme";
```

### 3. Register in Registry

Import and register in `src/themes/index.ts`.

## Adding a Template

Templates have a freer SVG layout than classic themes (badge, stream, terminal, etc.).

### 1. Create Template File

`src/templates/your-template.ts`:

```typescript
import type { Template, TemplateRenderOptions } from "./types";
import { truncate, esc } from "./utils";

export const yourTemplate: Template = {
  meta: {
    id: "your-template",
    displayName: "Your Template",
    description: "Template description",
    category: "simple",           // "simple" | "player" | "visual" | "developer"
    supportsLayout: false,
    supportsMultiTrack: false,
    maxTracks: 1,
    variants: [],                 // Add color variants if needed
    previewDimensions: { width: 480, height: 180 },
  },

  render(options: TemplateRenderOptions): string {
    const { track, tracks, variant } = options;

    return `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="180" viewBox="0 0 480 180">
      <!-- Your SVG rendering logic -->
    </svg>`;
  },
};
```

### 2. Register in Registry

Import and register in `src/templates/index.ts`.

### Utility Functions

Available in `src/templates/utils.ts`:

- `truncate(text, maxLen)` — Truncate text with ellipsis
- `esc(text)` — SVG/XML escape
- `fetchImageAsBase64(url)` — Convert image to base64

## Code Conventions

- **Components**: PascalCase (`CardPreview.tsx`)
- **Utils/functions**: camelCase (`parseYouTubeUrl`)
- **File names**: kebab-case (`card-renderer.ts`)
- **Path alias**: `@/*` → `src/*`
- **API Routes**: Edge Runtime

## Issues & Bug Reports

When creating an issue, please use the provided issue templates. Include:

- Steps to reproduce
- Expected vs actual behavior
- Theme/template/parameters used
- Screenshots (if possible)
