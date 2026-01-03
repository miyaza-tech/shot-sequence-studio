import { useState, useEffect } from 'react';
import { 
  Login, 
  Header, 
  StoryInput, 
  JsonConverter, 
  PromptGenerator, 
  Footer, 
  Toast 
} from './components';
import { CONVERSION_PROMPT } from './constants';
import { saveProject as saveToStorage, loadLastProject } from './utils/storage';

function App() {
  // 로그인 상태
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('sss_auth') === 'authenticated';
  });
  
  // 다크모드 상태
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('sss_theme') === 'dark';
  });

  // 테마 변경 시 적용
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('sss_theme', newTheme ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
  };

  // 초기 테마 적용
  useEffect(() => {
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('sss_auth');
    setIsLoggedIn(false);
  };

  // 앱 상태
  const [step, setStep] = useState(1);
  const [storyText, setStoryText] = useState('');
  const [jsonText, setJsonText] = useState('');
  const [parsedData, setParsedData] = useState(null);
  const [selectedShot, setSelectedShot] = useState(null);
  const [selectedShotIndex, setSelectedShotIndex] = useState(null);
  const [selectedShots, setSelectedShots] = useState([]); // 다중 선택
  const [style, setStyle] = useState('Pixar 3D Animation');
  const [toast, setToast] = useState(null);

  // 프로젝트 상태
  const [currentProject, setCurrentProject] = useState(null);

  // 마지막 프로젝트 자동 로드
  useEffect(() => {
    const lastProject = loadLastProject();
    if (lastProject) {
      setCurrentProject(lastProject);
      if (lastProject.story) setStoryText(lastProject.story);
      if (lastProject.sequence) {
        setParsedData(lastProject.sequence);
        if (lastProject.sequence.sequence?.length > 0) {
          setSelectedShot(lastProject.sequence.sequence[0]);
          setSelectedShotIndex(0);
        }
        setStep(3);
      }
    }
  }, []);

  // 유틸리티
  const showToast = (msg) => { 
    setToast(msg); 
    setTimeout(() => setToast(null), 2500); 
  };
  
  const copyToClipboard = (text, label) => { 
    navigator.clipboard.writeText(text); 
    showToast(`${label} 복사 완료!`); 
  };

  // 새 프로젝트
  const handleNewProject = () => {
    setCurrentProject(null);
    setStep(1);
    setStoryText('');
    setJsonText('');
    setParsedData(null);
    setSelectedShot(null);
    setSelectedShotIndex(null);
  };

  // 프로젝트 불러오기
  const handleLoadProject = (project) => {
    setCurrentProject(project);
    if (project.story) setStoryText(project.story);
    if (project.sequence) {
      setParsedData(project.sequence);
      setJsonText(JSON.stringify(project.sequence, null, 2));
      if (project.sequence.sequence?.length > 0) {
        setSelectedShot(project.sequence.sequence[0]);
        setSelectedShotIndex(0);
      }
      setStep(3);
    } else {
      setStep(1);
    }
  };

  // 프로젝트 저장
  const handleSaveProject = (customName) => {
    const projectName = customName || currentProject?.name || `프로젝트 ${new Date().toLocaleDateString('ko-KR')}`;
    const projectData = {
      name: projectName,
      story: storyText,
      sequence: parsedData
    };
    
    const id = saveToStorage(projectData, currentProject?.id);
    setCurrentProject({ ...projectData, id });
    showToast('프로젝트 저장됨');
  };

  // JSON 파싱
  const handleParseJSON = () => {
    try {
      let jsonStr = jsonText;
      const match = jsonText.match(/```json\s*([\s\S]*?)\s*```/);
      if (match) jsonStr = match[1];
      const data = JSON.parse(jsonStr);
      setParsedData(data);
      if (data.sequence?.length > 0) {
        setSelectedShot(data.sequence[0]);
        setSelectedShotIndex(0);
      }
      setStep(3);
      showToast('JSON 파싱 완료!');
    } catch { 
      showToast('JSON 파싱 실패'); 
    }
  };

  // 샷 필드 업데이트
  const updateShotField = (category, field, value) => {
    if (selectedShotIndex === null) return;
    const newData = { ...parsedData };
    const shot = { ...newData.sequence[selectedShotIndex] };
    
    if (category === 'camera_focus') {
      shot.camera = { ...shot.camera, focus: { ...shot.camera?.focus, type: value } };
    } else if (['camera', 'lighting', 'vfx', 'color'].includes(category)) {
      shot[category] = { ...shot[category], [field]: value };
    }
    
    newData.sequence[selectedShotIndex] = shot;
    setParsedData(newData);
    setSelectedShot(shot);
  };

  // 샷 선택
  const handleSelectShot = (shot, index) => {
    setSelectedShot(shot);
    setSelectedShotIndex(index);
  };

  // 다중 샷 선택 토글
  const handleToggleShot = (index) => {
    setSelectedShots(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        return [...prev, index].sort((a, b) => a - b);
      }
    });
  };

  // 전체 선택/해제
  const handleSelectAll = () => {
    if (selectedShots.length === parsedData?.sequence?.length) {
      setSelectedShots([]);
    } else {
      setSelectedShots(parsedData?.sequence?.map((_, i) => i) || []);
    }
  };

  const conversionPrompt = CONVERSION_PROMPT(storyText);

  // 로그인 전
  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  // 메인 앱
  return (
    <div className="app">
      <Header 
        step={step} 
        onSetStep={setStep}
        onLogout={handleLogout} 
        isDark={isDark} 
        onToggleTheme={toggleTheme}
        currentProject={currentProject}
        onNewProject={handleNewProject}
        onLoadProject={handleLoadProject}
        onSaveProject={handleSaveProject}
        showToast={showToast}
      />

      <main className="main">
        {step === 1 && (
          <StoryInput 
            storyText={storyText}
            setStoryText={setStoryText}
            onNext={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <JsonConverter 
            conversionPrompt={conversionPrompt}
            jsonText={jsonText}
            setJsonText={setJsonText}
            onCopy={copyToClipboard}
            onParseJSON={handleParseJSON}
          />
        )}

        {step === 3 && parsedData && (
          <PromptGenerator 
            parsedData={parsedData}
            selectedShot={selectedShot}
            selectedShotIndex={selectedShotIndex}
            onSelectShot={handleSelectShot}
            onUpdateField={updateShotField}
            style={style}
            setStyle={setStyle}
            onCopy={copyToClipboard}
            selectedShots={selectedShots}
            onToggleShot={handleToggleShot}
            onSelectAll={handleSelectAll}
          />
        )}
      </main>

      <Toast message={toast} />
    </div>
  );
}

export default App;
