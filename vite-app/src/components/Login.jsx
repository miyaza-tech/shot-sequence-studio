import { useState } from 'react';
import '../styles/Login.css';

function Login({ onLogin }) {
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const handleLogin = () => {
    if (password === 'dhWkddk') {
      localStorage.setItem('sss_auth', 'authenticated');
      onLogin();
      setLoginError('');
    } else {
      setLoginError('비밀번호가 틀렸습니다');
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-logo">
          <div className="logo-icon" style={{width: '48px', height: '48px', fontSize: '24px'}}>🎬</div>
        </div>
        <h1 className="login-title">Shot Sequence Studio</h1>
        <p className="login-subtitle">관리자 로그인이 필요합니다</p>
        
        <div className="login-form">
          <input
            type="password"
            className="login-input"
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            autoFocus
          />
          {loginError && <div className="login-error">{loginError}</div>}
          <button className="btn btn-primary login-btn" onClick={handleLogin}>
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
