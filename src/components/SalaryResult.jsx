import React, { useState, useEffect } from 'react';
import { learningResources } from '../data/learningData';

// --- DESIGN TOKENS ---
const THEME = {
  bg: '#F5F6F4',
  surface: '#FFFFFF',
  border: '#E2E5E0',
  borderStrong: '#CBD1C8',
  ink: '#12181A',
  inkMuted: '#5B6360',
  inkFaint: '#8E958F',
  signal: '#0B6E5C',
  signalDeep: '#08503F',
  signalSoft: '#E4F1EC',
  gold: '#9C6B14',
  goldSoft: '#F5EEDD',
  fontDisplay: "'Space Grotesk', 'Inter', system-ui, sans-serif",
  fontMono: "'IBM Plex Mono', 'SFMono-Regular', Menlo, Consolas, monospace",
  fontBody: "'Inter', -apple-system, system-ui, sans-serif",
};

const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@500;600&family=Inter:wght@400;500;600;700&display=swap');
.asc-path-card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
.asc-path-card:hover { transform: translateY(-4px); box-shadow: 0 16px 32px -12px rgba(18,24,26,0.18); }
.asc-path-btn { transition: opacity 0.15s ease; }
.asc-path-btn:hover { opacity: 0.82; }
`;

// --- HELPER: Generate Next Career Paths with Detailed Roadmaps ---
const getNextCareerPaths = (currentRole, currentMedian) => {
  const baseSalary = currentMedian || 1000000;
  const cleanRole = currentRole.replace('Junior ', '').replace('Senior ', '');

  return [
    {
      title: `Senior ${cleanRole}`,
      timeline: '2–3 years',
      salary: baseSalary * 1.4,
      tag: '01',
      tone: 'light',
      desc: 'Advanced technical execution and team mentoring.',
      roadmap: [
        { phase: 'Months 1–6', task: `Master advanced architectural concepts in ${cleanRole}` },
        { phase: 'Months 6–18', task: 'Lead high-impact cross-functional projects end-to-end' },
        { phase: 'Months 18–36', task: 'Mentor junior team members and drive code quality standards' }
      ]
    },
    {
      title: `Lead ${cleanRole}`,
      timeline: '4–6 years',
      salary: baseSalary * 1.8,
      tag: '02',
      tone: 'gold',
      desc: 'Architecture, technical direction, and project leadership.',
      roadmap: [
        { phase: 'Year 1', task: 'Own technical roadmap and system scalability strategy' },
        { phase: 'Year 2–3', task: 'Manage technical stakeholders and cross-team dependencies' },
        { phase: 'Year 4+', task: 'Establish engineering best practices across the entire organization' }
      ]
    },
    {
      title: 'Engineering / Tech Manager',
      timeline: '7+ years',
      salary: baseSalary * 2.3,
      tag: '03',
      tone: 'dark',
      desc: 'People management, strategic planning, and cross-team delivery.',
      roadmap: [
        { phase: 'Phase 1', task: 'Transition into people management and 1-on-1 coaching' },
        { phase: 'Phase 2', task: 'Manage team hiring, performance reviews, and department budget' },
        { phase: 'Phase 3', task: 'Align engineering deliverables with broader business goals' }
      ]
    }
  ];
};

// --- HELPER: Currency Formatter ---
const formatCurrency = (amount, currencyCode) => {
  if (!amount) return '';
  return new Intl.NumberFormat(currencyCode === 'INR' ? 'en-IN' : 'en-US', {
    style: 'currency',
    currency: currencyCode || 'USD',
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(amount);
};

const CARD_TONES = {
  light: { bg: THEME.signalSoft, ink: THEME.signalDeep, badgeBg: THEME.surface, btnBg: THEME.signal, btnText: '#ffffff', border: THEME.border },
  gold: { bg: THEME.goldSoft, ink: THEME.gold, badgeBg: THEME.surface, btnBg: THEME.gold, btnText: '#ffffff', border: THEME.border },
  dark: { bg: THEME.ink, ink: '#F5F6F4', badgeBg: 'rgba(255,255,255,0.08)', btnBg: THEME.signal, btnText: '#ffffff', border: 'transparent' },
};

const SalaryResult = ({ result }) => {
  const [animate, setAnimate] = useState(false);
  const [selectedPath, setSelectedPath] = useState(null); // State for opening the Modal

  useEffect(() => {
    if (result) {
      setAnimate(false);
      const timer = setTimeout(() => setAnimate(true), 150);
      return () => clearTimeout(timer);
    }
  }, [result]);

  if (!result) return null;

  const avgSalary = Math.round((result.medianSalary + result.maxSalary) / 2);
  const top10Salary = Math.round(result.maxSalary * 1.15);

  const gaugePoints = [
    { key: 'min', label: 'Your min', value: result.minSalary, dot: THEME.inkFaint, lift: 'down' },
    { key: 'median', label: 'Median', value: result.medianSalary, dot: THEME.signal, lift: 'up' },
    { key: 'avg', label: 'Average', value: avgSalary, dot: THEME.gold, lift: 'down' },
    { key: 'max', label: 'Your max', value: result.maxSalary, dot: THEME.inkMuted, lift: 'up' },
    { key: 'top10', label: 'Top 10%', value: top10Salary, dot: THEME.signalDeep, lift: 'up' },
  ];

  const scaleMax = top10Salary * 1.1 || 1;
  const pct = (v) => Math.min(97, Math.max(3, (v / scaleMax) * 100));

  const nextPaths = getNextCareerPaths(result.role, result.medianSalary);
  const resourceData = learningResources[result.role] || learningResources['default'];

  const fadeUpStyle = {
    opacity: animate ? 1 : 0,
    transform: animate ? 'translateY(0)' : 'translateY(30px)',
    transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
  };

  return (
    <div style={{ marginTop: '32px', fontFamily: THEME.fontBody }}>
      <style>{GLOBAL_CSS}</style>

      {/* 1. HEADLINE RANGE */}
      <div style={{
        ...fadeUpStyle,
        padding: '38px', backgroundColor: THEME.surface, borderRadius: '16px',
        border: `1px solid ${THEME.border}`, textAlign: 'center', marginBottom: '20px'
      }}>
        <div style={{
          fontFamily: THEME.fontMono, fontSize: '11px', fontWeight: 600, color: THEME.signal,
          letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '14px'
        }}>
          Your estimated range
        </div>
        <div style={{
          fontFamily: THEME.fontMono, fontSize: '38px', fontWeight: '600', color: THEME.ink,
          marginBottom: '10px', letterSpacing: '-0.01em'
        }}>
          <span>{formatCurrency(result.minSalary, result.currencyCode)}</span>
          <span style={{ color: THEME.inkFaint, margin: '0 12px' }}>—</span>
          <span>{formatCurrency(result.maxSalary, result.currencyCode)}</span>
        </div>
        <div style={{ fontSize: '15px', color: THEME.signal, fontWeight: '600' }}>
          Median · {formatCurrency(result.medianSalary, result.currencyCode)}
        </div>
      </div>

      {/* 2. CALIBRATION GAUGE */}
      <div style={{
        ...fadeUpStyle, transitionDelay: '0.1s',
        backgroundColor: THEME.surface, borderRadius: '16px', border: `1px solid ${THEME.border}`,
        padding: '36px 30px 26px', marginBottom: '20px'
      }}>
        <h3 style={{ fontFamily: THEME.fontDisplay, fontSize: '17px', fontWeight: '700', color: THEME.ink, marginBottom: '46px' }}>
          Market position gauge
        </h3>

        <div style={{ position: 'relative', height: '90px', margin: '0 6px' }}>
          <div style={{
            position: 'absolute', top: '45px', left: 0, right: 0, height: '6px',
            borderRadius: '4px', backgroundColor: THEME.bg, border: `1px solid ${THEME.border}`
          }} />
          <div style={{
            position: 'absolute', top: '45px', height: '6px', borderRadius: '4px',
            backgroundColor: THEME.signalSoft,
            left: `${pct(result.minSalary)}%`,
            width: `${Math.max(0, pct(result.maxSalary) - pct(result.minSalary))}%`,
            transition: 'width 1s cubic-bezier(0.16,1,0.3,1), left 1s cubic-bezier(0.16,1,0.3,1)',
            opacity: animate ? 1 : 0,
          }} />

          {gaugePoints.map((p) => (
            <div key={p.key} style={{
              position: 'absolute', top: p.lift === 'up' ? '0px' : '54px',
              left: `${pct(p.value)}%`, transform: 'translateX(-50%)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
              opacity: animate ? 1 : 0, transition: 'opacity 0.6s ease 0.4s'
            }}>
              {p.lift === 'up' && (
                <>
                  <span style={{ fontFamily: THEME.fontMono, fontSize: '12.5px', fontWeight: 600, color: THEME.ink, whiteSpace: 'nowrap' }}>
                    {formatCurrency(p.value, result.currencyCode)}
                  </span>
                  <span style={{ fontSize: '11px', color: THEME.inkFaint, whiteSpace: 'nowrap' }}>{p.label}</span>
                  <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: p.dot, border: '2px solid #fff', boxShadow: `0 0 0 1px ${THEME.border}` }} />
                </>
              )}
              {p.lift === 'down' && (
                <>
                  <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: p.dot, border: '2px solid #fff', boxShadow: `0 0 0 1px ${THEME.border}`, marginTop: '48px' }} />
                  <span style={{ fontSize: '11px', color: THEME.inkFaint, whiteSpace: 'nowrap' }}>{p.label}</span>
                  <span style={{ fontFamily: THEME.fontMono, fontSize: '12.5px', fontWeight: 600, color: THEME.ink, whiteSpace: 'nowrap' }}>
                    {formatCurrency(p.value, result.currencyCode)}
                  </span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 3. FREE STUDY MATERIAL & RESUME PREP SECTION */}
      <div style={{
        ...fadeUpStyle, transitionDelay: '0.15s',
        backgroundColor: THEME.surface, borderRadius: '16px', border: `1px solid ${THEME.border}`,
        padding: '36px 28px', marginBottom: '20px'
      }}>
        <h3 style={{ fontFamily: THEME.fontDisplay, fontSize: '17px', fontWeight: '700', color: THEME.ink, marginBottom: '20px' }}>
          🚀 How to unlock this salary
        </h3>

        {/* Free Courses */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: '600', color: THEME.inkMuted, marginBottom: '12px' }}>📚 Top Free Learning Resources</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {resourceData.courses.map((course, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', backgroundColor: THEME.bg, borderRadius: '10px', border: `1px solid ${THEME.border}` }}>
                <div>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: THEME.ink, display: 'block' }}>{course.title}</span>
                  <span style={{ fontSize: '12px', color: THEME.inkFaint }}>via {course.source}</span>
                </div>
                <button 
                  onClick={() => window.open(course.url, '_blank')}
                  style={{ 
                    padding: '8px 14px', backgroundColor: THEME.signal, color: '#fff', 
                    border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '600', 
                    cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: THEME.fontDisplay 
                  }}
                >
                  Start Learning →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ATS Keywords */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: '600', color: THEME.inkMuted, marginBottom: '10px' }}>📄 Must-Have Resume ATS Keywords</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {resourceData.keywords.map((keyword, idx) => (
              <span key={idx} style={{ padding: '6px 12px', backgroundColor: THEME.bg, color: THEME.ink, borderRadius: '6px', fontSize: '12.5px', fontWeight: '500', border: `1px solid ${THEME.border}` }}>
                {keyword}
              </span>
            ))}
          </div>
        </div>

        {/* Interview Questions */}
        <div>
          <h4 style={{ fontSize: '14px', fontWeight: '600', color: THEME.inkMuted, marginBottom: '10px' }}>🎙️ Top Interview Questions</h4>
          <ul style={{ paddingLeft: '20px', margin: 0, color: THEME.inkMuted, fontSize: '13.5px', lineHeight: '1.6', textAlign: 'left' }}>
            {resourceData.questions.map((question, idx) => (
              <li key={idx} style={{ marginBottom: '8px' }}>{question}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* 4. CAREER PATH EXPLORER */}
      <div style={{
        ...fadeUpStyle, transitionDelay: '0.2s',
        backgroundColor: THEME.surface, borderRadius: '16px', border: `1px solid ${THEME.border}`,
        padding: '36px 28px'
      }}>
        <h3 style={{ fontFamily: THEME.fontDisplay, fontSize: '17px', fontWeight: '700', color: THEME.ink, textAlign: 'center', marginBottom: '28px' }}>
          Figure out your next career move
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {nextPaths.map((path) => {
            const tone = CARD_TONES[path.tone];
            return (
              <div key={path.tag} className="asc-path-card" style={{
                border: `1px solid ${tone.border}`, borderRadius: '16px', padding: '24px',
                display: 'flex', flexDirection: 'column', backgroundColor: tone.bg,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '22px' }}>
                  <span style={{
                    fontFamily: THEME.fontMono, fontSize: '12px', fontWeight: 600, color: tone.ink,
                    backgroundColor: tone.badgeBg, borderRadius: '6px', padding: '5px 9px'
                  }}>
                    {path.tag}
                  </span>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: THEME.fontMono, fontSize: '20px', fontWeight: '600', color: tone.ink }}>
                      {formatCurrency(path.salary, result.currencyCode)}
                    </div>
                    <div style={{ fontSize: '12px', color: tone.ink, opacity: 0.65, marginTop: '4px' }}>
                      {path.timeline}
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ fontFamily: THEME.fontDisplay, fontSize: '16px', fontWeight: '700', color: tone.ink, margin: '0 0 8px 0' }}>
                    {path.title}
                  </h4>
                  <p style={{ fontSize: '13.5px', color: tone.ink, opacity: 0.75, margin: 0, lineHeight: '1.55' }}>
                    {path.desc}
                  </p>
                </div>

                {/* EXPLORE PATH BUTTON - OPENS MODAL */}
                <button 
                  onClick={() => setSelectedPath(path)}
                  className="asc-path-btn" 
                  style={{
                    width: '100%', padding: '12px', borderRadius: '10px', border: 'none',
                    backgroundColor: tone.btnBg, color: tone.btnText, fontWeight: '600', fontSize: '13.5px',
                    cursor: 'pointer', fontFamily: THEME.fontDisplay, marginTop: 'auto'
                  }}
                >
                  Explore path →
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- INTERACTIVE ROADMAP POPUP MODAL --- */}
      {selectedPath && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center',
          justifyContent: 'center', zIndex: 1000, padding: '20px', backdropFilter: 'blur(4px)'
        }}>
          <div style={{
            backgroundColor: '#ffffff', borderRadius: '20px', maxWidth: '550px',
            width: '100%', padding: '32px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
            position: 'relative', animation: 'asc-fade-up 0.3s ease'
          }}>
            {/* Close Button */}
            <button 
              onClick={() => setSelectedPath(null)}
              style={{
                position: 'absolute', top: '20px', right: '20px', background: '#F5F6F4',
                border: 'none', borderRadius: '50%', width: '32px', height: '32px',
                fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', color: '#12181A'
              }}
            >
              ✕
            </button>

            {/* Modal Content */}
            <div style={{ fontFamily: THEME.fontMono, fontSize: '12px', color: THEME.signal, fontWeight: '600', textTransform: 'uppercase', marginBottom: '8px' }}>
              Career Roadmap · {selectedPath.timeline}
            </div>
            <h2 style={{ fontFamily: THEME.fontDisplay, fontSize: '24px', fontWeight: '700', color: THEME.ink, margin: '0 0 8px 0' }}>
              {selectedPath.title}
            </h2>
            <p style={{ fontSize: '15px', color: THEME.inkMuted, marginBottom: '24px', fontWeight: '600' }}>
              Target Salary: <span style={{ color: THEME.signal, fontFamily: THEME.fontMono }}>{formatCurrency(selectedPath.salary, result.currencyCode)}</span>
            </p>

            <h4 style={{ fontSize: '15px', fontWeight: '700', color: THEME.ink, marginBottom: '16px' }}>
              🗺️ Step-by-Step Milestones
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
              {selectedPath.roadmap.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: '14px', padding: '14px', backgroundColor: THEME.bg, borderRadius: '12px', border: `1px solid ${THEME.border}` }}>
                  <div style={{ fontFamily: THEME.fontMono, fontSize: '12px', fontWeight: '700', color: THEME.signal, whiteSpace: 'nowrap' }}>
                    {step.phase}
                  </div>
                  <div style={{ fontSize: '13.5px', color: THEME.ink, lineHeight: '1.4' }}>
                    {step.task}
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setSelectedPath(null)}
              style={{
                width: '100%', padding: '14px', backgroundColor: THEME.ink, color: '#fff',
                border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: '700',
                cursor: 'pointer', fontFamily: THEME.fontDisplay
              }}
            >
              Got it, let's build this!
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default SalaryResult;