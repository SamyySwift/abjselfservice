import { Shield } from 'lucide-react'

export default function Header() {
  return (
    <header className="app-header">
      <div className="header-logo">
        {/* Logo removed as requested */}
      </div>

      <nav className="header-nav" aria-label="Header navigation">
        <button
          className="header-cta-btn"
          id="header-book-btn"
          onClick={() => {
            document.getElementById('booking-cta-section')?.scrollIntoView({ behavior: 'smooth' })
          }}
          aria-label="Book PPF service"
        >
          Book PPF Service
        </button>
      </nav>
    </header>
  )
}
