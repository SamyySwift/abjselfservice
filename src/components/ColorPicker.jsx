import { useState } from 'react'

const PRESET_COLORS = [
  { hex: '#ffffff', name: 'Pearl White' },
  { hex: '#1a1a1a', name: 'Midnight Black' },
  { hex: '#c0c0c0', name: 'Silver Metallic' },
  { hex: '#b8860b', name: 'Champagne Gold' },
  { hex: '#8b0000', name: 'Deep Crimson' },
  { hex: '#002147', name: 'Oxford Navy' },
  { hex: '#005b5b', name: 'Racing Green' },
  { hex: '#ff4500', name: 'Blaze Orange' },
  { hex: '#4682b4', name: 'Steel Blue' },
  { hex: '#6a0dad', name: 'Royal Purple' },
  { hex: '#a52a2a', name: 'Burgundy' },
  { hex: '#2f4f4f', name: 'Slate Grey' },
]

export default function ColorPicker({ selected, onChange }) {
  const [showCustom, setShowCustom] = useState(false)

  const handleCustomColor = (e) => {
    const hex = e.target.value
    onChange({ hex, name: 'Custom Color' })
  }

  const handlePresetClick = (color) => {
    onChange(color)
  }

  return (
    <div>
      {/* Active color display */}
      <div className="color-name-display" role="status" aria-live="polite">
        <div
          className="color-name-dot"
          style={{ background: selected.hex }}
          aria-hidden="true"
        />
        <span className="color-name-text">{selected.name}</span>
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
          {selected.hex.toUpperCase()}
        </span>
      </div>

      {/* Preset swatches */}
      <div className="color-grid" role="group" aria-label="Color presets">
        {PRESET_COLORS.map((color) => (
          <button
            key={color.hex}
            className={`color-swatch ${selected.hex === color.hex ? 'active' : ''}`}
            style={{ background: color.hex }}
            onClick={() => handlePresetClick(color)}
            title={color.name}
            aria-label={`Select ${color.name}`}
            aria-pressed={selected.hex === color.hex}
          />
        ))}
      </div>

      {/* Custom color picker */}
      <div className="custom-color-row">
        <span className="custom-color-label">Custom:</span>
        <input
          id="custom-color-picker"
          type="color"
          className="custom-color-input"
          value={selected.hex}
          onChange={handleCustomColor}
          aria-label="Pick a custom color"
          title="Pick any custom color"
        />
        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          Click to pick any color
        </span>
      </div>
    </div>
  )
}
