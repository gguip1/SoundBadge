# 기여 가이드

[English](CONTRIBUTING.md) | **한국어**

---

SoundBadge에 관심을 가져주셔서 감사합니다! 버그 리포트, 기능 제안, 새로운 테마/템플릿 추가 등 어떤 형태의 기여든 환영합니다.

## 시작하기

### 요구 사항

- Node.js 18+
- [bun](https://bun.sh) (npm/yarn 사용 금지)
- [YouTube Data API v3 키](https://console.cloud.google.com/apis/library/youtube.googleapis.com)

### 로컬 환경 설정

```bash
# 1. Fork 후 클론
git clone https://github.com/<your-username>/SoundBadge.git
cd SoundBadge

# 2. 의존성 설치
bun install

# 3. 환경 변수 설정
cp .env.example .env.local
# .env.local에 YOUTUBE_API_KEY 입력

# 4. 개발 서버 실행
bun dev
```

### 개발 명령어

```bash
bun dev            # 개발 서버 (Turbopack)
bun run build      # 프로덕션 빌드
bun run lint       # ESLint
bun run typecheck  # TypeScript 타입 체크
```

## PR 워크플로우

1. `main`에서 새 브랜치 생성
   ```bash
   git checkout -b feat/my-feature
   ```
2. 변경사항 작성 및 커밋
3. lint & 타입 체크 통과 확인
   ```bash
   bun run lint && bun run typecheck
   ```
4. Push 후 PR 생성
   ```bash
   git push origin feat/my-feature
   ```

### 브랜치 네이밍

| 접두사 | 용도 |
|--------|------|
| `feat/` | 새 기능 |
| `fix/` | 버그 수정 |
| `theme/` | 새 테마/템플릿 |
| `docs/` | 문서 수정 |
| `refactor/` | 리팩토링 |

## 새 클래식 테마 추가

클래식 테마는 썸네일 + 제목 + 채널 정보가 포함된 카드 스타일입니다.

### 1. 테마 파일 생성

`src/themes/presets/your-theme.ts`:

```typescript
import type { Theme } from "../types";

export const yourTheme: Theme = {
  name: "your-theme",   // ThemeName 타입에 추가 필요
  label: "Your Theme",
  tokens: {
    bg: "#ffffff",       // 배경 (단색 또는 CSS 그라데이션)
    fg: "#1a1a1a",       // 메인 텍스트
    muted: "#6b7280",    // 서브 텍스트
    accent: "#3b82f6",   // 포인트 색상
    border: "#e5e7eb",   // 테두리 ("none" 가능)
    shadow: "none",      // 그림자 (CSS box-shadow 또는 "none")
    radius: 12,          // 카드 라운드 (px)
    pattern: "none",     // 배경 패턴: "none" | "noise" | "grid" | "dots"
  },
};
```

### 2. 타입 등록

`src/themes/types.ts`의 `ThemeName` 유니온에 추가:

```typescript
export type ThemeName =
  | "minimal"
  // ...
  | "your-theme";
```

### 3. 레지스트리 등록

`src/themes/index.ts`에서 import 후 등록.

## 새 템플릿 추가

템플릿은 클래식 테마보다 자유로운 SVG 레이아웃입니다 (badge, stream, terminal 등).

### 1. 템플릿 파일 생성

`src/templates/your-template.ts`:

```typescript
import type { Template, TemplateRenderOptions } from "./types";
import { truncate, esc } from "./utils";

export const yourTemplate: Template = {
  meta: {
    id: "your-template",
    displayName: "Your Template",
    description: "템플릿 설명",
    category: "simple",           // "simple" | "player" | "visual" | "developer"
    supportsLayout: false,
    supportsMultiTrack: false,
    maxTracks: 1,
    variants: [],                 // 색상 변형이 있으면 추가
    previewDimensions: { width: 480, height: 180 },
  },

  render(options: TemplateRenderOptions): string {
    const { track, tracks, variant } = options;

    return `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="180" viewBox="0 0 480 180">
      <!-- 여기에 SVG 렌더링 로직 -->
    </svg>`;
  },
};
```

### 2. 레지스트리 등록

`src/templates/index.ts`에서 import 후 등록.

### 유틸리티 함수

`src/templates/utils.ts`에서 제공:

- `truncate(text, maxLen)` — 텍스트 자르기 (말줄임표 포함)
- `esc(text)` — SVG/XML 이스케이프
- `fetchImageAsBase64(url)` — 이미지를 base64로 변환

## 코드 컨벤션

- **컴포넌트**: PascalCase (`CardPreview.tsx`)
- **유틸/함수**: camelCase (`parseYouTubeUrl`)
- **파일명**: kebab-case (`card-renderer.ts`)
- **경로 alias**: `@/*` → `src/*`
- **API Route**: Edge Runtime 사용

## 이슈 & 버그 리포트

이슈 생성 시 제공되는 이슈 템플릿을 사용해주세요. 포함할 내용:

- 재현 단계
- 기대 동작 vs 실제 동작
- 사용한 테마/템플릿/파라미터
- 스크린샷 (가능하면)
