import { Shield, ShieldCheck } from 'lucide-react'

export default function PPFToggle({ enabled, onChange }) {
  return (
    <div className="ppf-section">
      <div className="ppf-row">
        <div className="ppf-label-group">
          <div className="ppf-label">
            Paint Protection Film
            <span className="ppf-label-badge">PPF</span>
          </div>
          <div className="ppf-sub">Visualize the protective coating effect</div>
        </div>

        <label className="toggle-switch" aria-label="Toggle PPF protection layer">
          <input
            id="ppf-toggle"
            type="checkbox"
            checked={enabled}
            onChange={(e) => onChange(e.target.checked)}
            role="switch"
            aria-checked={enabled}
          />
          <span className="toggle-slider" />
        </label>
      </div>

      {/* Info card — always visible, more prominent when enabled */}
      <div
        className="ppf-info-card"
        style={{
          opacity: enabled ? 1 : 0.6,
          transition: 'opacity 0.3s ease',
          borderColor: enabled ? 'var(--accent-primary)' : 'rgba(255,255,255,0.08)',
        }}
      >
        <div className="ppf-info-title">
          <span className="ppf-title-icon" aria-hidden="true">
            {enabled
              ? <ShieldCheck size={15} strokeWidth={2.5} style={{ color: 'var(--accent-primary)' }} />
              : <Shield size={15} strokeWidth={2} style={{ color: 'var(--text-muted)' }} />
            }
          </span>
          {enabled ? 'PPF Layer Active' : 'What is PPF?'}
        </div>
        <p className="ppf-info-text">
          {enabled
            ? 'Your car is showing the high-gloss PPF finish. The film adds a protective layer that enhances shine and shields against scratches, stone chips, and UV damage.'
            : 'Paint Protection Film (PPF) is a transparent, self-healing polymer film applied to your car\'s exterior to protect the paint from damage while enhancing gloss.'}
        </p>
        <div className="ppf-benefits">
          {['Self-Healing', 'UV Protection', 'Stone Chip Guard', '10yr Warranty'].map((b) => (
            <span key={b} className="ppf-benefit-tag">{b}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
