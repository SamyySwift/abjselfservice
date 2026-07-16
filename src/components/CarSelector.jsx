import { useState } from 'react'
import { Car, Zap } from 'lucide-react'

export const CAR_CATALOG = [
  {
    id: 'supercar',
    name: 'Supercar',
    type: 'Exotic Performance',
    category: 'sports',
    modelUrl: '/models/ferrari.glb',
    description: 'Aggressive lines, mid-mounted engine, and breathtaking performance. The ultimate driving machine.',
    specs: { seats: 2, origin: 'Italy', class: 'Supercar' },
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&q=80&auto=format&fit=crop',
    accentColor: '#374151',
    cameraPos: [4.5, 1.8, 4.5],
    scale: 1.0,
    yOffset: -0.05,
  },
  {
    id: 'sedan',
    name: 'Luxury Sedan',
    type: 'Executive',
    category: 'sedan',
    modelUrl: '/models/sedan.glb',
    description: 'Timeless style meets everyday practicality. A refined choice for executive and family use.',
    specs: { seats: 5, origin: 'Japan', class: 'Executive' },
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80&auto=format&fit=crop',
    accentColor: '#374151',
    cameraPos: [3.5, 1.5, 3.5],
    scale: 1.0,
    yOffset: -0.05,
  },
  {
    id: 'suv',
    name: 'Premium SUV',
    type: 'Luxury SUV',
    category: 'suv',
    modelUrl: '/models/suv.glb',
    description: 'Commanding presence, premium interior, and go-anywhere capability.',
    specs: { seats: 5, origin: 'UK', class: 'Luxury SUV' },
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&q=80&auto=format&fit=crop',
    accentColor: '#374151',
    cameraPos: [5, 2.5, 5],
    scale: 1.0,
    yOffset: -0.5,
  },

  {
    id: 'coupe',
    name: 'Mclaren',
    type: 'Performance',
    category: 'sports',
    modelUrl: '/models/mclaren.glb',
    description: 'Sleek two-door design engineered for the ultimate driving experience.',
    specs: { seats: 2, origin: 'Germany', class: 'Coupe' },
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80&auto=format&fit=crop',
    accentColor: '#374151',
    cameraPos: [4.5, 1.8, 4.5],
    scale: 1.0,
    yOffset: -0.05,
  }
]

const CATEGORY_FILTERS = [
  { id: 'all', label: 'All Vehicles', icon: <Car size={13} /> },
  { id: 'sports', label: 'Sports', icon: <Zap size={13} /> },
  { id: 'suv', label: 'SUV', icon: <Car size={13} /> },
  { id: 'sedan', label: 'Sedan', icon: <Car size={13} /> },
]

export default function CarSelector({ onSelect, onBack }) {
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all'
    ? CAR_CATALOG
    : CAR_CATALOG.filter(c => c.category === filter)

  return (
    <div className="car-selector-overlay">
      <div className="selector-content">
        {/* Header */}
        <div className="selector-header">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 24 }}>
            {onBack && (
              <button
                className="change-car-btn"
                onClick={onBack}
                id="back-to-home-btn"
                aria-label="Back to home"
              >
                ← Home
              </button>
            )}
          </div>
          <h1 className="selector-title">
            Select Your Vehicle.
          </h1>
          <p className="selector-subtitle">
            Begin the real-time 3D color & PPF visualization
          </p>
        </div>

        {/* Category Filter */}
        <div className="selector-filters" role="group" aria-label="Filter cars by type">
          {CATEGORY_FILTERS.map(f => (
            <button
              key={f.id}
              className={`filter-chip ${filter === f.id ? 'active' : ''}`}
              onClick={() => setFilter(f.id)}
              id={`filter-${f.id}`}
            >
              {f.icon}
              {f.label}
            </button>
          ))}
        </div>

        {/* Car Grid */}
        <div className="car-grid" role="list">
          {filtered.map((car, i) => (
            <div
              key={car.id}
              className="car-selection-card"
              style={{ animationDelay: `${i * 0.08}s` }}
              onClick={() => onSelect(car)}
              role="listitem"
              tabIndex={0}
              id={`car-card-${car.id}`}
              onKeyDown={e => e.key === 'Enter' && onSelect(car)}
              aria-label={`Select ${car.name}`}
            >
              <div className="car-selection-bg">
                <img src={car.image} alt="" className="car-selection-img" />
                <div className="car-selection-overlay" />
              </div>
              <div className="car-selection-content">
                <h3 className="car-selection-title">{car.name}</h3>
                <p className="car-selection-desc">{car.type}</p>
                <div className="car-selection-arrow">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
