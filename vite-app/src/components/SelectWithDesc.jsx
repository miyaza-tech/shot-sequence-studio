import { useState, useRef, useEffect } from 'react';
import '../styles/SelectWithDesc.css';

function SelectWithDesc({ label, options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const selectedOption = options.find(o => o.value === value) || options[0];
  
  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  return (
    <div className="detail-item" style={label ? {} : {background: 'transparent', padding: 0, border: 'none'}}>
      {label && <div className="detail-label">{label}</div>}
      <div className={`custom-select ${isOpen ? 'open' : ''}`} ref={ref}>
        <div 
          className="custom-select-trigger"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption?.value || '선택하세요'}
        </div>
        {isOpen && (
          <div className="custom-select-dropdown">
            {options.map(opt => (
              <div
                key={opt.value}
                className={`custom-select-option ${opt.value === value ? 'selected' : ''}`}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
              >
                <div className="option-value">{opt.value}</div>
                <div className="option-desc">{opt.desc}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="select-current-desc">{selectedOption?.desc || ''}</div>
    </div>
  );
}

export default SelectWithDesc;
