import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './StaffConnectOverlay.css';

export default function StaffConnectOverlay({ onClose }) {
  const [connectionState, setConnectionState] = useState('initiating'); // initiating, ringing, connected

  useEffect(() => {
    // Simulate connection flow
    const ringTimer = setTimeout(() => {
      setConnectionState('ringing');
    }, 1500);

    const connectTimer = setTimeout(() => {
      setConnectionState('connected');
    }, 4000);

    return () => {
      clearTimeout(ringTimer);
      clearTimeout(connectTimer);
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="staff-overlay"
    >
      <div className="staff-bg" onClick={onClose} />
      
      {/* Close button */}
      <button 
        className="staff-close-btn" 
        onClick={onClose}
        aria-label="Cancel Connection"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div className="staff-container">
        <motion.div 
          initial={{ scale: 0.9, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="staff-card"
        >
          <div className="staff-visual">
            <div className="staff-avatar-container">
              <div className="staff-avatar-rings">
                <motion.div 
                  className="staff-ring"
                  animate={{ 
                    scale: connectionState === 'connected' ? 1.1 : [1, 1.5, 1], 
                    opacity: connectionState === 'connected' ? 0.2 : [0.5, 0, 0.5] 
                  }}
                  transition={{ duration: 2, repeat: connectionState === 'connected' ? 0 : Infinity, ease: 'easeInOut' }}
                />
                <motion.div 
                  className="staff-ring delay"
                  animate={{ 
                    scale: connectionState === 'connected' ? 1.3 : [1, 1.8, 1], 
                    opacity: connectionState === 'connected' ? 0.1 : [0.3, 0, 0.3] 
                  }}
                  transition={{ duration: 2, repeat: connectionState === 'connected' ? 0 : Infinity, ease: 'easeInOut', delay: 0.4 }}
                />
              </div>
              <div className="staff-avatar">
                {connectionState === 'connected' ? (
                  <img src="/staff_connect.png" alt="Staff Member" className="staff-image" />
                ) : (
                  <div className="staff-placeholder">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                )}
              </div>
            </div>
            
            <div className="staff-status-indicator">
              <span className={`status-dot ${connectionState}`}></span>
              <span className="status-text">
                {connectionState === 'initiating' && 'SECURE CONNECTION...'}
                {connectionState === 'ringing' && 'WAITING FOR AGENT...'}
                {connectionState === 'connected' && 'CONNECTED SECURELY'}
              </span>
            </div>
          </div>

          <div className="staff-details">
            <h2 className="staff-title">
              {connectionState === 'connected' ? 'CHIDI OKAFOR' : 'CONCIERGE'}
            </h2>
            <p className="staff-role">
              {connectionState === 'connected' ? 'Senior Sales Executive' : 'AbujaCar Support Team'}
            </p>

            <AnimatePresence mode="wait">
              {connectionState === 'connected' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="staff-actions"
                >
                  <button className="staff-action-btn primary">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    Voice Call
                  </button>
                  <button className="staff-action-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                    Live Chat
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
