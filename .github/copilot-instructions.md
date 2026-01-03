# Shot Sequence Studio - Copilot Instructions

## 프로젝트 개요
Shot Sequence Studio는 스토리를 AI 영상 생성 플랫폼(Runway, Kling, Sora, Pika)용 샷 시퀀스로 변환하는 단일 페이지 웹 애플리케이션입니다.

## 아키텍처
- **단일 파일 구조**: 전체 애플리케이션이 `index.html` 하나에 포함 (HTML, CSS, React JSX)
- **React 18**: CDN에서 로드되며, Babel standalone으로 JSX 트랜스파일
- **상태 관리**: React `useState` 훅으로 로컬 상태 관리
- **인증**: `localStorage`에 `sss_auth` 키로 간단한 비밀번호 인증

## 3단계 워크플로우
1. **스토리 입력**: 사용자가 영상 스토리 텍스트 입력
2. **JSON 변환**: `CONVERSION_PROMPT` 템플릿으로 Claude에 전달 → JSON 시퀀스 생성
3. **프롬프트 생성**: 각 샷별로 AI 플랫폼에 맞는 프롬프트 출력

## 핵심 데이터 구조

### 샷 시퀀스 JSON 스키마
```javascript
{
  project: { title, total_duration, aspect_ratio },
  sequence: [{
    shot, title, section, duration, emotion,
    scene: { location, time, weather, environment },
    camera: { angle, shot_type, movement, lens, focus },
    subject: { description, motion, costume, expression },
    lighting: { technique, quality, direction, color_temperature, mood },
    color: { palette, grade, contrast },
    audio: { music, sfx, ambient },  // 참고용 - 복사 시 제외됨
    vfx: { effects, speed }
  }]
}
```

### 주요 상수 객체
- `STYLE_HINTS`: 14개 비주얼 스타일 (Pixar, Ghibli, Cyberpunk 등)의 키워드와 분위기
- `GUIDE_OPTIONS`: 카메라, 조명, VFX 옵션과 한국어 설명
- `generateJSONPrompt`: AI 플랫폼별 프롬프트 생성기 (audio_reference 포함)
- `generateCleanPrompt`: 복사용 프롬프트 생성기 (audio_reference 제외)

## 코드 패턴

### 드롭다운 옵션 추가
`GUIDE_OPTIONS` 객체에 `{ value: "영문명", desc: "한국어 설명" }` 형태로 추가:
```javascript
{ value: "New Lighting", desc: "새로운 조명 기법 설명" }
```

### 새 AI 플랫폼 지원 추가
1. `generateJSONPrompt`에 플랫폼별 함수 추가
2. `generateCleanPrompt`에 동일한 구조로 함수 추가 (audio_reference 제외)
3. AI 버튼 배열에 플랫폼명 추가: `['runway', 'kling', 'sora', 'pika', 'new_ai']`

### 스타일 힌트 추가
`STYLE_HINTS` 객체에 영문 스타일명을 키로 추가:
```javascript
"New Style Name": {
  keywords: "영문 키워드, comma separated",
  atmosphere: "분위기 설명"
}
```

## CSS 변수 시스템
모든 색상은 `:root`의 CSS 변수 사용:
- `--bg-*`: 배경색 (primary, secondary, tertiary, card)
- `--text-*`: 텍스트 (primary, secondary, muted)
- `--accent-*`: 강조색 (violet, blue, emerald, amber, rose)
- `--radius-*`: 모서리 반경 (sm: 6px, md: 10px, lg: 14px)

## 컴포넌트 구조
- `SelectWithDesc`: 툴팁이 포함된 커스텀 드롭다운 (외부 클릭 시 닫힘)
- `App`: 메인 컴포넌트 (로그인, 3단계 뷰, 샷 편집, 프롬프트 생성)

## 개발 시 주의사항
- 모든 코드가 단일 HTML 파일에 있으므로 수정 시 전체 구조 파악 필요
- 한국어 UI 유지 (desc 필드는 항상 한국어)
- `audio_reference`는 화면에 표시되지만 복사 시 제외됨 (사운드 별도 작업 안내용)
- 스타일 변경 시 `STYLE_HINTS`와 `GUIDE_OPTIONS.styles` 모두 업데이트 필요
