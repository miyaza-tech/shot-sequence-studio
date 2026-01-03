# Shot Sequence Studio (Vite 버전)

## 설치 및 실행

```bash
cd vite-app
npm install
npm run dev
```

## 빌드

```bash
npm run build
```

빌드 결과물은 `dist/` 폴더에 생성됩니다.

## 프로젝트 구조

```
vite-app/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx              # 엔트리 포인트
    ├── App.jsx               # 메인 앱 컴포넌트
    ├── components/           # UI 컴포넌트
    │   ├── index.js          # 컴포넌트 export
    │   ├── Login.jsx
    │   ├── Header.jsx
    │   ├── StoryInput.jsx
    │   ├── JsonConverter.jsx
    │   ├── ShotList.jsx
    │   ├── ShotDetail.jsx
    │   ├── AIPromptPanel.jsx
    │   ├── PromptGenerator.jsx
    │   ├── SelectWithDesc.jsx
    │   ├── Footer.jsx
    │   └── Toast.jsx
    ├── constants/            # 상수 및 설정
    │   ├── index.js
    │   ├── styleHints.js
    │   ├── guideOptions.js
    │   ├── conversionPrompt.js
    │   └── promptGenerators.js
    └── styles/               # CSS 파일
        ├── index.css
        ├── SelectWithDesc.css
        └── Login.css
```

## 기존 버전과의 차이점

- 단일 HTML → 모듈화된 구조
- CDN React → npm 패키지
- Babel standalone → Vite 빌드
- 빠른 HMR(Hot Module Replacement) 지원
