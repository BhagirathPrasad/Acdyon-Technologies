import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Shield, Rocket, CheckCircle2, ArrowRight, Menu, X, Star, ChevronDown } from 'lucide-react';

const PLANS = [
  {
    name: 'Starter',
    price: 'Free',
    sub: 'forever',
    features: ['5 pipelines', '500 builds/month', 'Community support', 'Basic analytics'],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '₹2,499',
    sub: 'per month',
    features: ['Unlimited pipelines', '10,000 builds/month', 'Priority support', 'Advanced analytics', 'Custom environments', 'Team collaboration'],
    cta: 'Start Free Trial',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    sub: 'contact us',
    features: ['Everything in Pro', 'SSO & SAML', 'Dedicated infra', 'SLA guarantee', 'Custom integrations', 'Onboarding support'],
    cta: 'Contact Sales',
    highlight: false,
  },
];


const FAQS = [
  { q: 'How does Acdyon Flow differ from GitHub Actions?', a: 'Acdyon Flow adds AI-powered predictive caching, automatic parallelization, and one-click rollbacks on top of standard CI/CD primitives — meaning you get faster builds without writing complex config.' },
  { q: 'Can I migrate from an existing CI/CD setup?', a: 'Yes. We provide migration guides and a CLI importer for GitHub Actions, CircleCI, and Jenkins. Most teams migrate in under 30 minutes.' },
  { q: 'Is my code secure?', a: 'All pipeline runs happen in isolated microVMs that are destroyed after each build. We never store your source code beyond the duration of the build.' },
  { q: 'What languages and frameworks are supported?', a: 'Any language. Acdyon Flow is language-agnostic — it detects your runtime automatically and sets up the environment accordingly.' },
];

