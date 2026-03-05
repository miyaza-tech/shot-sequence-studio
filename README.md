# 🎬 Shot Sequence Studio

스토리를 AI 영상 생성 플랫폼(Runway, Kling, Sora, Pika)용 샷 시퀀스로 변환하는 웹 애플리케이션입니다.

## 주요 기능

- **스토리 → 샷 시퀀스 변환**: 영상 스토리를 Claude AI로 구조화된 JSON 시퀀스로 변환
- **AI 플랫폼별 프롬프트 생성**: Runway, Kling, Sora, Pika 각 플랫폼에 최적화된 프롬프트 자동 생성
- **이미지 프롬프트 지원**: JSON 및 자연어 형식의 이미지 생성 프롬프트
- **샷 세부 편집**: 카메라(앵글/샷타입/무빙/렌즈/초점), 조명(기법/품질/방향/색온도), VFX(속도/효과) 등 드롭다운으로 편집
- **14개 비주얼 스타일**: Pixar 3D, Ghibli, Cyberpunk, Film Noir 등 스타일별 키워드 자동 적용
- **프로젝트 관리**: 저장/불러오기/삭제/이름변경 + JSON Import/Export
- **다중 샷 선택**: 체크박스로 여러 샷을 선택하여 일괄 프롬프트 복사
- **다크/라이트 테마**: 작업 환경에 맞는 테마 전환

## 워크플로우

```
Step 1: 스토리 입력 → Step 2: Claude로 JSON 변환 → Step 3: AI 프롬프트 생성 & 복사
```

1. **스토리 입력** — 영상으로 만들 스토리 텍스트 작성
2. **JSON 변환** — 생성된 프롬프트를 Claude에 전달하여 샷 시퀀스 JSON 생성
3. **프롬프트 생성** — 3컬럼 레이아웃에서 샷 선택 → 세부 설정 편집 → AI 플랫폼별 프롬프트 복사

## 시작하기

```bash
cd vite-app
npm install
npm run dev
```

## 기술 스택

- **React 18** — 컴포넌트 기반 UI
- **Vite** — 빌드 도구
- **CSS Variables** — 라이트/다크 테마 시스템
- **localStorage** — 프로젝트 데이터 영속화

## 프로젝트 구조

```
vite-app/src/
├── App.jsx                    # 메인 앱 (3단계 흐름, 상태 관리)
├── components/
│   ├── Header.jsx             # 헤더 + 스텝 표시 + 테마 토글
│   ├── StoryInput.jsx         # Step 1: 스토리 입력
│   ├── JsonConverter.jsx      # Step 2: Claude 변환
│   ├── PromptGenerator.jsx    # Step 3: 3컬럼 레이아웃
│   ├── ShotList.jsx           # 샷 목록 + 다중 선택
│   ├── ShotDetail.jsx         # 카메라/조명/VFX 편집
│   ├── AIPromptPanel.jsx      # AI 프롬프트 생성/복사
│   ├── SelectWithDesc.jsx     # 한국어 설명 포함 드롭다운
│   ├── ProjectManager.jsx     # 프로젝트 CRUD + Import/Export
│   └── Toast.jsx              # 알림
├── constants/
│   ├── styleHints.js          # 14개 비주얼 스타일 정의
│   ├── guideOptions.js        # 카메라/조명/VFX 옵션
│   ├── conversionPrompt.js    # Claude용 변환 프롬프트 템플릿
│   └── promptGenerators.js    # AI 플랫폼별 프롬프트 생성기
├── styles/
│   ├── index.css              # 글로벌 스타일 + CSS 변수
│   └── SelectWithDesc.css     # 드롭다운 스타일
└── utils/
    ├── storage.js             # localStorage 프로젝트 관리
    └── fileIO.js              # JSON Import/Export
```

## 빌드

```bash
cd vite-app
npm run build      # dist/ 폴더에 빌드 결과 생성
npm run preview    # 빌드 결과 미리보기
```

## 라이선스

MIT
