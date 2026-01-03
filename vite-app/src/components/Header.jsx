import ProjectManager from './ProjectManager';

// Film/Clapperboard Icon
const FilmIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
    <line x1="7" y1="2" x2="7" y2="22"/>
    <line x1="17" y1="2" x2="17" y2="22"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <line x1="2" y1="7" x2="7" y2="7"/>
    <line x1="2" y1="17" x2="7" y2="17"/>
    <line x1="17" y1="17" x2="22" y2="17"/>
    <line x1="17" y1="7" x2="22" y2="7"/>
  </svg>
);

function Header({ 
  step, 
  onSetStep,
  onLogout, 
  isDark, 
  onToggleTheme,
  currentProject,
  onNewProject,
  onLoadProject,
  onSaveProject,
  showToast
}) {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <div className="logo-icon"><FilmIcon /></div>
          <span className="logo-text">Shot Sequence Studio</span>
        </div>
        <ProjectManager
          currentProject={currentProject}
          onNewProject={onNewProject}
          onLoadProject={onLoadProject}
          onSaveProject={onSaveProject}
          showToast={showToast}
        />
      </div>
      <div className="steps">
        <button 
          className={`step ${step === 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}
          onClick={() => onSetStep(1)}
        >
          <span className="step-number">{step > 1 ? '✓' : '1'}</span><span>스토리 입력</span>
        </button>
        <span className="step-arrow">→</span>
        <button 
          className={`step ${step === 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}
          onClick={() => onSetStep(2)}
        >
          <span className="step-number">{step > 2 ? '✓' : '2'}</span><span>JSON 변환</span>
        </button>
        <span className="step-arrow">→</span>
        <button 
          className={`step ${step === 3 ? 'active' : ''}`}
          onClick={() => onSetStep(3)}
        >
          <span className="step-number">3</span><span>프롬프트 생성</span>
        </button>
      </div>
      <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
        <button className="btn btn-ghost btn-sm" onClick={onToggleTheme}>
          {isDark ? '☀' : '☾'}
        </button>
        <button className="btn btn-ghost btn-sm" onClick={onLogout}>로그아웃</button>
      </div>
    </header>
  );
}

export default Header;
