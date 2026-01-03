// 시간 문자열을 초로 변환
const parseDuration = (duration) => {
  if (!duration) return 0;
  const str = String(duration).toLowerCase();
  const match = str.match(/(\d+\.?\d*)\s*s?/);
  return match ? parseFloat(match[1]) : 0;
};

// 초를 포맷팅
const formatDuration = (seconds) => {
  if (seconds < 60) return `${seconds.toFixed(1)}s`;
  const min = Math.floor(seconds / 60);
  const sec = (seconds % 60).toFixed(1);
  return `${min}m ${sec}s`;
};

function ShotList({ shots, selectedIndex, onSelect, selectedShots, onToggleShot, onSelectAll }) {
  // 선택된 샷들의 총 시간 계산
  const totalDuration = selectedShots?.reduce((sum, idx) => {
    return sum + parseDuration(shots?.[idx]?.duration);
  }, 0) || 0;

  return (
    <div className="split-panel">
      <div className="split-panel-header">
        <span>샷 리스트 ({shots?.length || 0})</span>
        {selectedShots?.length > 0 && (
          <span className="selected-info">
            {selectedShots.length}개 선택 · {formatDuration(totalDuration)}
          </span>
        )}
      </div>
      <div className="split-panel-content">
        <div className="shot-list-actions">
          <label className="select-all-checkbox">
            <input
              type="checkbox"
              checked={selectedShots?.length === shots?.length && shots?.length > 0}
              onChange={onSelectAll}
            />
            <span>전체 선택</span>
          </label>
        </div>
        <div className="shot-list-container">
          {shots?.map((shot, i) => (
            <div 
              key={i} 
              className={`shot-item ${selectedIndex === i ? 'active' : ''} ${selectedShots?.includes(i) ? 'checked' : ''}`}
            >
              <div className="shot-checkbox">
                <input
                  type="checkbox"
                  checked={selectedShots?.includes(i) || false}
                  onChange={(e) => {
                    e.stopPropagation();
                    onToggleShot(i);
                  }}
                />
              </div>
              <div className="shot-content" onClick={() => onSelect(shot, i)}>
                <div className="shot-header">
                  <span className="shot-number">#{shot.shot}</span>
                  <span className="shot-duration">{shot.duration}</span>
                </div>
                <div className="shot-title">{shot.title}</div>
                <div className="shot-emotion">{shot.emotion}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShotList;
