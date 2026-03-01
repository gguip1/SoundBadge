<div align="center">

**English** | [한국어](README-ko.md)

# SoundBadge

**Your code has a soundtrack. Show it.**

Turn a YouTube link into a music taste badge for your GitHub profile.

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![Deploy with Vercel](https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel)](https://sound-badge.vercel.app)

</div>

---

Your GitHub profile says a lot about you — your languages, your contributions, your streak. But it says nothing about what's playing in your headphones right now.

**SoundBadge** fixes that. Paste a YouTube link, pick a style, and drop a live music card into your README. It renders on-the-fly as an SVG — no build step, no tokens, no auth.

---

## Quick Start

**1.** Go to the [SoundBadge Builder](https://sound-badge.vercel.app), paste a YouTube URL, pick a theme, and copy the code.

**2.** Or just copy this directly:

```md
![My Music](https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=LJny-d5sJ_8&theme=stream)
```

**3.** Paste it into your GitHub `README.md`.

That's it.

---

## Examples

### Templates

Five purpose-built templates — from minimal badges to full player UIs.

#### Badge

One-line inline badge. Fits anywhere.

<img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=LJny-d5sJ_8&theme=badge" alt="Badge template" />

<details>
<summary>Color variants</summary>
<br />

| Variant | Preview |
|---------|---------|
| `blue` | <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=LJny-d5sJ_8&theme=badge&variant=blue" alt="badge blue" /> |
| `green` | <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=LJny-d5sJ_8&theme=badge&variant=green" alt="badge green" /> |
| `red` | <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=LJny-d5sJ_8&theme=badge&variant=red" alt="badge red" /> |
| `purple` | <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=LJny-d5sJ_8&theme=badge&variant=purple" alt="badge purple" /> |
| `orange` | <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=LJny-d5sJ_8&theme=badge&variant=orange" alt="badge orange" /> |

</details>

#### Clean

A clean, minimal card. Supports all layouts and multi-track.

<img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=LJny-d5sJ_8&theme=clean" alt="Clean template" />

#### Stream

Streaming player UI with animated equalizer and progress bar.

<img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=LJny-d5sJ_8&theme=stream" alt="Stream template" />

<details>
<summary>Color variants</summary>
<br />

| Variant | Preview |
|---------|---------|
| `green` | <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=LJny-d5sJ_8&theme=stream&variant=green" alt="stream green" /> |
| `purple` | <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=LJny-d5sJ_8&theme=stream&variant=purple" alt="stream purple" /> |
| `blue` | <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=LJny-d5sJ_8&theme=stream&variant=blue" alt="stream blue" /> |
| `pink` | <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=LJny-d5sJ_8&theme=stream&variant=pink" alt="stream pink" /> |
| `red` | <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=LJny-d5sJ_8&theme=stream&variant=red" alt="stream red" /> |

</details>

#### Terminal

For the devs. Monospace font, terminal chrome, cursor blink.

<img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=LJny-d5sJ_8&theme=terminal" alt="Terminal template" />

#### Neon

Glowing neon with glassmorphism grid and pulsing border.

<img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=LJny-d5sJ_8&theme=neon" alt="Neon template" />

<details>
<summary>Color variants</summary>
<br />

| Variant | Preview |
|---------|---------|
| `green` | <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=LJny-d5sJ_8&theme=neon&variant=green" alt="neon green" /> |
| `pink` | <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=LJny-d5sJ_8&theme=neon&variant=pink" alt="neon pink" /> |
| `cyan` | <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=LJny-d5sJ_8&theme=neon&variant=cyan" alt="neon cyan" /> |

</details>

#### Receipt

Vertical multi-track layout mimicking a store receipt or concert ticket.

<img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=LJny-d5sJ_8&url=https://www.youtube.com/watch?v=jfKfPfyJRdk&theme=receipt&v=1" alt="Receipt template" />

<details>
<summary>Color variants</summary>
<br />

| Variant | Preview |
|---------|---------|
| `receipt` | <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=LJny-d5sJ_8&theme=receipt&variant=receipt&v=1" alt="receipt variant" /> |
| `dark_ticket` | <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=LJny-d5sJ_8&theme=receipt&variant=dark_ticket&v=1" alt="dark_ticket variant" /> |

</details>

---

### Classic Themes

Eight classic card themes with thumbnail, title, and channel info.

| | | |
|:---:|:---:|:---:|
| **Minimal** | **Mono** | **Pastel** |
| <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=LJny-d5sJ_8&theme=minimal" alt="minimal" /> | <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=LJny-d5sJ_8&theme=mono" alt="mono" /> | <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=LJny-d5sJ_8&theme=pastel" alt="pastel" /> |
| **Sunset** | **Midnight** | **Glass** |
| <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=LJny-d5sJ_8&theme=sunset" alt="sunset" /> | <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=LJny-d5sJ_8&theme=midnight" alt="midnight" /> | <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=LJny-d5sJ_8&theme=glass" alt="glass" /> |
| **Retro** | **Neon (Legacy)** | |
| <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=LJny-d5sJ_8&theme=retro" alt="retro" /> | <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=LJny-d5sJ_8&theme=neon-legacy" alt="neon legacy" /> | |

> **Note:** The classic neon theme is now `neon-legacy` since `neon` refers to the new Neon template.

---

## Customization

### Layouts

Classic themes and the Clean template support three layout sizes:

| Compact (320×80) | Regular (420×120) | Wide (600×160) |
|:-:|:-:|:-:|
| <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=LJny-d5sJ_8&theme=minimal&layout=compact" alt="compact" /> | <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=LJny-d5sJ_8&theme=minimal&layout=regular" alt="regular" /> | <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=LJny-d5sJ_8&theme=minimal&layout=wide" alt="wide" /> |

### Tags & Labels

Add context with tags and a custom label:

<img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=LJny-d5sJ_8&theme=clean&tags=kpop,chill,vibe&label=Now%20Playing" alt="tags and label example" />

```
?tags=kpop,chill,vibe&label=Now Playing
```

- **Tags**: Up to 3 comma-separated tags
- **Label**: Up to 40 characters

### Multi-Track

### Multi-Track

The `stream`, `terminal`, `neon`, `clean`, and `receipt` templates support multiple YouTube URLs — pass multiple `url` parameters:

<img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=LJny-d5sJ_8&url=https://www.youtube.com/watch?v=jfKfPfyJRdk&theme=stream&variant=green" alt="multi-track example" />

```
?url=https://www.youtube.com/watch?v=VIDEO_1&url=https://www.youtube.com/watch?v=VIDEO_2&theme=stream
```

Up to 5 tracks per card.

---

## API Reference

### `GET /api/card.svg`

Dynamically generates an SVG card image.

| Parameter | Required | Default | Description |
|-----------|:--------:|---------|-------------|
| `url` | Yes | — | YouTube URL (video or playlist). Repeat for multi-track (`&url=...&url=...`). |
| `theme` | No | `minimal` | Theme or template name (see [Examples](#examples)) |
| `layout` | No | `regular` | Card size: `compact`, `regular`, or `wide` |
| `tags` | No | — | Comma-separated tags (max 3) |
| `label` | No | — | Card label text (max 40 chars) |
| `variant` | No | — | Color variant for templates that support it |

**Base URL:**

```
https://sound-badge.vercel.app/api/card.svg
```

**Theme values:**

| Type | Values |
|------|--------|
| Classic | `minimal`, `mono`, `neon-legacy`, `pastel`, `sunset`, `midnight`, `glass`, `retro` |
| Templates | `badge`, `clean`, `stream`, `terminal`, `neon`, `receipt` |

**Variant values:**

| Template | Variants |
|----------|----------|
| `badge` | `blue`, `green`, `red`, `purple`, `orange` |
| `stream` | `green`, `purple`, `blue`, `pink`, `red` |
| `neon` | `green`, `pink`, `cyan` |
| `receipt` | `receipt`, `dark_ticket` |

---

## Use It in Your README

### Markdown

```md
![Now Playing](https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=LJny-d5sJ_8&theme=stream)
```

### HTML (recommended for more control)

```html
<a href="https://www.youtube.com/watch?v=LJny-d5sJ_8">
  <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=LJny-d5sJ_8&amp;theme=stream" alt="Now Playing" />
</a>
```

> Wrapping with `<a>` makes the card clickable — it opens the YouTube video.

### Dark / Light Mode

GitHub supports theme-specific images. Show different cards for dark and light mode:

```html
<a href="https://www.youtube.com/watch?v=LJny-d5sJ_8">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=LJny-d5sJ_8&amp;theme=mono" />
    <source media="(prefers-color-scheme: light)" srcset="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=LJny-d5sJ_8&amp;theme=minimal" />
    <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=LJny-d5sJ_8&amp;theme=minimal" alt="Now Playing" />
  </picture>
</a>
```

---

## Try the Builder

Don't want to write URLs by hand? Use the **[SoundBadge Builder](https://sound-badge.vercel.app)**.

Paste a YouTube link, pick a theme, tweak the options, and copy the ready-to-use code for your README.

---

## Self-Hosting

### Requirements

- Node.js 18+
- [bun](https://bun.sh)
- [YouTube Data API v3 key](https://console.cloud.google.com/apis/library/youtube.googleapis.com)

### Setup

```bash
# 1. Clone the repo
git clone https://github.com/gguip1/SoundBadge.git
cd SoundBadge

# 2. Install dependencies
bun install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your YouTube API key

# 4. Start development server
bun dev
```

### Environment Variables

| Variable | Required | Description |
|----------|:--------:|-------------|
| `YOUTUBE_API_KEY` | Yes | YouTube Data API v3 key |

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/gguip1/SoundBadge&env=YOUTUBE_API_KEY&envDescription=YouTube%20Data%20API%20v3%20key)

---

## Tech Stack

- **[Next.js 16](https://nextjs.org)** — App Router + Edge Runtime
- **TypeScript** — Strict mode
- **Tailwind CSS 4** — Builder UI styling
- **Vercel Edge Functions** — Low-latency SVG generation
- **YouTube Data API v3** — Video metadata

---

## Contributing

Contributions welcome — new themes, templates, bug fixes, anything goes.

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

---

## License

[Apache License 2.0](LICENSE)

---

<div align="center">

**Stop hiding your music taste behind your commit history.**

[Try the Builder](https://sound-badge.vercel.app)

</div>
