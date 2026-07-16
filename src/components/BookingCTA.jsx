import { MessageCircle, Share2, Shield } from 'lucide-react'

export default function BookingCTA({ carName, carColor, finish, ppfEnabled }) {
  const whatsappMessage = encodeURIComponent(
    `Hi! I'd like to book a PPF service for my car.\n\n` +
    `My configuration from the 3D Studio:\n` +
    `• Vehicle: ${carName || 'My Car'}\n` +
    `• Color: ${carColor}\n` +
    `• Finish: ${finish.charAt(0).toUpperCase() + finish.slice(1)}\n` +
    `• PPF: ${ppfEnabled ? 'Yes — Full Coverage PPF' : 'Not yet — please advise'}\n\n` +
    `Can you help me book an appointment?`
  )

  const whatsappUrl = `https://wa.me/2348000000000?text=${whatsappMessage}`

  return (
    <div className="booking-cta" id="booking-cta-section">
      <div className="booking-card">
        <h3 className="booking-title">
          <Shield size={18} strokeWidth={2} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6, color: 'var(--accent-primary)' }} />
          Ready to protect your car?
        </h3>
        <p className="booking-subtitle">
          Your configuration is saved. Book your PPF appointment at Abuja Cars and our experts will bring your vision to life.
        </p>

        <button
          className="booking-btn"
          id="whatsapp-book-btn"
          onClick={() => window.open(whatsappUrl, '_blank', 'noopener,noreferrer')}
          aria-label="Book PPF service via WhatsApp"
        >
          <span className="booking-btn-icon"><MessageCircle size={18} strokeWidth={2} /></span>
          Book via WhatsApp
        </button>

        <button
          className="booking-secondary-btn"
          id="share-config-btn"
          onClick={() => {
            const url = window.location.href
            if (navigator.share) {
              navigator.share({ title: 'My Abuja Cars Config', url })
            } else {
              navigator.clipboard.writeText(url).then(() => alert('Link copied to clipboard!'))
            }
          }}
          aria-label="Share your car configuration"
        >
          <Share2 size={15} strokeWidth={2} />
          Share My Configuration
        </button>
      </div>
    </div>
  )
}