// SVG Icons for pipeline steps
const CheckSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export default function Landing() {
  const navigate = useNavigate();
  const revealRefs = useRef([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
    }, { threshold: 0.1 });
    revealRefs.current.forEach(ref => { if (ref) observer.observe(ref); });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // Konami Code Easter Egg
    const code = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let idx = 0;
    const handler = (e) => {
      if (e.key === code[idx]) { idx++; if (idx === code.length) { document.body.classList.add('barrel-roll'); setTimeout(() => document.body.classList.remove('barrel-roll'), 2000); idx = 0; } }
      else idx = 0;
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const addToRefs = (el) => { if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el); };

  const scrollTo = (id) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const navLinks = [
    { label: 'Product', id: 'product' },
    { label: 'Features', id: 'features' },
    { label: 'Pricing', id: 'pricing' },
    { label: 'Docs', id: 'docs' },
  ];

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav className={`landing-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="landing-nav-inner">
          <div className="logo" style={{ cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="logo-dot" />
            Acdyon Flow
          </div>

          <div className="nav-links desktop-nav">
            {navLinks.map(l => (
              <button key={l.id} className="nav-link" onClick={() => scrollTo(l.id)}>{l.label}</button>
            ))}
          </div>

          <div className="nav-actions">
            <button className="btn-ghost" onClick={() => navigate('/auth')}>Log In</button>
            <button className="btn-primary" onClick={() => navigate('/auth')}>Get Started</button>
          </div>

          <button className="mobile-menu-btn" onClick={() => setMobileOpen(o => !o)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="mobile-nav">
            {navLinks.map(l => (
              <button key={l.id} className="mobile-nav-link" onClick={() => scrollTo(l.id)}>{l.label}</button>
            ))}
            <button className="btn-accent" style={{ width: '100%', justifyContent: 'center' }} onClick={() => navigate('/auth')}>
              Get Started Free
            </button>
          </div>
        )}
      </nav>

      <div className="landing-body">

        {/* ── HERO ── */}
        <section className="hero-section" id="product">
          <div className="container">
            <div className="hero-badge reveal" ref={addToRefs}>✨ Acdyon Flow 2.0 is now live</div>
            <h1 className="hero-h1 reveal delay-1" ref={addToRefs}>
              Deploy faster.<br />
              <span className="text-gradient">No magic, just better</span><br />
              <span className="text-gradient-accent">orchestration.</span>
            </h1>
            <p className="hero-p reveal delay-2" ref={addToRefs}>
              Stop wrestling with YAML and waiting for slow pipelines.<br />
              Acdyon Flow intelligently predicts caches, parallelizes tests,<br />
              and ships your code up to <strong>10x faster</strong>.
            </p>
            <div className="hero-actions reveal delay-3" ref={addToRefs}>
              <button className="btn-accent" onClick={() => navigate('/auth')}>
                Start Building Free <ArrowRight size={18} />
              </button>
              <button className="btn-secondary" onClick={() => scrollTo('docs')}>View Documentation</button>
            </div>

            {/* Stats strip */}
            <div className="stats-strip reveal" ref={addToRefs}>
              {[['10x', 'Faster builds'], ['99.9%', 'Uptime SLA'], ['50k+', 'Deployments/day'], ['< 1min', 'Avg deploy time']].map(([n, l]) => (
                <div key={l} className="stat-item">
                  <span className="stat-num">{n}</span>
                  <span className="stat-label">{l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mockup */}
          <div className="container">
            <div className="showcase-section reveal" ref={addToRefs}>
              <div className="glow-bg" />
              <div className="dashboard-mockup">
                <div className="mockup-header">
                  <div className="mac-btns">
                    <div className="mac-btn close" />
                    <div className="mac-btn minimize" />
                    <div className="mac-btn maximize" />
                  </div>
                  <div className="mockup-title">acdyon-flow ~ /production-deploy</div>
                </div>
                <div className="mockup-body">
                  <div className="mock-sidebar">
                    {[false, true, false].map((active, i) => (
                      <div key={i} className={`mock-nav-item ${active ? 'active' : ''}`}>
                        <div className="mock-icon" /><div className="mock-text" />
                      </div>
                    ))}
                  </div>
                  <div className="mock-main">
                    <div className="mock-card">
                      <div className="pipeline-status">
                        <div className="status-indicator">
                          <div className="status-dot" />
                          <div className="status-text">Deployment Successful</div>
                        </div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>45s total</div>
                      </div>
                      <div className="pipeline-steps">
                        {['Lint', 'Test', 'Build', 'Deploy'].map(s => (
                          <div key={s} className="step">
                            <div className="step-icon"><CheckSVG /></div>
                            <div className="step-label">{s}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="terminal">
                      <div className="terminal-line"><span className="info">~</span> <span style={{ color: '#fff' }}>flow deploy --env production</span></div>
                      <div className="terminal-line"><span className="success">✓</span> Reused 24 cached layers</div>
                      <div className="terminal-line"><span className="success">✓</span> All tests passed (3.2s)</div>
                      <div className="terminal-line"><span className="success">✓</span> Artifact uploaded</div>
                      <div className="terminal-line"><span className="success">✓</span> <span className="typewriter" style={{ marginLeft: '8px' }}>Deployed to https://app.acdyon.dev</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section id="features" className="section-pad">
          <div className="container">
            <div className="section-heading reveal" ref={addToRefs}>
              <div className="section-badge">Features</div>
              <h2>Everything your team needs to ship with confidence</h2>
              <p>Purpose-built for modern engineering teams that can't afford slow pipelines.</p>
            </div>
            <div className="features-grid">
              {[
                { Icon: Zap, title: 'Predictive Caching', desc: 'Our agent analyzes your git tree to restore only the exact cache layers needed, shaving minutes off every build.' },
                { Icon: Shield, title: 'Deterministic Environments', desc: 'Runs in isolated microVMs ensuring that what works on your machine works in the pipeline, every single time.' },
                { Icon: Rocket, title: 'Instant Reverts', desc: 'Bad deploy? Acdyon Flow keeps a live snapshot of your previous successful build for one-click instantaneous rollbacks.' },
                { Icon: CheckCircle2, title: 'Smart Parallelization', desc: 'Automatically detects independent test suites and pipeline steps and runs them in parallel without any configuration.' },
                { Icon: Star, title: 'Real-time Logs', desc: 'Stream live build logs directly in your browser. Filter by step, severity, or timestamp. Share a log link with your team.' },
                { Icon: ArrowRight, title: 'One-Click Deploy', desc: 'Connect your GitHub repo and deploy to production with a single click. Zero YAML required to get started.' },
              ].map(({ Icon, title, desc }, i) => (
                <div key={title} className={`feature-card reveal delay-${i % 3}`} ref={addToRefs}>
                  <div className="feature-icon"><Icon size={24} /></div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRICING ── */}
        <section id="pricing" className="section-pad pricing-section">
          <div className="container">
            <div className="section-heading reveal" ref={addToRefs}>
              <div className="section-badge">Pricing</div>
              <h2>Simple, transparent pricing</h2>
              <p>No hidden fees. No usage surprises. Cancel anytime.</p>
            </div>
            <div className="pricing-grid">
              {PLANS.map((plan) => (
                <div key={plan.name} className={`pricing-card reveal ${plan.highlight ? 'pricing-highlight' : ''}`} ref={addToRefs}>
                  {plan.highlight && <div className="pricing-popular">Most Popular</div>}
                  <div className="pricing-header">
                    <div className="plan-name">{plan.name}</div>
                    <div className="plan-price">{plan.price}</div>
                    <div className="plan-sub">{plan.sub}</div>
                  </div>
                  <ul className="plan-features">
                    {plan.features.map(f => (
                      <li key={f}><CheckCircle2 size={15} /> {f}</li>
                    ))}
                  </ul>
                  <button
                    className={plan.highlight ? 'btn-accent' : 'btn-secondary'}
                    style={{ width: '100%', justifyContent: 'center' }}
                    onClick={() => navigate('/auth')}
                  >
                    {plan.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── DOCS / FAQ ── */}
        <section id="docs" className="section-pad">
          <div className="container">
            <div className="section-heading reveal" ref={addToRefs}>
              <div className="section-badge">Docs</div>
              <h2>Frequently Asked Questions</h2>
              <p>Everything you need to know before you ship your first pipeline.</p>
            </div>
            <div className="faq-list">
              {FAQS.map((faq, i) => (
                <div key={i} className={`faq-item reveal ${openFaq === i ? 'open' : ''}`} ref={addToRefs}>
                  <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    {faq.q}
                    <ChevronDown size={18} className="faq-chevron" />
                  </button>
                  {openFaq === i && <p className="faq-answer">{faq.a}</p>}
                </div>
              ))}
            </div>

            {/* Docs links */}
            <div className="docs-links reveal" ref={addToRefs}>
              {[
                { title: 'Quick Start Guide', desc: 'Deploy your first pipeline in under 5 minutes.' },
                { title: 'CLI Reference', desc: 'Complete documentation for the acdyon CLI.' },
                { title: 'API Reference', desc: 'Integrate Acdyon Flow into your own tools.' },
                { title: 'Migration Guide', desc: 'Move from GitHub Actions, CircleCI, or Jenkins.' },
              ].map(d => (
                <a key={d.title} href="#docs" className="doc-card" onClick={e => e.preventDefault()}>
                  <div className="doc-card-title">{d.title} <ArrowRight size={14} /></div>
                  <div className="doc-card-desc">{d.desc}</div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section className="cta-banner reveal" ref={addToRefs}>
          <div className="cta-glow" />
          <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <h2>Ready to ship 10x faster?</h2>
            <p>Join thousands of engineering teams already using Acdyon Flow.</p>
            <button className="btn-accent" onClick={() => navigate('/auth')} style={{ marginTop: '32px' }}>
              Start for Free — no credit card needed <ArrowRight size={18} />
            </button>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="landing-footer">
          <div className="container">
            <div className="footer-grid">
              <div>
                <div className="logo" style={{ marginBottom: '12px' }}><div className="logo-dot" /> Acdyon Flow</div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.7 }}>The deployment platform built for<br />teams that move at speed.</p>
              </div>
              {[
                { title: 'Product', items: ['Features', 'Pricing', 'Changelog', 'Roadmap'] },
                { title: 'Developers', items: ['Documentation', 'API Reference', 'CLI', 'Status'] },
                { title: 'Company', items: ['About', 'Blog', 'Careers', 'Contact'] },
              ].map(col => (
                <div key={col.title}>
                  <div className="footer-col-title">{col.title}</div>
                  {col.items.map(item => <div key={item} className="footer-link">{item}</div>)}
                </div>
              ))}
            </div>
            <div className="footer-bottom">
              <p>© 2026 Acdyon Technologies. Engineered with care.</p>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
