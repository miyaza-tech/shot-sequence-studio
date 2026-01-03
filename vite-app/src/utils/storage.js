// localStorage 프로젝트 관리 유틸리티

const STORAGE_KEY = 'sss_projects';

// UUID 생성
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// 전체 데이터 가져오기
const getData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : { projects: [], lastOpenedId: null };
  } catch {
    return { projects: [], lastOpenedId: null };
  }
};

// 전체 데이터 저장
const setData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// 프로젝트 목록 가져오기
export const getProjectList = () => {
  const data = getData();
  return data.projects.map(p => ({
    id: p.id,
    name: p.name,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
    shotCount: p.sequence?.sequence?.length || 0
  })).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
};

// 프로젝트 저장 (새로 생성 또는 업데이트)
export const saveProject = (project, existingId = null) => {
  const data = getData();
  const now = new Date().toISOString();
  
  if (existingId) {
    // 기존 프로젝트 업데이트
    const index = data.projects.findIndex(p => p.id === existingId);
    if (index !== -1) {
      data.projects[index] = {
        ...data.projects[index],
        ...project,
        updatedAt: now
      };
      data.lastOpenedId = existingId;
      setData(data);
      return existingId;
    }
  }
  
  // 새 프로젝트 생성
  const newProject = {
    id: generateId(),
    name: project.name || `프로젝트 ${data.projects.length + 1}`,
    createdAt: now,
    updatedAt: now,
    story: project.story || '',
    sequence: project.sequence || null
  };
  
  data.projects.push(newProject);
  data.lastOpenedId = newProject.id;
  setData(data);
  return newProject.id;
};

// 프로젝트 불러오기
export const loadProject = (id) => {
  const data = getData();
  const project = data.projects.find(p => p.id === id);
  if (project) {
    data.lastOpenedId = id;
    setData(data);
  }
  return project || null;
};

// 프로젝트 삭제
export const deleteProject = (id) => {
  const data = getData();
  data.projects = data.projects.filter(p => p.id !== id);
  if (data.lastOpenedId === id) {
    data.lastOpenedId = data.projects[0]?.id || null;
  }
  setData(data);
};

// 프로젝트 이름 변경
export const renameProject = (id, newName) => {
  const data = getData();
  const project = data.projects.find(p => p.id === id);
  if (project) {
    project.name = newName;
    project.updatedAt = new Date().toISOString();
    setData(data);
  }
};

// 마지막으로 열린 프로젝트 ID 가져오기
export const getLastOpenedId = () => {
  const data = getData();
  return data.lastOpenedId;
};

// 마지막으로 열린 프로젝트 자동 로드
export const loadLastProject = () => {
  const data = getData();
  if (data.lastOpenedId) {
    return data.projects.find(p => p.id === data.lastOpenedId) || null;
  }
  return null;
};
