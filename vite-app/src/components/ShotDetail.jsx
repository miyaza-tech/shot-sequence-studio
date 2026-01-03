import SelectWithDesc from './SelectWithDesc';
import { GUIDE_OPTIONS } from '../constants';

function ShotDetail({ shot, onUpdateField }) {
  if (!shot) {
    return (
      <div className="split-panel">
        <div className="split-panel-header">상세 정보</div>
        <div className="split-panel-content">
          <div className="empty-state">
            <div className="empty-icon"></div>
            <div className="empty-text">샷을 선택하세요</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="split-panel">
      <div className="split-panel-header">상세 정보</div>
      <div className="split-panel-content">
        <div className="detail-panel">
          <h2 style={{marginBottom: '16px', fontSize: '16px'}}>Shot {shot.shot}: {shot.title}</h2>

          <div className="detail-section">
            <div className="detail-section-title">카메라</div>
            <div className="detail-grid">
              <SelectWithDesc 
                label="앵글" 
                options={GUIDE_OPTIONS.camera.angle}
                value={shot.camera?.angle} 
                onChange={(v) => onUpdateField('camera', 'angle', v)} 
              />
              <SelectWithDesc 
                label="샷 타입" 
                options={GUIDE_OPTIONS.camera.shot_type}
                value={shot.camera?.shot_type} 
                onChange={(v) => onUpdateField('camera', 'shot_type', v)} 
              />
              <SelectWithDesc 
                label="무빙" 
                options={GUIDE_OPTIONS.camera.movement}
                value={shot.camera?.movement} 
                onChange={(v) => onUpdateField('camera', 'movement', v)} 
              />
              <SelectWithDesc 
                label="초점" 
                options={GUIDE_OPTIONS.camera.focus}
                value={shot.camera?.focus?.type} 
                onChange={(v) => onUpdateField('camera_focus', 'type', v)} 
              />
              <SelectWithDesc 
                label="렌즈" 
                options={GUIDE_OPTIONS.camera.lens}
                value={shot.camera?.lens} 
                onChange={(v) => onUpdateField('camera', 'lens', v)} 
              />
            </div>
          </div>

          <div className="detail-section">
            <div className="detail-section-title">조명</div>
            <div className="detail-grid">
              <SelectWithDesc 
                label="기법" 
                options={GUIDE_OPTIONS.lighting.technique}
                value={shot.lighting?.technique} 
                onChange={(v) => onUpdateField('lighting', 'technique', v)} 
              />
              <SelectWithDesc 
                label="품질" 
                options={GUIDE_OPTIONS.lighting.quality}
                value={shot.lighting?.quality} 
                onChange={(v) => onUpdateField('lighting', 'quality', v)} 
              />
              <SelectWithDesc 
                label="방향" 
                options={GUIDE_OPTIONS.lighting.direction}
                value={shot.lighting?.direction} 
                onChange={(v) => onUpdateField('lighting', 'direction', v)} 
              />
              <SelectWithDesc 
                label="색온도" 
                options={GUIDE_OPTIONS.lighting.color_temperature}
                value={shot.lighting?.color_temperature} 
                onChange={(v) => onUpdateField('lighting', 'color_temperature', v)} 
              />
            </div>
          </div>

          <div className="detail-section">
            <div className="detail-section-title">VFX & 색상</div>
            <div className="detail-grid">
              <SelectWithDesc 
                label="속도" 
                options={GUIDE_OPTIONS.vfx.speed}
                value={shot.vfx?.speed} 
                onChange={(v) => onUpdateField('vfx', 'speed', v)} 
              />
              <SelectWithDesc 
                label="대비" 
                options={GUIDE_OPTIONS.color.contrast}
                value={shot.color?.contrast} 
                onChange={(v) => onUpdateField('color', 'contrast', v)} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShotDetail;
