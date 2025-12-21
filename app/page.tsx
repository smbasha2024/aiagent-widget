'use client'

import { Suspense } from 'react'
import ChatWidget from '@/components/ChatWidget'
import { WidgetConfig } from '@/types'

// Loading fallback
function LoadingWidget() {
  return (
    <div style={styles.container}>
      <div style={styles.loadingWidget}>
        <div style={styles.loadingSpinner}></div>
        <p style={styles.loadingText}>Loading chat widget...</p>
      </div>
    </div>
  )
}

export default function Home() {
  const widgetConfig: WidgetConfig = {
    title: 'RICA',
    subtitle: 'AI Assistant',
    primaryColor: '#2563eb',
    secondaryColor: '#10b981',
    initialMessage: "Hello! I'm RICA, your AI assistant. How can I help you today?",
    placeholder: "Ask me anything...",
  }

  const handleMessageSent = (message: string) => {
    console.log('Message sent:', message)
    // You can add analytics or other side effects here
  }

  const handleWidgetClose = () => {
    console.log('Widget closed')
    // Handle widget close logic
    if (typeof window !== 'undefined') {
      window.parent.postMessage({ type: 'WIDGET_CLOSED' }, '*')
    }
  }

  return (
    <Suspense fallback={<LoadingWidget />}>
      <div style={styles.container}>
        <ChatWidget 
          config={widgetConfig}
          onMessageSent={handleMessageSent}
          onWidgetClose={handleWidgetClose}
        />
      </div>
    </Suspense>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    padding: '2px',
  } as const,
  loadingWidget: {
    width: '400px',
    height: '600px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: '5px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
  } as const,
  loadingSpinner: {
    width: '40px',
    height: '40px',
    border: '3px solid #e5e7eb',
    borderTop: '3px solid #2563eb',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  } as const,
  loadingText: {
    marginTop: '16px',
    color: '#6b7280',
    fontSize: '14px',
  } as const,
}

// Add spinner animation
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style')
  styleSheet.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `
  document.head.appendChild(styleSheet)
}