export default function FinishSelector({ selected, onChange }) {
  const FINISHES = [
    {
      id: 'gloss',
      name: 'Gloss',
      desc: 'Shiny, reflective, classic look',
    },
    {
      id: 'metallic',
      name: 'Metallic',
      desc: 'Sparkle flakes, premium finish',
    },
    {
      id: 'matte',
      name: 'Matte',
      desc: 'Flat, modern, stealthy aesthetic',
    },
  ]

  return (
    <div className="finish-options" role="group" aria-label="Paint finish options">
      {FINISHES.map((f) => (
        <div
          key={f.id}
          className={`finish-option ${selected === f.id ? 'active' : ''}`}
          onClick={() => onChange(f.id)}
          role="radio"
          aria-checked={selected === f.id}
          tabIndex={0}
          id={`finish-${f.id}`}
          onKeyDown={(e) => e.key === 'Enter' && onChange(f.id)}
        >
          <div className="finish-info">
            <div className="finish-name">{f.name}</div>
            <div className="finish-desc">{f.desc}</div>
          </div>
          <div className="finish-check" aria-hidden="true">
            {selected === f.id ? '✓' : ''}
          </div>
        </div>
      ))}
    </div>
  )
}
