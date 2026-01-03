import { useState, useEffect, useRef } from 'react';
import { 
  getProjectList, 
  saveProject, 
  loadProject, 
  deleteProject, 
  renameProject 
} from '../utils/storage';
import { exportProject, importFromJSON } from '../utils/fileIO';

// Simple SVG Icons
const Icons = {
  folder: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>,
  plus: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  save: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>,
  folderOpen: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2v1"/><path d="M2 10h20"/></svg>,
  download: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  upload: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
  edit: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  trash: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  chevronDown: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>,
  chevronUp: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>,
};

function ProjectManager({ 
  currentProject, 
  onNewProject, 
  onLoadProject, 
  onSaveProject,
  showToast 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const dropdownRef = useRef(null);

  // 프로젝트 목록 새로고침
  const refreshList = () => {
    setProjects(getProjectList());
  };

  useEffect(() => {
    refreshList();
  }, []);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 새 프로젝트
  const handleNew = () => {
    onNewProject();
    setIsOpen(false);
    showToast('새 프로젝트를 시작합니다');
  };

  // 프로젝트 저장
  const handleSave = () => {
    const defaultName = currentProject?.name || `프로젝트 ${new Date().toLocaleDateString('ko-KR')}`;
    const name = prompt('프로젝트 이름을 입력하세요:', defaultName);
    if (name !== null) {
      onSaveProject(name.trim() || defaultName);
      refreshList();
    }
    setIsOpen(false);
  };

  // 프로젝트 불러오기
  const handleLoad = (id) => {
    const project = loadProject(id);
    if (project) {
      onLoadProject(project);
      showToast(`"${project.name}" 불러옴`);
    }
    setShowModal(false);
    setIsOpen(false);
  };

  // 프로젝트 삭제
  const handleDelete = (id, name) => {
    if (confirm(`"${name}" 프로젝트를 삭제할까요?`)) {
      deleteProject(id);
      refreshList();
      showToast('프로젝트 삭제됨');
    }
  };

  // 이름 변경 시작
  const startRename = (id, name) => {
    setEditingId(id);
    setEditName(name);
  };

  // 이름 변경 완료
  const finishRename = (id) => {
    if (editName.trim()) {
      renameProject(id, editName.trim());
      refreshList();
    }
    setEditingId(null);
  };

  // JSON Import
  const handleImport = async () => {
    try {
      const data = await importFromJSON();
      if (data.project) {
        // 전체 프로젝트 파일
        const id = saveProject(data.project);
        const project = loadProject(id);
        onLoadProject(project);
        showToast('프로젝트 가져오기 완료');
      } else if (data.sequence) {
        // 시퀀스만 있는 파일
        onLoadProject({ sequence: data });
        showToast('시퀀스 가져오기 완료');
      } else {
        showToast('올바른 프로젝트 파일이 아닙니다');
      }
    } catch (err) {
      showToast(err.message);
    }
    setIsOpen(false);
  };

  // JSON Export
  const handleExport = () => {
    if (currentProject) {
      exportProject(currentProject);
      showToast('프로젝트 내보내기 완료');
    } else {
      showToast('저장된 프로젝트가 없습니다');
    }
    setIsOpen(false);
  };

  // 날짜 포맷
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return '방금 전';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}분 전`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}시간 전`;
    if (diff < 604800000) return `${Math.floor(diff / 86400000)}일 전`;
    return date.toLocaleDateString('ko-KR');
  };

  return (
    <div className="project-manager" ref={dropdownRef}>
      {/* 드롭다운 트리거 버튼 */}
      <button 
        className="btn btn-ghost btn-sm project-btn"
        onClick={() => { setIsOpen(!isOpen); refreshList(); }}
      >
        <span className="project-icon">{Icons.folder}</span>
        <span className="project-name">
          {currentProject?.name || '프로젝트'}
        </span>
        <span className="dropdown-arrow">{isOpen ? Icons.chevronUp : Icons.chevronDown}</span>
      </button>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div className="project-dropdown">
          <div className="dropdown-section">
            <button className="dropdown-item" onClick={handleNew}>
              {Icons.plus} 새 프로젝트
            </button>
            <button className="dropdown-item" onClick={handleSave}>
              {Icons.save} 현재 프로젝트 저장
            </button>
          </div>
          
          <div className="dropdown-divider"></div>
          
          <div className="dropdown-section">
            <button className="dropdown-item" onClick={() => { setShowModal(true); refreshList(); }}>
              {Icons.folderOpen} 프로젝트 관리...
            </button>
          </div>
          
          <div className="dropdown-divider"></div>
          
          <div className="dropdown-section">
            <button className="dropdown-item" onClick={handleImport}>
              {Icons.download} JSON 가져오기
            </button>
            <button className="dropdown-item" onClick={handleExport}>
              {Icons.upload} JSON 내보내기
            </button>
          </div>

          {/* 최근 프로젝트 */}
          {projects.length > 0 && (
            <>
              <div className="dropdown-divider"></div>
              <div className="dropdown-section">
                <div className="dropdown-label">최근 프로젝트</div>
                {projects.slice(0, 5).map(p => (
                  <button 
                    key={p.id} 
                    className={`dropdown-item recent-project ${currentProject?.id === p.id ? 'active' : ''}`}
                    onClick={() => handleLoad(p.id)}
                  >
                    <span className="recent-name">{p.name}</span>
                    <span className="recent-meta">{p.shotCount}샷 · {formatDate(p.updatedAt)}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* 프로젝트 관리 모달 */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal project-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>프로젝트 관리</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            
            <div className="modal-body">
              {projects.length === 0 ? (
                <div className="empty-state">
                  <p>저장된 프로젝트가 없습니다</p>
                  <button className="btn btn-primary" onClick={() => { setShowModal(false); handleNew(); }}>
                    새 프로젝트 만들기
                  </button>
                </div>
              ) : (
                <div className="project-list">
                  {projects.map(p => (
                    <div 
                      key={p.id} 
                      className={`project-item ${currentProject?.id === p.id ? 'active' : ''}`}
                    >
                      <div className="project-info" onClick={() => handleLoad(p.id)}>
                        {editingId === p.id ? (
                          <input
                            type="text"
                            className="rename-input"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            onBlur={() => finishRename(p.id)}
                            onKeyDown={(e) => e.key === 'Enter' && finishRename(p.id)}
                            onClick={(e) => e.stopPropagation()}
                            autoFocus
                          />
                        ) : (
                          <span className="project-item-name">{p.name}</span>
                        )}
                        <span className="project-item-meta">
                          {p.shotCount}샷 · 수정: {formatDate(p.updatedAt)}
                        </span>
                      </div>
                      <div className="project-actions">
                        <button 
                          className="btn-icon" 
                          title="이름 변경"
                          onClick={(e) => { e.stopPropagation(); startRename(p.id, p.name); }}
                        >
                          {Icons.edit}
                        </button>
                        <button 
                          className="btn-icon btn-danger" 
                          title="삭제"
                          onClick={(e) => { e.stopPropagation(); handleDelete(p.id, p.name); }}
                        >
                          {Icons.trash}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={handleImport}>
                {Icons.download} JSON 가져오기
              </button>
              <button className="btn btn-primary" onClick={() => setShowModal(false)}>
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectManager;
