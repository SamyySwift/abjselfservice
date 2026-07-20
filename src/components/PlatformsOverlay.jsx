import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QRCode from 'react-qr-code';
import './PlatformsOverlay.css';

const PLATFORMS = [
  { id: 'instagram', label: 'Instagram', link: 'https://www.instagram.com/abujacar?igsh=OXVkYjdlc2F5bjFi' },
  { id: 'tiktok', label: 'TikTok', link: 'https://www.tiktok.com/@abujacar/video/7083636486091869446?_r=1&_t=ZS-98By4wxGF3l' },
  { id: 'facebook', label: 'Facebook', link: 'https://www.facebook.com/abujacar' },
];

export default function PlatformsOverlay({ onClose }) {
  const [selectedPlatform, setSelectedPlatform] = useState(null);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="platforms-overlay"
    >
      <div className="platforms-bg" onClick={onClose} />
      
      {/* Close button */}
      <button 
        className="platforms-close-btn" 
        onClick={onClose}
        aria-label="Close platforms"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div className="platforms-container">
        <div className="platforms-list">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="platforms-title">OUR PLATFORMS</h2>
            <p className="platforms-subtitle">Scan to follow our channels</p>
          </motion.div>

          <div className="platforms-items">
            {PLATFORMS.map((platform, idx) => (
              <motion.div 
                key={platform.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="platform-item-wrapper"
              >
                <div 
                  className={`platform-item ${selectedPlatform?.id === platform.id ? 'active' : ''}`}
                  onClick={() => setSelectedPlatform(selectedPlatform?.id === platform.id ? null : platform)}
                >
                  <span className="platform-index">0{idx + 1}</span>
                  <span className="platform-name">{platform.label}</span>
                  <motion.div 
                    className="platform-arrow"
                    animate={{ rotate: selectedPlatform?.id === platform.id ? 45 : 0 }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </motion.div>
                </div>

                <AnimatePresence>
                  {selectedPlatform?.id === platform.id && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="platform-qr-container"
                    >
                      <div className="platform-qr-content">
                        <div className="qr-wrapper">
                          <QRCode 
                            value={platform.link} 
                            size={160}
                            bgColor="#ffffff"
                            fgColor="#000000"
                            level="Q"
                          />
                        </div>
                        <div className="qr-info">
                          <p>Scan with your phone's camera</p>
                          <a href={platform.link} target="_blank" rel="noopener noreferrer" className="qr-link">
                            Open Link ↗
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
