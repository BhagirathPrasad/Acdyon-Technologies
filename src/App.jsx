import { useEffect, useRef } from 'react';
import './App.css';

// SVG Icons
const Icons = {
  Rocket: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
    </svg>
  ),
  Zap: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
  ),
  Shield: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
  ),
  Check: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  ),
  ArrowRight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  ),
};

function App() {
  const revealRefs = useRef([]);

  useEffect(() => {
    // Scroll Reveal Logic
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    revealRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Konami Code Easter Egg
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    const handleKeyDown = (e) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          // Trigger Easter Egg
          document.body.classList.add('barrel-roll');
          document.documentElement.classList.add('konami-active');
          setTimeout(() => {
            document.body.classList.remove('barrel-roll');
          }, 2000);
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  return (
    <>
      <div className="container">
        <nav className="navbar">
          <div className="logo">
            <div className="logo-dot"></div>
            Acdyon Flow
          </div>
          <div className="nav-links">
            <a href="#" className="nav-link">Product</a>
            <a href="#" className="nav-link">Features</a>
            <a href="#" className="nav-link">Pricing</a>
            <a href="#" className="nav-link">Docs</a>
          </div>
          <button className="btn-primary">Log In</button>
        </nav>

        <header className="hero">
          <div className="hero-badge reveal" ref={addToRefs}>
            ✨ Acdyon Flow 2.0 is now live
          </div>
          <h1 className="reveal delay-1" ref={addToRefs}>
            Deploy faster. <br/>
            <span className="text-gradient">No magic, just better</span> <br/>
            <span className="text-gradient-accent">orchestration.</span>
          </h1>
          <p className="reveal delay-2" ref={addToRefs}>
            Stop wrestling with YAML and waiting for slow pipelines. Acdyon Flow intelligently predicts caches, parallelizes tests, and ships your code up to 10x faster.
          </p>
          <div className="hero-actions reveal delay-3" ref={addToRefs}>
            <button className="btn-accent">
              Start Building Free <Icons.ArrowRight />
            </button>
            <button className="btn-secondary">View Documentation</button>
          </div>
        </header>

        <section className="showcase-section reveal" ref={addToRefs}>
          <div className="glow-bg"></div>
          <div className="dashboard-mockup">
            <div className="mockup-header">
              <div className="mac-btns">
                <div className="mac-btn close"></div>
                <div className="mac-btn minimize"></div>
                <div className="mac-btn maximize"></div>
              </div>
              <div className="mockup-title">acdyon-flow ~ /production-deploy</div>
            </div>
            <div className="mockup-body">
              <div className="mock-sidebar">
                <div className="mock-nav-item">
                  <div className="mock-icon"></div>
                  <div className="mock-text"></div>
                </div>
                <div className="mock-nav-item active">
                  <div className="mock-icon"></div>
                  <div className="mock-text"></div>
                </div>
                <div className="mock-nav-item">
                  <div className="mock-icon"></div>
                  <div className="mock-text"></div>
                </div>
              </div>
              <div className="mock-main">
                <div className="mock-card">
                  <div className="pipeline-status">
                    <div className="status-indicator">
                      <div className="status-dot"></div>
                      <div className="status-text">Deployment Successful</div>
                    </div>
                    <div className="status-time" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>45s total</div>
                  </div>
                  <div className="pipeline-steps">
                    <div className="step">
                      <div className="step-icon"><Icons.Check /></div>
                      <div className="step-label">Lint</div>
                    </div>
                    <div className="step">
                      <div className="step-icon"><Icons.Check /></div>
                      <div className="step-label">Test</div>
                    </div>
                    <div className="step">
                      <div className="step-icon"><Icons.Check /></div>
                      <div className="step-label">Build</div>
                    </div>
                    <div className="step">
                      <div className="step-icon"><Icons.Check /></div>
                      <div className="step-label">Deploy</div>
                    </div>
                  </div>
                </div>
                <div className="terminal">
                  <div className="terminal-line"><span className="info">~</span> <span style={{ color: '#fff' }}>flow deploy --env production</span></div>
                  <div className="terminal-line"><span className="success">✓</span> Reused 24 cached layers</div>
                  <div className="terminal-line"><span className="success">✓</span> All tests passed (3.2s)</div>
                  <div className="terminal-line"><span className="success">✓</span> Artifact uploaded</div>
                  <div className="terminal-line">
                    <span className="success">✓</span> 
                    <span className="typewriter" style={{ marginLeft: '8px' }}>Deployed to https://app.acdyon.dev</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="features">
          <div className="feature-card reveal" ref={addToRefs}>
            <div className="feature-icon"><Icons.Zap /></div>
            <h3>Predictive Caching</h3>
            <p>Our agent analyzes your git tree to restore only the exact cache layers needed, shaving minutes off every build.</p>
          </div>
          <div className="feature-card reveal delay-1" ref={addToRefs}>
            <div className="feature-icon"><Icons.Shield /></div>
            <h3>Deterministic Environments</h3>
            <p>Runs in isolated microVMs ensuring that what works on your machine works in the pipeline, every single time.</p>
          </div>
          <div className="feature-card reveal delay-2" ref={addToRefs}>
            <div className="feature-icon"><Icons.Rocket /></div>
            <h3>Instant Reverts</h3>
            <p>Bad deploy? Acdyon Flow keeps a live snapshot of your previous successful build for one-click instantaneous rollbacks.</p>
          </div>
        </section>

      </div>
      <footer>
        <p>&copy; 2026 Acdyon Technologies. Engineered with care.</p>
      </footer>
    </>
  );
}

export default App;
