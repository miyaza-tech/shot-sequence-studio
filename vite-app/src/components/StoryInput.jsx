function StoryInput({ storyText, setStoryText, onNext }) {
  return (
    <div className="content">
      <div className="content-inner">
        <h1 className="section-title">스토리 입력</h1>
        <p className="section-desc">영상 스토리를 입력하세요. 시간대별 비주얼, 오디오, 감정 등을 포함하면 좋습니다.</p>
        <textarea 
          className="textarea" 
          placeholder="스토리를 입력하세요..." 
          value={storyText} 
          onChange={(e) => setStoryText(e.target.value)} 
        />
        <div className="textarea-actions">
          <span className="char-count">{storyText.length} 자</span>
          <button 
            className="btn btn-primary" 
            disabled={storyText.length < 50} 
            onClick={onNext}
          >
            다음 단계 →
          </button>
        </div>
      </div>
    </div>
  );
}

export default StoryInput;
