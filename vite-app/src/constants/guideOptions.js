// 전체 가이드 옵션 (설명 포함)
export const GUIDE_OPTIONS = {
  styles: [
    { value: "Pixar 3D Animation", desc: "따뜻하고 감성적인 3D 애니메이션, 큰 눈과 표현력 있는 캐릭터" },
    { value: "Studio Ghibli / Anime", desc: "일본 애니메이션 스타일, 섬세한 배경과 자연 묘사" },
    { value: "2D Cartoon", desc: "디즈니/카툰 스타일의 2D 애니메이션" },
    { value: "Game Cinematic", desc: "언리얼/유니티 엔진 느낌의 게임 시네마틱" },
    { value: "Cinematic Live Action", desc: "영화적 실사 촬영, 35mm 필름 느낌" },
    { value: "Documentary Realism", desc: "다큐멘터리 스타일, 자연스럽고 현실적인" },
    { value: "Cyberpunk / Sci-Fi", desc: "네온, 미래 도시, SF 분위기" },
    { value: "Film Noir / Vintage", desc: "흑백 또는 레트로 필름 느낌, 강한 명암" },
    { value: "Commercial / Product", desc: "광고, 제품 촬영 스타일, 깔끔하고 세련된" },
    { value: "Music Video", desc: "뮤직비디오 스타일, 스타일리시하고 역동적" },
    { value: "Horror / Dark", desc: "공포, 어둡고 불안한 분위기" },
    { value: "Fantasy / Ethereal", desc: "판타지, 신비롭고 몽환적인 분위기" },
    { value: "Concept Art / Illustration", desc: "컨셉 아트 스타일, 그림 같은 느낌" },
    { value: "Stop Motion / Claymation", desc: "스톱모션, 클레이 애니메이션 느낌" }
  ],
  camera: {
    angle: [
      { value: "Eye Level Shot", desc: "눈높이에서 촬영. 가장 자연스럽고 친근한 시점" },
      { value: "High Angle", desc: "위에서 아래로 내려다보는 앵글. 대상을 작거나 약하게 표현" },
      { value: "Low Angle", desc: "아래에서 위로 올려다보는 앵글. 대상을 크고 위엄있게 표현" },
      { value: "Bird's Eye View / Overhead", desc: "새가 보는 시점. 90도 직각으로 위에서 촬영" },
      { value: "Worm's Eye View", desc: "벌레 시점. 땅바닥에서 올려다보는 극단적 로우 앵글" },
      { value: "Over-the-Shoulder / OTS", desc: "어깨 너머 촬영. 대화 장면에서 자주 사용" },
      { value: "Dutch Angle / Canted Angle", desc: "카메라를 기울여 촬영. 불안감, 긴장감 표현" },
      { value: "Three-Quarter View", desc: "45도 각도의 3/4 측면 샷. 입체감 강조" },
      { value: "Side View", desc: "완전 측면 촬영. 프로필 강조" },
      { value: "Rear View", desc: "뒷모습 촬영. 미스터리, 기대감 연출" },
      { value: "Top-Down Aerial View", desc: "드론 등 높은 곳에서 촬영. 전체 상황 파악" },
      { value: "Unique Character Angle", desc: "캐릭터만의 독특한 시점 표현" },
      { value: "Mirror Reflection Perspective", desc: "거울에 비친 모습 촬영. 이중성 표현" },
      { value: "First-Person Perspective", desc: "1인칭 시점. 몰입감 극대화" },
      { value: "Invisible Observer Perspective", desc: "보이지 않는 관찰자 시점. 다큐멘터리 느낌" }
    ],
    shot_type: [
      { value: "Wide Shot / WS", desc: "전체 환경과 인물을 함께 담는 샷" },
      { value: "Medium Shot / MS", desc: "허리 위 상반신. 표정과 제스처 균형" },
      { value: "Close-Up / CU", desc: "얼굴이나 물체를 가득 채움. 감정 전달" },
      { value: "Extreme Close-Up / ECU", desc: "눈, 입술 등 극도로 클로즈업. 강렬한 감정" },
      { value: "Full Shot / FS", desc: "전신이 다 보이는 샷" },
      { value: "Two-Shot", desc: "두 사람이 함께 나오는 샷" },
      { value: "Establishing Shot / ES", desc: "장소와 상황을 설명하는 도입 샷" },
      { value: "Detail Shot", desc: "특정 물체나 부분을 강조하는 샷" },
      { value: "Profile Shot", desc: "옆모습 위주의 샷" },
      { value: "Silhouette Shot", desc: "역광으로 실루엣만 보이는 샷" },
      { value: "Candid Shot", desc: "자연스러운 순간 포착. 연출되지 않은 느낌" },
      { value: "Group Interaction", desc: "여러 인물의 상호작용 포착" },
      { value: "Full Body Shot", desc: "전신 샷. 의상과 자세 강조" },
      { value: "Multiple Character Focus", desc: "여러 캐릭터에 동시 초점" },
      { value: "Diagonal Shot", desc: "대각선 구도. 역동성 강조" }
    ],
    movement: [
      { value: "Static", desc: "고정 촬영. 안정감" },
      { value: "Dolly In", desc: "피사체를 향해 전진. 긴장감, 집중" },
      { value: "Dolly In (slow)", desc: "천천히 전진. 서서히 고조되는 감정" },
      { value: "Dolly In (reverse)", desc: "후진. 상황에서 빠져나오는 느낌" },
      { value: "Tracking Shot", desc: "피사체를 따라 이동. 동행감" },
      { value: "Arc Shot", desc: "피사체 주위를 원형으로 회전. 360도 매트릭스 효과" },
      { value: "Panning / Pan", desc: "좌우로 회전. 공간 훑기" },
      { value: "Tilt", desc: "위아래로 회전. 대상의 높이 강조" },
      { value: "Crane Shot", desc: "크레인으로 위아래 이동. 웅장함" },
      { value: "Handheld / Shaky Cam", desc: "손으로 들고 촬영. 긴박감, 현장감" },
      { value: "Steadicam", desc: "안정화 장비. 부드러운 이동" },
      { value: "Dolly Zoom / Vertigo Effect", desc: "줌과 이동 반대로. 현기증 효과" },
      { value: "Cinematic Zoom-In", desc: "영화적 줌인. 감정 고조" },
      { value: "Crash Zoom", desc: "빠른 줌인. 충격, 놀람" },
      { value: "Long Take / Oner", desc: "컷 없이 긴 촬영. 몰입감" },
      { value: "Low Angle Tracking", desc: "낮은 앵글로 따라가기. 속도감" },
      { value: "Snorricam / Chest Rig", desc: "배우 몸에 장착. 공황, 취함 표현" }
    ],
    focus: [
      { value: "Shallow Depth of Field / Bokeh", desc: "얕은 심도. 배경 흐림으로 피사체 강조" },
      { value: "Deep Focus", desc: "깊은 심도. 전경부터 배경까지 선명" },
      { value: "Rack Focus", desc: "초점 전환. A에서 B로 시선 유도" },
      { value: "Soft Focus", desc: "부드러운 초점. 몽환적, 로맨틱" },
      { value: "Split Diopter", desc: "분할 초점. 전경과 배경 동시 선명" }
    ],
    lens: [
      { value: "Wide Angle Lens", desc: "광각 렌즈(24mm 이하). 넓은 공간감" },
      { value: "Standard Lens (35-50mm)", desc: "표준 렌즈. 눈에 가장 자연스러움" },
      { value: "Portrait Lens (85mm)", desc: "인물용 렌즈. 적절한 압축감" },
      { value: "Telephoto Lens", desc: "망원 렌즈. 압축 효과, 원거리 촬영" },
      { value: "Macro Lens", desc: "접사 렌즈. 작은 것을 크게 확대" },
      { value: "Anamorphic Lens", desc: "아나모픽 렌즈. 시네마틱 플레어, 넓은 화각" },
      { value: "Fisheye Lens", desc: "어안 렌즈. 극단적 왜곡, 독특한 시점" },
      { value: "Tilt-Shift", desc: "틸트시프트. 미니어처 효과, 선택적 초점" }
    ]
  },
  lighting: {
    technique: [
      { value: "Rembrandt Lighting", desc: "한쪽 뺨에 삼각형 빛. 클래식한 인물 조명" },
      { value: "Soft Lighting", desc: "부드럽고 그림자 적은 조명. 편안함" },
      { value: "Hard Lighting", desc: "강한 명암 대비. 드라마틱" },
      { value: "Backlighting", desc: "역광. 실루엣, 신비로운 느낌" },
      { value: "Rim Lighting", desc: "가장자리 빛. 피사체 분리, 신성함" },
      { value: "Silhouette Lighting", desc: "완전 역광. 형태만 보이는 실루엣" },
      { value: "Practical Lighting", desc: "화면 내 실제 광원(램프, 네온 등) 활용" },
      { value: "Candlelight", desc: "촛불 조명. 따뜻하고 낭만적" },
      { value: "Golden Hour", desc: "해질녘 황금빛. 따뜻하고 감성적" },
      { value: "Blue Hour", desc: "일출/일몰 전후 푸른빛 시간대" },
      { value: "Volumetric Lighting / God Rays", desc: "빛줄기가 보이는 신비로운 조명" },
      { value: "Low Key Lighting", desc: "어두운 톤 위주. 미스터리, 누아르" },
      { value: "High Key Lighting", desc: "밝고 그림자 적은 톤. 밝고 경쾌" },
      { value: "Split Lighting", desc: "얼굴 반반 조명. 이중성 표현" },
      { value: "Butterfly Lighting", desc: "위에서 내리쬐는 조명. 코 아래 나비 그림자" },
      { value: "Beautiful Lighting", desc: "피부를 아름답게 보이는 조명" },
      { value: "Chiaroscuro / Noir Lighting", desc: "극단적 명암 대비. 르네상스/누아르" },
      { value: "Ambient Lighting", desc: "자연스러운 주변광. 환경 조명" },
      { value: "Accent Lighting", desc: "특정 부분만 강조하는 조명" },
      { value: "Fill Lighting", desc: "그림자를 채우는 보조 조명" },
      { value: "Key Lighting", desc: "주 광원. 가장 밝은 조명" },
      { value: "Neon Light", desc: "네온 조명. 사이버펑크, 도시적" },
      { value: "Moonlight", desc: "달빛 느낌. 차갑고 신비로운" },
      { value: "Dappled Light", desc: "나뭇잎 사이로 비치는 얼룩진 빛" },
      { value: "Window Light", desc: "창문으로 들어오는 자연광" },
      { value: "Cinematic Lighting", desc: "영화적인 무드의 조명 전반" },
      { value: "Moody Lighting", desc: "분위기 있는 조명. 감정 강조" },
      { value: "Spotlight", desc: "스포트라이트. 한 점에 집중" },
      { value: "Strobe Lighting", desc: "스트로브 조명. 순간 포착" },
      { value: "Diffused Light", desc: "확산광. 부드럽고 그림자 적음" },
      { value: "Reflected Light", desc: "반사된 빛. 간접적이고 부드러움" },
      { value: "Crepuscular Rays", desc: "구름 사이로 비치는 빛줄기" },
      { value: "Dawn Lighting", desc: "새벽 조명. 차갑고 신선한" },
      { value: "Dusk Lighting", desc: "황혼 조명. 따뜻하고 노스탤직" },
      { value: "Sunset Lighting", desc: "일몰 조명. 붉고 드라마틱" },
      { value: "Overcast Light", desc: "흐린 날 조명. 부드럽고 균일" },
      { value: "Twilight Light", desc: "박명 조명. 신비롭고 푸른" },
      { value: "Ethereal Lighting", desc: "초자연적이고 천상의 빛" },
      { value: "Colored Lighting", desc: "색상 있는 조명. 분위기 연출" },
      { value: "Street Light", desc: "가로등 조명. 도시 야경" },
      { value: "Pattern Light", desc: "패턴이 있는 빛. 블라인드 등" },
      { value: "Lens Flare", desc: "렌즈 플레어. 빛 번짐 효과" }
    ],
    quality: [
      { value: "Soft", desc: "부드럽고 그림자가 흐릿한" },
      { value: "Hard", desc: "날카롭고 그림자가 선명한" },
      { value: "Diffused", desc: "확산되어 균일한" },
      { value: "Dramatic", desc: "극적인 명암 대비" },
      { value: "Natural", desc: "자연광처럼 자연스러운" },
      { value: "Stylized", desc: "스타일화된, 연출된" }
    ],
    direction: [
      { value: "Front", desc: "정면에서 비추는 빛" },
      { value: "Side", desc: "측면에서 비추는 빛. 입체감" },
      { value: "Back", desc: "뒤에서 비추는 역광" },
      { value: "Top", desc: "위에서 비추는 빛" },
      { value: "Bottom", desc: "아래에서 비추는 빛. 공포 연출" },
      { value: "45-degree", desc: "45도 각도. 가장 일반적" },
      { value: "Multi-directional", desc: "여러 방향에서 동시에" }
    ],
    color_temperature: [
      { value: "Warm (2700-3200K)", desc: "따뜻한 주황/노란빛. 촛불, 일몰" },
      { value: "Neutral (5000-5600K)", desc: "중립적인 흰색. 주간 자연광" },
      { value: "Cool (6500K+)", desc: "차가운 푸른빛. 그늘, 흐린 날" },
      { value: "Mixed", desc: "여러 색온도 혼합. 복잡한 분위기" },
      { value: "Golden Hour (3500K)", desc: "황금빛 따뜻한 톤" },
      { value: "Blue Hour (9000K+)", desc: "푸른 시간대의 차가운 톤" },
      { value: "Tungsten (3200K)", desc: "텅스텐 조명. 실내 느낌" },
      { value: "Daylight (5600K)", desc: "주간 자연광과 동일" }
    ]
  },
  vfx: {
    speed: [
      { value: "Normal", desc: "일반 속도" },
      { value: "Slow Motion (75%)", desc: "약간 느린. 우아함 강조" },
      { value: "Slow Motion (50%)", desc: "절반 속도. 드라마틱 순간" },
      { value: "Slow Motion (25%)", desc: "극 슬로우. 결정적 순간 강조" },
      { value: "Time-lapse", desc: "타임랩스. 시간 압축" },
      { value: "Freeze Frame", desc: "정지 화면. 순간 포착" },
      { value: "Speed Ramp", desc: "속도 변화. 느림→빠름 전환" }
    ],
    effects: [
      { value: "Lens Flare", desc: "렌즈 플레어. 빛 번짐" },
      { value: "Bloom/Glow", desc: "빛 번짐. 몽환적" },
      { value: "Motion Blur", desc: "움직임 흐림. 속도감" },
      { value: "Depth of Field", desc: "심도 효과. 초점 외 흐림" },
      { value: "Film Grain", desc: "필름 입자. 빈티지 느낌" },
      { value: "Color Grading", desc: "색보정. 분위기 연출" },
      { value: "Particles", desc: "파티클 효과. 눈, 먼지 등" },
      { value: "Volumetric Fog", desc: "체적 안개. 신비로운" },
      { value: "Light Rays", desc: "빛줄기 효과" },
      { value: "Chromatic Aberration", desc: "색수차. 렌즈 왜곡 느낌" }
    ]
  },
  color: {
    contrast: [
      { value: "High", desc: "높은 대비. 극적이고 선명" },
      { value: "Medium", desc: "중간 대비. 균형잡힌" },
      { value: "Low", desc: "낮은 대비. 부드럽고 파스텔" }
    ]
  }
};
