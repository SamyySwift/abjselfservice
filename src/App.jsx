import { useState, useCallback } from 'react'
import Header from './components/Header.jsx'
import CarScene from './components/CarScene.jsx'
import CarSelector from './components/CarSelector.jsx'
import ColorPicker from './components/ColorPicker.jsx'
import FinishSelector from './components/FinishSelector.jsx'
import PPFToggle from './components/PPFToggle.jsx'
import BookingCTA from './components/BookingCTA.jsx'
import LandingPage from './components/LandingPage.jsx'

const DEFAULT_COLOR = { hex: '#000000', name: 'Obsidian Black' }
const DEFAULT_FINISH = 'gloss'
// view: 'landing' | 'selector' | 'configurator'

export default function App() {
  const [view, setView] = useState('landing') // 'landing' | 'selector' | 'configurator'
  const [selectedCar, setSelectedCar] = useState(null)
  const [carColor, setCarColor] = useState(DEFAULT_COLOR)
  const [finish, setFinish] = useState(DEFAULT_FINISH)
  const [ppfEnabled, setPpfEnabled] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const handleNavigate = useCallback((dest) => {
    if (dest === 'configurator') setView('selector')
    else if (dest === 'landing') { setView('landing'); setSelectedCar(null) }
  }, [])

  const handleCarSelect = useCallback((car) => {
    setSelectedCar(car)
    setIsLoaded(false)
    setCarColor(DEFAULT_COLOR)
    setFinish(DEFAULT_FINISH)
    setPpfEnabled(false)
    setView('configurator')
  }, [])

  const handleChangeCar = useCallback(() => {
    setSelectedCar(null)
    setIsLoaded(false)
    setView('selector')
  }, [])

  const handleColorChange = useCallback((colorObj) => { setCarColor(colorObj) }, [])
  const handleFinishChange = useCallback((f) => { setFinish(f) }, [])
  const handlePPFToggle = useCallback((val) => { setPpfEnabled(val) }, [])

  // ── Landing Screen ───────────────────────────────────────
  if (view === 'landing') {
    return <LandingPage onNavigate={handleNavigate} />
  }

  // ── Car Selection Screen ─────────────────────────────────
  if (view === 'selector') {
    return <CarSelector onSelect={handleCarSelect} onBack={() => setView('landing')} />
  }

  // ── Configurator Screen ──────────────────────────────────
  return (
    <div className="app-layout">
      <section className="configurator-section">
        {/* 3D Canvas */}
        <div className="canvas-wrapper">
          <CarScene
            modelUrl={selectedCar.modelUrl}
            carColor={carColor.hex}
            finish={finish}
            ppfEnabled={ppfEnabled}
            onLoaded={() => setIsLoaded(true)}
          />
        </div>

        {/* Controls */}
        <aside className="controls-panel" aria-label="Car configurator controls">
          <div className="panel-header">
            {/* Car title + change button */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
              <div>
                <div style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: selectedCar.accentColor, marginBottom: 4 }}>
                  {selectedCar.type}
                </div>
                <h2 className="panel-title">{selectedCar.name}</h2>
                <p className="panel-subtitle">Real-time 3D PPF & color configurator</p>
              </div>
              <button
                className="change-car-btn"
                onClick={handleChangeCar}
                id="change-car-btn"
                aria-label="Change selected car"
                title="Change car"
              >
                ← Change
              </button>
            </div>
          </div>

          {/* Color Picker */}
          <div className="panel-section animate-in" style={{ animationDelay: '0.1s' }}>
            <p className="section-label">Paint Color</p>
            <ColorPicker
              selected={carColor}
              onChange={handleColorChange}
            />
          </div>

          {/* Finish Selector */}
          <div className="panel-section animate-in" style={{ animationDelay: '0.2s' }}>
            <p className="section-label">Paint Finish</p>
            <FinishSelector
              selected={finish}
              onChange={handleFinishChange}
            />
          </div>

          {/* PPF Toggle */}
          <div className="panel-section animate-in" style={{ animationDelay: '0.3s' }}>
            <p className="section-label">Protection Film (PPF)</p>
            <PPFToggle
              enabled={ppfEnabled}
              onChange={handlePPFToggle}
            />
          </div>

        </aside>
      </section>
    </div>
  )
}
