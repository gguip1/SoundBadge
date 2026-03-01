# Changelog

## v0.2.0 (2026-03-01)

### Bug Fixes

- **CJK 제목 마키 스크롤**: 모든 템플릿과 클래식 테마에서 글자 수 기준이던 스크롤 판단을 픽셀 폭(`estimateTextWidth`) 기준으로 변경. 한글 등 CJK 제목이 넘치는데 스크롤되지 않던 문제 수정 (`1eea1a7`)
- **Receipt 긴 제목 텍스트 겹침**: `truncateToFit`을 적용하여 트랙 제목/채널명이 영역 밖으로 넘치지 않도록 수정 — closes #4 (`772c67d`)
- **Receipt 라벨 overflow**: 긴 라벨에 단계적 폰트 축소(20→16→13) 및 truncate 적용 (`b5dc01d`)
- **클래식 테마 한글 태그 overflow**: `estimateTextWidth`로 CJK 문자 폭을 반영한 태그 너비 계산 (`8e1a223`)
- **Terminal 멀티트랙 하단 여백 과다**: 고정 높이에서 콘텐츠 기반 동적 높이 계산으로 변경 (`19382b4`)
- **빌더 embed 링크 대상**: HTML embed 코드의 `<a>` 링크가 SVG API 대신 YouTube URL을 가리키도록 수정 — closes #1 (`433cb99`)

### Features

- **CJK 텍스트 너비 추정 유틸**: `estimateTextWidth`, `truncateToFit` 함수 추가. CJK 문자를 1.7배 폭으로 계산 (`1d25ab6`)
- **테마별 태그/라벨 capabilities**: `supportsTags`, `supportsLabel` 메타 필드 추가. 빌더 UI에서 미지원 옵션 비활성화 (`5867375`)

### Docs

- README 메인 언어를 한국어로 변경 (`README.md` ↔ `README-en.md`)
- 영어 README 데모 음악 교체 — closes #3 (`d3b5048`, `6205129`)
- README 상단 Receipt 데모 섹션 제거 (`a380c26`)
