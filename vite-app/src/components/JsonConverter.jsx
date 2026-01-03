function JsonConverter({ conversionPrompt, jsonText, setJsonText, onCopy, onParseJSON }) {
  return (
    <div className="content">
      <div className="content-inner">
        <h1 className="section-title">JSON 변환</h1>
        <p className="section-desc">프롬프트를 Claude에 붙여넣고, 결과를 오른쪽에 붙여넣으세요.</p>
        <div className="split-view">
          <div className="split-panel">
            <div className="split-panel-header">
              <span>변환 프롬프트</span>
              <button className="btn btn-sm btn-secondary" onClick={() => onCopy(conversionPrompt, '프롬프트')}>복사</button>
            </div>
            <div className="split-panel-content">
              <textarea className="textarea" value={conversionPrompt} readOnly />
            </div>
          </div>
          <div className="split-panel">
            <div className="split-panel-header">
              <span>결과 JSON</span>
              <button 
                className="btn btn-sm btn-primary" 
                disabled={jsonText.length < 100}
                onClick={onParseJSON}
              >
                JSON 파싱
              </button>
            </div>
            <div className="split-panel-content">
              <textarea 
                className="textarea" 
                placeholder="Claude의 응답 JSON을 붙여넣으세요..." 
                value={jsonText} 
                onChange={(e) => setJsonText(e.target.value)} 
              />
            </div>
          </div>
        </div>
        <div className="instructions">
          <div className="instructions-title">사용 방법</div>
          <ul className="instructions-list">
            <li><span className="step-badge">1</span><span>"복사" 버튼 클릭</span></li>
            <li><span className="step-badge">2</span><span>새 Claude 대화창에 붙여넣기</span></li>
            <li><span className="step-badge">3</span><span>결과 JSON을 오른쪽에 붙여넣기</span></li>
            <li><span className="step-badge">4</span><span>"JSON 파싱" 버튼 클릭</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default JsonConverter;
