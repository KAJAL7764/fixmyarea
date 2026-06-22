import { useState, useEffect } from 'react';
import './HowItWorks.css';

const STEPS = [
  {
    id: 1,
    title: 'Detect your location',
    desc: 'Browser GPS locks onto your exact coordinates. The map auto-centers. Tap any spot to fine-tune the pin location.',
  },
  {
    id: 2,
    title: 'Choose issue type & add photo',
    desc: 'Pick from 6 categories. Upload a real photo — Cloudinary compresses and stores it. Evidence makes your report 3× more likely to be resolved.',
  },
  {
    id: 3,
    title: 'Submit & track live',
    desc: 'Your report hits the Node.js REST API, saves to MongoDB, and appears on the live map instantly. You get notified at every status change.',
  },
  {
    id: 4,
    title: 'Issue gets resolved',
    desc: 'Authorities update status. Your pin turns green. You earn points on the leaderboard. The city gets better — block by block.',
  },
];

const ISSUE_TYPES = [
  { emoji: '🕳️', label: 'Pothole' },
  { emoji: '🗑️', label: 'Garbage' },
  { emoji: '💧', label: 'Water' },
  { emoji: '💡', label: 'Light' },
  { emoji: '🚦', label: 'Traffic' },
  { emoji: '🌊', label: 'Drain' },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const [phoneProgress, setPhoneProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length);
      setPhoneProgress((prev) => (prev + 1) % 3);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="how-it-works">
      <div className="section-inner">
        <span className="section-tag">How it works</span>
        <h2 className="section-h">Report in 3 steps.<br />Track until fixed.</h2>

        <div className="hiw-grid">
          <div className="steps-list">
            {STEPS.map((step, idx) => (
              <div
                key={step.id}
                className={`step ${activeStep === idx ? 'active' : ''}`}
                onClick={() => setActiveStep(idx)}
              >
                <div className="step__number">
                  {String(step.id).padStart(2, '0')}
                </div>
                <div className="step__body">
                  <div className="step__title">{step.title}</div>
                  <p className="step__desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="phone-mockup">
            <div className="phone-mockup__screen">
              <div className="phone-mockup__header">
                <span className="phone-mockup__title">New Report</span>
                <div className="phone-mockup__progress">
                  <div className={`phone-mockup__progress-dot ${phoneProgress >= 0 ? 'on' : ''}`} />
                  <div className={`phone-mockup__progress-dot ${phoneProgress >= 1 ? 'on' : ''}`} />
                  <div className={`phone-mockup__progress-dot ${phoneProgress >= 2 ? 'on' : ''}`} />
                </div>
              </div>

              <div className="phone-mockup__body">
                <div className="phone-mockup__map">
                  📍
                  <div className="phone-mockup__map-label">
                    <span>📍</span>
                    <span>Sector 14, Delhi</span>
                  </div>
                </div>

                <div className="phone-mockup__types">
                  {ISSUE_TYPES.map((type, idx) => (
                    <div
                      key={type.emoji}
                      className={`phone-mockup__type ${idx === 0 ? 'on' : ''}`}
                    >
                      <span className="phone-mockup__type-emoji">{type.emoji}</span>
                      <span>{type.label}</span>
                    </div>
                  ))}
                </div>

                <input
                  type="text"
                  className="phone-mockup__input"
                  placeholder="Describe the issue briefly..."
                  readOnly
                />

                <button className="phone-mockup__submit">
                  📤 Submit report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}