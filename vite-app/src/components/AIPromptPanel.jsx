import { useState, useEffect } from 'react';
import SelectWithDesc from './SelectWithDesc';
import { GUIDE_OPTIONS, generateJSONPrompt, generateCleanPrompt, STYLE_HINTS } from '../constants';

const AI_PLATFORMS = ['runway', 'kling', 'sora', 'pika'];

function AIPromptPanel({ shot, style, setStyle, onCopy, selectedShots, allShots }) {
  const [selectedAI, setSelectedAI] = useState('runway');
  const [editedPrompt, setEditedPrompt] = useState('');
  const [isPromptEdited, setIsPromptEdited] = useState(false);

  // 하이라이트 표시를 위한 포맷팅
  const formatPromptWithHighlight = (obj) => {
    if (!obj) return '';
    const lines = JSON.stringify(obj, null, 2).split('\n');
    return lines.map(line => {
      if (line.includes('"style"') || line.includes('"atmosphere"')) {
        return line + '  ← 🎨 스타일 자동생성';
      }
      if (line.includes('"audio_reference"')) {
        return line + '  ← 🔊 참고용 (복사 시 제외)';
      }
      return line;
    }).join('\n');
  };

  const generatedPromptObj = shot ? generateJSONPrompt[selectedAI](shot, style) : null;
  const generatedPrompt = formatPromptWithHighlight(generatedPromptObj);
  const jsonPrompt = isPromptEdited ? editedPrompt : generatedPrompt;

  // 복사할 때는 하이라이트와 audio_reference 제거
  const cleanPromptForCopy = () => {
    if (isPromptEdited) return editedPrompt;
    const cleanObj = generateCleanPrompt[selectedAI](shot, style);
    return JSON.stringify(cleanObj, null, 2);
  };

  // 선택된 샷들의 프롬프트 일괄 생성 (스타일은 상단에 한번만)
  const generateBulkPrompts = () => {
    if (!selectedShots?.length || !allShots) return '';
    
    const hint = STYLE_HINTS[style] || {};
    const styleInfo = `// Style: ${style}\n// Keywords: ${hint.keywords || style}\n// Atmosphere: ${hint.atmosphere || ''}\n`;
    
    const prompts = selectedShots.map(idx => {
      const s = allShots[idx];
      const cleanObj = generateCleanPrompt[selectedAI](s, style);
      // 스타일 관련 필드 제거 (상단에서 한번만 표시하므로)
      delete cleanObj.style;
      delete cleanObj.atmosphere;
      return `// Shot #${s.shot}: ${s.title}\n${JSON.stringify(cleanObj, null, 2)}`;
    });
    
    return styleInfo + '\n---\n\n' + prompts.join('\n\n---\n\n');
  };

  // 샷이나 AI 변경 시 편집 상태 리셋
  useEffect(() => {
    setIsPromptEdited(false);
    setEditedPrompt('');
  }, [shot, selectedAI, style]);

  if (!shot) {
    return (
      <div className="split-panel ai-panel">
        <div className="split-panel-header">AI 프롬프트</div>
        <div className="split-panel-content">
          <div className="empty-state">
            <div className="empty-icon"></div>
            <div className="empty-text">샷을 선택하면<br/>프롬프트가 생성됩니다</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="split-panel ai-panel">
      <div className="split-panel-header">AI 프롬프트</div>
      <div className="split-panel-content">
        <div className="detail-panel">
          <div className="ai-section">
            <div className="detail-section" style={{marginBottom: '8px'}}>
              <div className="detail-section-title">스타일</div>
              <SelectWithDesc 
                label="" 
                options={GUIDE_OPTIONS.styles}
                value={style} 
                onChange={(v) => setStyle(v)} 
              />
            </div>
            
            <div className="detail-section-title" style={{marginTop: '16px'}}>AI 플랫폼</div>
            <div className="ai-buttons">
              {AI_PLATFORMS.map(ai => (
                <button 
                  key={ai} 
                  className={`ai-btn ${selectedAI === ai ? 'active' : ''}`} 
                  onClick={() => setSelectedAI(ai)}
                >
                  {ai.charAt(0).toUpperCase() + ai.slice(1)}
                </button>
              ))}
            </div>
            
            <div className="detail-section-title" style={{marginTop: '16px'}}>
              생성된 프롬프트 
              {isPromptEdited && <span style={{color: 'var(--accent-amber)', marginLeft: '8px', fontSize: '10px'}}>(수정됨)</span>}
            </div>
            <textarea
              className="ai-prompt-textarea"
              value={jsonPrompt}
              onChange={(e) => {
                setEditedPrompt(e.target.value);
                setIsPromptEdited(true);
              }}
              style={{
                width: '100%',
                height: 'calc(100vh - 540px)',
                minHeight: '150px',
                background: 'var(--bg-tertiary)',
                border: isPromptEdited ? '1px solid var(--accent-amber)' : '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '12px',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                lineHeight: '1.6',
                color: 'var(--text-primary)',
                resize: 'none'
              }}
            />
            <div style={{display: 'flex', gap: '8px', marginTop: '8px'}}>
              <button 
                className="btn btn-primary" 
                style={{flex: 1}} 
                onClick={() => onCopy(cleanPromptForCopy(), `${selectedAI} JSON`)}
              >
                현재 샷 복사
              </button>
              {isPromptEdited && (
                <button 
                  className="btn btn-secondary" 
                  onClick={() => { setIsPromptEdited(false); setEditedPrompt(''); }}
                >
                  ↺
                </button>
              )}
            </div>
            
            {/* 선택된 샷 일괄 복사 */}
            {selectedShots?.length > 0 && (
              <button 
                className="btn btn-secondary" 
                style={{width: '100%', marginTop: '8px'}}
                onClick={() => onCopy(generateBulkPrompts(), `${selectedShots.length}개 샷 프롬프트`)}
              >
                선택한 {selectedShots.length}개 샷 프롬프트 복사
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIPromptPanel;
