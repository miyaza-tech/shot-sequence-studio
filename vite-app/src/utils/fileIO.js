// JSON 파일 Import/Export 유틸리티

// JSON 파일로 내보내기
export const exportToJSON = (data, filename = 'project.json') => {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// JSON 파일에서 가져오기
export const importFromJSON = () => {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) {
        reject(new Error('파일이 선택되지 않았습니다.'));
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          resolve(data);
        } catch (err) {
          reject(new Error('JSON 파싱 실패: ' + err.message));
        }
      };
      reader.onerror = () => reject(new Error('파일 읽기 실패'));
      reader.readAsText(file);
    };
    
    input.click();
  });
};

// 프로젝트 전체를 파일로 내보내기
export const exportProject = (project) => {
  const filename = `${project.name || 'project'}_${new Date().toISOString().split('T')[0]}.json`;
  exportToJSON({
    exportedAt: new Date().toISOString(),
    version: '1.0',
    project: project
  }, filename);
};

// 시퀀스만 파일로 내보내기
export const exportSequence = (sequence, projectName = 'sequence') => {
  const filename = `${projectName}_sequence_${new Date().toISOString().split('T')[0]}.json`;
  exportToJSON(sequence, filename);
};
