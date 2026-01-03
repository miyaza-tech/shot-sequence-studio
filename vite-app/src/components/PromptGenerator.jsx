import ShotList from './ShotList';
import ShotDetail from './ShotDetail';
import AIPromptPanel from './AIPromptPanel';

function PromptGenerator({ 
  parsedData, 
  selectedShot, 
  selectedShotIndex, 
  onSelectShot, 
  onUpdateField,
  style,
  setStyle,
  onCopy,
  selectedShots,
  onToggleShot,
  onSelectAll
}) {
  return (
    <div className="content" style={{padding: '0'}}>
      <div className="split-view-3col">
        <ShotList 
          shots={parsedData.sequence} 
          selectedIndex={selectedShotIndex} 
          onSelect={onSelectShot}
          selectedShots={selectedShots}
          onToggleShot={onToggleShot}
          onSelectAll={onSelectAll}
        />
        <ShotDetail 
          shot={selectedShot} 
          onUpdateField={onUpdateField} 
        />
        <AIPromptPanel 
          shot={selectedShot}
          style={style}
          setStyle={setStyle}
          onCopy={onCopy}
          selectedShots={selectedShots}
          allShots={parsedData.sequence}
        />
      </div>
    </div>
  );
}

export default PromptGenerator;
