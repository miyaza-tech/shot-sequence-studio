// JSON 파일 Import/Export 유틸리티

const MAX_IMPORT_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const MAX_SHOT_COUNT = 500;

const isPlainObject = (value) => {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
};

const validateSequenceContainer = (value) => {
  if (!isPlainObject(value)) {
    throw new Error('시퀀스 형식이 올바르지 않습니다.');
  }

  if (!Array.isArray(value.sequence)) {
    throw new Error('시퀀스 배열(sequence)이 필요합니다.');
  }

  if (value.sequence.length > MAX_SHOT_COUNT) {
    throw new Error(`샷 개수가 너무 많습니다. (최대 ${MAX_SHOT_COUNT}개)`);
  }
};

const validateImportedData = (data) => {
  if (!isPlainObject(data)) {
    throw new Error('JSON 루트는 객체 형식이어야 합니다.');
  }

  if (Object.prototype.hasOwnProperty.call(data, 'project')) {
    if (!isPlainObject(data.project)) {
      throw new Error('project 형식이 올바르지 않습니다.');
    }

    if (data.project.sequence != null) {
      validateSequenceContainer(data.project.sequence);
    }

    return;
  }

  if (Object.prototype.hasOwnProperty.call(data, 'sequence')) {
    validateSequenceContainer(data);
    return;
  }

  throw new Error('올바른 프로젝트 파일 형식이 아닙니다.');
};

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
    input.accept = '.json,application/json';
    
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) {
        reject(new Error('파일이 선택되지 않았습니다.'));
        return;
      }

      if (file.size > MAX_IMPORT_FILE_SIZE) {
        reject(new Error(`파일 크기가 너무 큽니다. (최대 ${Math.floor(MAX_IMPORT_FILE_SIZE / 1024 / 1024)}MB)`));
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const text = typeof event.target.result === 'string' ? event.target.result : '';
          const data = JSON.parse(text);
          validateImportedData(data);
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
