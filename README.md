<div align="center">

**한국어** | [English](README-en.md)

# SoundBadge

**당신의 코드에도 사운드트랙이 있잖아요. 보여주세요.**

유튜브 링크 하나로 GitHub 프로필에 음악 취향 카드를 만들어보세요.

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![Deploy with Vercel](https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel)](https://sound-badge.vercel.app)

</div>

---

GitHub 프로필은 당신에 대해 많은 걸 보여줍니다 — 사용하는 언어, 기여 기록, 커밋 스트릭. 근데 지금 이어폰에서 뭐가 흘러나오는지는 아무도 모르죠.

**SoundBadge**가 그걸 바꿔줍니다. 유튜브 링크를 붙여넣고, 스타일을 고르고, README에 음악 카드를 넣으세요. SVG로 실시간 렌더링됩니다 — 빌드도, 토큰도, 인증도 필요 없어요.

---

## 빠른 시작

**1.** [SoundBadge 빌더](https://sound-badge.vercel.app)에서 유튜브 URL을 붙여넣고, 테마를 고르고, 코드를 복사하세요.

**2.** 또는 아래 코드를 바로 복사하세요:

```md
![My Music](https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=27KI1NUxpFA&theme=stream)
```

**3.** GitHub `README.md`에 붙여넣기.

끝.

---

## 예시

### 템플릿

5가지 템플릿 — 미니멀 배지부터 플레이어 UI까지.

#### Badge

한 줄짜리 인라인 배지. 어디든 들어갑니다.

<a href="https://www.youtube.com/watch?v=27KI1NUxpFA"><img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=27KI1NUxpFA&theme=badge&v=2" alt="Badge 템플릿" /></a>

<details>
<summary>색상 변형</summary>
<br />

| 변형 | 미리보기 |
|------|---------|
| `blue` | <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=27KI1NUxpFA&theme=badge&variant=blue&v=2" alt="badge blue" /> |
| `green` | <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=27KI1NUxpFA&theme=badge&variant=green&v=2" alt="badge green" /> |
| `red` | <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=27KI1NUxpFA&theme=badge&variant=red&v=2" alt="badge red" /> |
| `purple` | <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=27KI1NUxpFA&theme=badge&variant=purple&v=2" alt="badge purple" /> |
| `orange` | <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=27KI1NUxpFA&theme=badge&variant=orange&v=2" alt="badge orange" /> |

</details>

#### Clean

깔끔한 기본 카드. 모든 레이아웃과 멀티트랙을 지원합니다.

<a href="https://www.youtube.com/watch?v=27KI1NUxpFA"><img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=27KI1NUxpFA&theme=clean&v=2" alt="Clean 템플릿" /></a>

#### Stream

스트리밍 플레이어 UI. 이퀄라이저 애니메이션과 프로그레스 바 포함.

<a href="https://www.youtube.com/watch?v=27KI1NUxpFA"><img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=27KI1NUxpFA&theme=stream&v=2" alt="Stream 템플릿" /></a>

<details>
<summary>색상 변형</summary>
<br />

| 변형 | 미리보기 |
|------|---------|
| `green` | <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=27KI1NUxpFA&theme=stream&variant=green&v=2" alt="stream green" /> |
| `purple` | <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=27KI1NUxpFA&theme=stream&variant=purple&v=2" alt="stream purple" /> |
| `blue` | <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=27KI1NUxpFA&theme=stream&variant=blue&v=2" alt="stream blue" /> |
| `pink` | <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=27KI1NUxpFA&theme=stream&variant=pink&v=2" alt="stream pink" /> |
| `red` | <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=27KI1NUxpFA&theme=stream&variant=red&v=2" alt="stream red" /> |

</details>

#### Terminal

개발자를 위한 템플릿. 모노스페이스 폰트, 터미널 크롬, 커서 깜빡임.

<a href="https://www.youtube.com/watch?v=27KI1NUxpFA"><img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=27KI1NUxpFA&theme=terminal&v=2" alt="Terminal 템플릿" /></a>

#### Neon

네온 글로우 + 글래스모피즘 그리드 + 펄싱 보더.

<a href="https://www.youtube.com/watch?v=27KI1NUxpFA"><img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=27KI1NUxpFA&theme=neon&v=2" alt="Neon 템플릿" /></a>

<details>
<summary>색상 변형</summary>
<br />

| 변형 | 미리보기 |
|------|---------|
| `green` | <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=27KI1NUxpFA&theme=neon&variant=green&v=2" alt="neon green" /> |
| `pink` | <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=27KI1NUxpFA&theme=neon&variant=pink&v=2" alt="neon pink" /> |
| `cyan` | <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=27KI1NUxpFA&theme=neon&variant=cyan&v=2" alt="neon cyan" /> |

</details>

#### Receipt

라이브 공연 티켓이나 영수증을 모방한 세로형 멀티트랙 레이아웃.

<a href="https://www.youtube.com/watch?v=27KI1NUxpFA"><img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=27KI1NUxpFA&url=https://www.youtube.com/watch?v=jfKfPfyJRdk&theme=receipt&v=2" alt="Receipt 템플릿" /></a>

<details>
<summary>색상 변형</summary>
<br />

| 변형 | 미리보기 |
|------|---------|
| `receipt` | <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=27KI1NUxpFA&theme=receipt&variant=receipt&v=2" alt="receipt variant" /> |
| `dark_ticket` | <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=27KI1NUxpFA&theme=receipt&variant=dark_ticket&v=2" alt="dark_ticket variant" /> |

</details>

---

### 클래식 테마

썸네일, 제목, 채널 정보가 포함된 8가지 클래식 카드 테마.

| | | |
|:---:|:---:|:---:|
| **Minimal** | **Mono** | **Pastel** |
| <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=27KI1NUxpFA&theme=minimal&v=2" alt="minimal" /> | <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=27KI1NUxpFA&theme=mono&v=2" alt="mono" /> | <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=27KI1NUxpFA&theme=pastel&v=2" alt="pastel" /> |
| **Sunset** | **Midnight** | **Glass** |
| <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=27KI1NUxpFA&theme=sunset&v=2" alt="sunset" /> | <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=27KI1NUxpFA&theme=midnight&v=2" alt="midnight" /> | <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=27KI1NUxpFA&theme=glass&v=2" alt="glass" /> |
| **Retro** | **Neon (Legacy)** | |
| <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=27KI1NUxpFA&theme=retro&v=2" alt="retro" /> | <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=27KI1NUxpFA&theme=neon-legacy&v=2" alt="neon legacy" /> | |

> **참고:** 클래식 neon 테마는 새로운 Neon 템플릿과 구분하기 위해 `neon-legacy`로 변경되었습니다.

---

## 커스터마이징

### 레이아웃

클래식 테마와 Clean 템플릿은 3가지 레이아웃 크기를 지원합니다:

| Compact (320×80) | Regular (420×120) | Wide (600×160) |
|:-:|:-:|:-:|
| <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=27KI1NUxpFA&theme=minimal&layout=compact&v=2" alt="compact" /> | <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=27KI1NUxpFA&theme=minimal&layout=regular&v=2" alt="regular" /> | <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=27KI1NUxpFA&theme=minimal&layout=wide&v=2" alt="wide" /> |

### 태그 & 라벨

클래식 테마에서 태그와 커스텀 라벨로 맥락을 추가할 수 있습니다:

<a href="https://www.youtube.com/watch?v=27KI1NUxpFA"><img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=27KI1NUxpFA&theme=minimal&tags=kpop,chill,vibe&label=%EC%A7%80%EA%B8%88%20%EB%93%A3%EB%8A%94%20%EC%A4%91&v=2" alt="태그와 라벨 예시" /></a>

```
?tags=kpop,chill,vibe&label=지금 듣는 중
```

- **태그**: 콤마로 구분, 최대 3개
- **라벨**: 최대 40자

> 태그와 라벨은 클래식 테마에서만 지원됩니다. Receipt 템플릿은 라벨만 지원합니다.

### 멀티트랙

`stream`, `terminal`, `neon`, `clean`, `receipt` 템플릿은 여러 유튜브 URL을 지원합니다 — `url` 파라미터를 여러 번 전달하세요:

<a href="https://www.youtube.com/watch?v=27KI1NUxpFA"><img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=27KI1NUxpFA&url=https://www.youtube.com/watch?v=jfKfPfyJRdk&theme=stream&variant=green&v=2" alt="멀티트랙 예시" /></a>

```
?url=https://www.youtube.com/watch?v=VIDEO_1&url=https://www.youtube.com/watch?v=VIDEO_2&theme=stream
```

카드당 최대 5개 트랙.

---

## API 레퍼런스

### `GET /api/card.svg`

SVG 카드 이미지를 동적으로 생성합니다.

| 파라미터 | 필수 | 기본값 | 설명 |
|---------|:----:|--------|------|
| `url` | O | — | 유튜브 URL (영상 또는 재생목록). 멀티트랙 시 `&url=...&url=...`으로 반복. |
| `theme` | X | `minimal` | 테마 또는 템플릿 이름 ([예시](#예시) 참고) |
| `layout` | X | `regular` | 카드 크기: `compact`, `regular`, `wide` |
| `tags` | X | — | 콤마로 구분된 태그 (최대 3개) |
| `label` | X | — | 카드 라벨 텍스트 (최대 40자) |
| `variant` | X | — | 지원하는 템플릿의 색상 변형 |

**Base URL:**

```
https://sound-badge.vercel.app/api/card.svg
```

**테마 값:**

| 타입 | 값 |
|------|-----|
| 클래식 | `minimal`, `mono`, `neon-legacy`, `pastel`, `sunset`, `midnight`, `glass`, `retro` |
| 템플릿 | `badge`, `clean`, `stream`, `terminal`, `neon`, `receipt` |

**변형 값:**

| 템플릿 | 변형 |
|--------|------|
| `badge` | `blue`, `green`, `red`, `purple`, `orange` |
| `stream` | `green`, `purple`, `blue`, `pink`, `red` |
| `neon` | `green`, `pink`, `cyan` |
| `receipt` | `receipt`, `dark_ticket` |

---

## README에 넣는 법

### Markdown

```md
![지금 듣는 중](https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=27KI1NUxpFA&theme=stream)
```

### HTML (더 세밀한 제어가 필요할 때)

```html
<a href="https://www.youtube.com/watch?v=27KI1NUxpFA">
  <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=27KI1NUxpFA&amp;theme=stream" alt="지금 듣는 중" />
</a>
```

> `<a>`로 감싸면 카드 클릭 시 유튜브로 이동합니다.

### 다크 / 라이트 모드 대응

GitHub은 테마별 이미지를 지원합니다. 다크/라이트 모드에 따라 다른 카드를 보여주세요:

```html
<a href="https://www.youtube.com/watch?v=27KI1NUxpFA">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=27KI1NUxpFA&amp;theme=mono" />
    <source media="(prefers-color-scheme: light)" srcset="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=27KI1NUxpFA&amp;theme=minimal" />
    <img src="https://sound-badge.vercel.app/api/card.svg?url=https://www.youtube.com/watch?v=27KI1NUxpFA&amp;theme=minimal" alt="지금 듣는 중" />
  </picture>
</a>
```

---

## 빌더 사용하기

URL을 직접 쓰기 귀찮다면 [SoundBadge 빌더](https://sound-badge.vercel.app)를 이용하세요.

유튜브 링크 붙여넣기 → 테마 선택 → 옵션 조정 → 코드 복사. 끝.

---

## 셀프 호스팅

### 요구 사항

- Node.js 18+
- [bun](https://bun.sh)
- [YouTube Data API v3 키](https://console.cloud.google.com/apis/library/youtube.googleapis.com)

### 설치

```bash
# 1. 저장소 클론
git clone https://github.com/gguip1/SoundBadge.git
cd SoundBadge

# 2. 의존성 설치
bun install

# 3. 환경 변수 설정
cp .env.example .env.local
# .env.local에 YouTube API 키 입력

# 4. 개발 서버 실행
bun dev
```

### 환경 변수

| 변수 | 필수 | 설명 |
|------|:----:|------|
| `YOUTUBE_API_KEY` | O | YouTube Data API v3 키 |

### Vercel 배포

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/gguip1/SoundBadge&env=YOUTUBE_API_KEY&envDescription=YouTube%20Data%20API%20v3%20key)

---

## 기술 스택

- **[Next.js 16](https://nextjs.org)** — App Router + Edge Runtime
- **TypeScript** — Strict 모드
- **Tailwind CSS 4** — 빌더 UI 스타일링
- **Vercel Edge Functions** — 저지연 SVG 생성
- **YouTube Data API v3** — 영상 메타데이터

---

## 기여하기

기여는 언제든 환영합니다! 새 테마, 템플릿, 버그 수정 등 무엇이든 좋습니다.

자세한 내용은 [CONTRIBUTING.md](CONTRIBUTING.md)를 참고해주세요.

---

## 라이선스

[Apache License 2.0](LICENSE)

---

<div align="center">

**커밋 기록 뒤에 음악 취향을 숨기지 마세요.**

[빌더 사용해보기](https://sound-badge.vercel.app)

</div>
