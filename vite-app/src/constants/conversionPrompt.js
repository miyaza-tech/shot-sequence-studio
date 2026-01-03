// 변환 프롬프트 템플릿
export const CONVERSION_PROMPT = (story) => `다음 스토리를 JSON 샷 시퀀스로 변환해주세요.

## 출력 형식:
\`\`\`json
{
  "project": {
    "title": "프로젝트 제목",
    "total_duration": "30s",
    "aspect_ratio": "2.39:1"
  },
  "sequence": [
    {
      "shot": "1",
      "title": "샷 제목",
      "section": "시간대: 섹션명",
      "duration": "1s",
      "emotion": "감정/분위기",
      "scene": { "location": "장소", "time": "시간", "weather": "날씨", "environment": "환경" },
      "camera": { "angle": "Eye Level Shot", "shot_type": "Wide Shot / WS", "movement": "Dolly In", "lens": "50mm", "focus": {"type": "Shallow Depth of Field / Bokeh", "target": "피사체"} },
      "subject": { "description": "피사체 설명", "motion": {"action": "동작"}, "costume": "의상", "expression": "표정" },
      "lighting": { "technique": "Rembrandt Lighting", "quality": "Soft", "direction": "Side", "color_temperature": "Warm", "mood": "분위기" },
      "color": { "palette": ["색상1", "색상2"], "grade": "색보정", "contrast": "High/Medium/Low" },
      "audio": { "music": "음악", "sfx": ["효과음"], "ambient": "환경음" },
      "vfx": { "effects": ["효과"], "speed": "Normal/Slow Motion (50%)" }
    }
  ]
}
\`\`\`

## 스토리:
${story}

---
JSON 코드만 출력하세요.`;
