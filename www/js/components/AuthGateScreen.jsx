/**
 * ✦ KOMOREBI — Authentication Gate Screen Component
 */

function AuthGateScreen({ onLogin }) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState(0);
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const now = Date.now();
    if (now < lockedUntil) {
      const remainingSecs = Math.ceil((lockedUntil - now) / 1000);
      setErrorMessage(`Too many failed attempts. Sanctuary locked for ${remainingSecs}s.`);
      return;
    }

    const cleanName = window.SecurityGuard ? window.SecurityGuard.sanitizeText(userName, 32) : userName;
    if (!cleanName) {
      setErrorMessage('Please enter your name');
      return;
    }
    if (!password.trim() || password.length < 6) {
      const nextFail = failedAttempts + 1;
      setFailedAttempts(nextFail);
      if (nextFail >= 5) {
        setLockedUntil(Date.now() + 30000); // 30s lockout
        setErrorMessage('Too many failed attempts. Sanctuary locked for 30s.');
      } else {
        setErrorMessage('Password must be at least 6 characters');
      }
      return;
    }

    if (window.AudioEngine) AudioEngine.playTone(600);
    const lowerName = cleanName.toLowerCase();
    let userObj = { name: cleanName, uid: '802931402' };
    let partnerObj = { name: 'Mikkie', uid: '801124501' };

    if (lowerName.includes('mikkie')) {
      userObj = { name: 'Mikkie', uid: '801124501' };
      partnerObj = { name: 'Ziankyle', uid: '802931402' };
    } else if (lowerName.includes('zian')) {
      userObj = { name: 'Ziankyle', uid: '802931402' };
      partnerObj = { name: 'Mikkie', uid: '801124501' };
    }

    if (window.saveStorage) {
      saveStorage('auto_login_enabled', rememberMe);
      saveStorage('saved_auth_user', userObj);
      saveStorage('saved_auth_partner', partnerObj);
    }
    onLogin(userObj, partnerObj);
  };

  return (
    <div className="auth-gate-screen">
      <div className="auth-brand-box">
        <img
          src="./assets/iconforapp.jpg"
          alt="Komorebi Logo"
          className="auth-brand-logo"
        />
        <h2 className="auth-title">KOMOREBI</h2>
        <p className="auth-subtitle">Private Couple Sanctuary</p>
      </div>

      <form className="auth-form-card" onSubmit={handleSubmit}>
        {errorMessage && (
          <div className="auth-error-badge">
            {errorMessage}
          </div>
        )}

        <div className="auth-input-group">
          <label className="auth-input-label">Your Name</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
              setErrorMessage('');
            }}
            required
            autoComplete="name"
            placeholder="e.g. Ziankyle or Mikkie"
            className="auth-input-field"
          />
        </div>

        <div className="auth-input-group">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label className="auth-input-label">Password</label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '10.5px', cursor: 'pointer', padding: 0 }}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrorMessage('');
            }}
            required
            autoComplete="current-password"
            placeholder="••••••••"
            className="auth-input-field"
          />
        </div>

        <label className="auth-remember-row">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="auth-remember-checkbox"
          />
          <span>Keep me signed in on this device</span>
        </label>

        <button type="submit" className="btn-auth-submit">
          Enter Sanctuary 🔒
        </button>
      </form>
    </div>
  );
}

window.AuthGateScreen = AuthGateScreen;
