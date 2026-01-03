import { STYLE_HINTS } from './styleHints';

// JSON 프롬프트 생성 (스타일 힌트 포함, audio_reference 포함)
export const generateJSONPrompt = {
  runway: (shot, style) => {
    const hint = STYLE_HINTS[style] || {};
    return {
      shot_number: shot.shot || "",
      shot_title: shot.title || "",
      style: hint.keywords || style,
      atmosphere: hint.atmosphere || "",
      scene: shot.scene?.location || "",
      subject: shot.subject?.description || "",
      action: shot.subject?.motion?.action || "",
      camera: {
        shot_type: shot.camera?.shot_type || "",
        angle: shot.camera?.angle || "",
        movement: shot.camera?.movement || "Static",
        lens: shot.camera?.lens || ""
      },
      lighting: {
        technique: shot.lighting?.technique || "",
        mood: shot.lighting?.mood || ""
      },
      color_palette: shot.color?.palette || [],
      emotion: shot.emotion || "",
      duration: shot.duration || "4s",
      vfx_speed: shot.vfx?.speed || "Normal",
      audio_reference: {
        music: shot.audio?.music || "",
        sfx: shot.audio?.sfx || [],
        ambient: shot.audio?.ambient || "",
        _note: "참고용 - 별도 사운드 작업 필요"
      }
    };
  },
  kling: (shot, style) => {
    const hint = STYLE_HINTS[style] || {};
    return {
      shot_number: shot.shot || "",
      shot_title: shot.title || "",
      style: hint.keywords || style,
      atmosphere: hint.atmosphere || "",
      character: shot.subject?.description || "",
      action: shot.subject?.motion?.action || "",
      expression: shot.subject?.expression || "",
      scene: shot.scene?.location || "",
      camera: shot.camera?.shot_type || "",
      lighting: shot.lighting?.technique || "",
      audio_reference: {
        music: shot.audio?.music || "",
        sfx: shot.audio?.sfx || [],
        ambient: shot.audio?.ambient || "",
        _note: "참고용 - 별도 사운드 작업 필요"
      }
    };
  },
  sora: (shot, style) => {
    const hint = STYLE_HINTS[style] || {};
    return {
      shot_number: shot.shot || "",
      shot_title: shot.title || "",
      style: hint.keywords || style,
      atmosphere: hint.atmosphere || "",
      scene: { 
        location: shot.scene?.location, 
        time: shot.scene?.time,
        environment: shot.scene?.environment
      },
      subject: { 
        description: shot.subject?.description, 
        action: shot.subject?.motion?.action,
        expression: shot.subject?.expression
      },
      camera: { 
        shot_type: shot.camera?.shot_type, 
        angle: shot.camera?.angle, 
        movement: shot.camera?.movement,
        lens: shot.camera?.lens
      },
      lighting: { 
        technique: shot.lighting?.technique, 
        quality: shot.lighting?.quality,
        mood: shot.lighting?.mood 
      },
      color: shot.color?.palette || [],
      emotion: shot.emotion,
      duration: shot.duration || "5s",
      audio_reference: {
        music: shot.audio?.music || "",
        sfx: shot.audio?.sfx || [],
        ambient: shot.audio?.ambient || "",
        _note: "참고용 - 별도 사운드 작업 필요"
      }
    };
  },
  pika: (shot, style) => {
    const hint = STYLE_HINTS[style] || {};
    return {
      shot_number: shot.shot || "",
      shot_title: shot.title || "",
      style: hint.keywords || style,
      subject: shot.subject?.description || "",
      action: shot.subject?.motion?.action || "",
      scene: shot.scene?.location || "",
      emotion: shot.emotion || "",
      camera_movement: shot.camera?.movement || "Static",
      audio_reference: {
        music: shot.audio?.music || "",
        sfx: shot.audio?.sfx || [],
        _note: "참고용 - 별도 사운드 작업 필요"
      }
    };
  }
};

// 복사용 프롬프트 생성 (audio_reference 제외)
export const generateCleanPrompt = {
  runway: (shot, style) => {
    const hint = STYLE_HINTS[style] || {};
    return {
      shot_number: shot.shot || "",
      shot_title: shot.title || "",
      style: hint.keywords || style,
      atmosphere: hint.atmosphere || "",
      scene: shot.scene?.location || "",
      subject: shot.subject?.description || "",
      action: shot.subject?.motion?.action || "",
      camera: {
        shot_type: shot.camera?.shot_type || "",
        angle: shot.camera?.angle || "",
        movement: shot.camera?.movement || "Static",
        lens: shot.camera?.lens || ""
      },
      lighting: {
        technique: shot.lighting?.technique || "",
        mood: shot.lighting?.mood || ""
      },
      color_palette: shot.color?.palette || [],
      emotion: shot.emotion || "",
      duration: shot.duration || "4s",
      vfx_speed: shot.vfx?.speed || "Normal"
    };
  },
  kling: (shot, style) => {
    const hint = STYLE_HINTS[style] || {};
    return {
      shot_number: shot.shot || "",
      shot_title: shot.title || "",
      style: hint.keywords || style,
      atmosphere: hint.atmosphere || "",
      character: shot.subject?.description || "",
      action: shot.subject?.motion?.action || "",
      expression: shot.subject?.expression || "",
      scene: shot.scene?.location || "",
      camera: shot.camera?.shot_type || "",
      lighting: shot.lighting?.technique || ""
    };
  },
  sora: (shot, style) => {
    const hint = STYLE_HINTS[style] || {};
    return {
      shot_number: shot.shot || "",
      shot_title: shot.title || "",
      style: hint.keywords || style,
      atmosphere: hint.atmosphere || "",
      scene: { 
        location: shot.scene?.location, 
        time: shot.scene?.time,
        environment: shot.scene?.environment
      },
      subject: { 
        description: shot.subject?.description, 
        action: shot.subject?.motion?.action,
        expression: shot.subject?.expression
      },
      camera: { 
        shot_type: shot.camera?.shot_type, 
        angle: shot.camera?.angle, 
        movement: shot.camera?.movement,
        lens: shot.camera?.lens
      },
      lighting: { 
        technique: shot.lighting?.technique, 
        quality: shot.lighting?.quality,
        mood: shot.lighting?.mood 
      },
      color: shot.color?.palette || [],
      emotion: shot.emotion,
      duration: shot.duration || "5s"
    };
  },
  pika: (shot, style) => {
    const hint = STYLE_HINTS[style] || {};
    return {
      shot_number: shot.shot || "",
      shot_title: shot.title || "",
      style: hint.keywords || style,
      subject: shot.subject?.description || "",
      action: shot.subject?.motion?.action || "",
      scene: shot.scene?.location || "",
      emotion: shot.emotion || "",
      camera_movement: shot.camera?.movement || "Static"
    };
  }
};
