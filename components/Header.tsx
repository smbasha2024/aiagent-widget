'use client'

import { useState } from 'react'
import { HeaderProps } from '@/types'

export default function Header({ 
  onNewChat, 
  onClose, 
  title = 'RICA', 
  subtitle = 'AI Assistant' 
}: HeaderProps) {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <header className="header" style={styles.header}>
      <div style={styles.leftSection}>
        <div style={styles.logoContainer}>
          <div style={styles.logoPlaceholder}>
            <div style={styles.logoIcon}>🤖</div>
          </div>
        </div>
        <div style={styles.titleSection}>
          <h1 style={styles.title}>{title}</h1>
          <span style={styles.subtitle}>{subtitle}</span>
        </div>
      </div>

      <div style={styles.buttonGroup}>
        <button
          onClick={onNewChat}
          style={{
            ...styles.button,
            ...styles.newChatButton,
            transform: isHovering ? 'translateY(-1px)' : 'none',
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          aria-label="Start new chat"
        >
          <svg style={styles.buttonIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Chat
        </button>

        <button
          onClick={onClose}
          style={{
            ...styles.button,
            ...styles.closeButton,
          }}
          aria-label="Close widget"
        >
          <svg style={styles.closeIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </header>
  )
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    backgroundColor: '#2563eb',
    color: 'white',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    borderTopLeftRadius: '12px',
    borderTopRightRadius: '12px',
  } as const,
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  } as const,
  logoContainer: {
    position: 'relative',
  } as const,
  logoPlaceholder: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    backgroundColor: 'rgba(255,255,255,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(10px)',
  } as const,
  logoIcon: {
    fontSize: '20px',
  } as const,
  titleSection: {
    display: 'flex',
    flexDirection: 'column',
  } as const,
  title: {
    fontSize: '20px',
    fontWeight: 700,
    letterSpacing: '-0.5px',
    lineHeight: '1',
  } as const,
  subtitle: {
    fontSize: '12px',
    opacity: '0.9',
    fontWeight: 400,
  } as const,
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  } as const,
  button: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 500,
    transition: 'all 0.2s ease',
  } as const,
  newChatButton: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    color: 'white',
    backdropFilter: 'blur(10px)',
  } as const,
  closeButton: {
    backgroundColor: 'transparent',
    color: 'white',
    padding: '8px',
    borderRadius: '8px',
  } as const,
  buttonIcon: {
    width: '16px',
    height: '16px',
  } as const,
  closeIcon: {
    width: '20px',
    height: '20px',
  } as const,
}