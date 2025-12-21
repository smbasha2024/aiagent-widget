'use client'

import { useEffect, useRef, useState } from 'react'
import { ChatMessageProps } from '@/types'

interface ExtendedChatMessageProps extends ChatMessageProps {
  isMounted?: boolean
}

export default function ChatMessage({ 
  message, 
  isUser, 
  timestamp,
  isMounted = true 
}: ExtendedChatMessageProps) {
  const messageRef = useRef<HTMLDivElement>(null)
  const [formattedTime, setFormattedTime] = useState<string>('')

  useEffect(() => {
    if (isMounted && messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [isMounted])

  useEffect(() => {
    if (isMounted && timestamp) {
      // Use consistent time format to avoid hydration mismatch
      const time = new Date(timestamp)
      // Always use 24-hour format to match server
      const hours = time.getHours().toString().padStart(2, '0')
      const minutes = time.getMinutes().toString().padStart(2, '0')
      setFormattedTime(`${hours}:${minutes}`)
    }
  }, [timestamp, isMounted])

  return (
    <div
      ref={messageRef}
      style={{
        ...styles.messageContainer,
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        marginBottom: '20px',
      }}
    >
      {!isUser && (
        <div style={styles.avatar}>
          <div style={styles.botAvatar}>
            <svg style={styles.botIcon} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
        </div>
      )}

      <div
        style={{
          ...styles.messageBubble,
          backgroundColor: isUser ? '#2563eb' : '#f3f4f6',
          color: isUser ? 'white' : '#1f2937',
          borderTopRightRadius: isUser ? '4px' : '16px',
          borderTopLeftRadius: isUser ? '16px' : '4px',
          maxWidth: '80%',
        }}
      >
        <div style={styles.messageContent}>
          {message}
        </div>
        {formattedTime && (
          <div style={styles.timestamp}>
            {formattedTime}
          </div>
        )}
      </div>

      {isUser && (
        <div style={styles.avatar}>
          <div style={styles.userAvatar}>
            <svg style={styles.userIcon} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
        </div>
      )}
    </div>
  )
}

const styles = {
  messageContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '10px',
  } as const,
  avatar: {
    display: 'flex',
    alignItems: 'center',
  } as const,
  botAvatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#2563eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as const,
  userAvatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#10b981',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as const,
  botIcon: {
    width: '18px',
    height: '18px',
    color: 'white',
  } as const,
  userIcon: {
    width: '18px',
    height: '18px',
    color: 'white',
  } as const,
  messageBubble: {
    padding: '12px 16px',
    borderRadius: '16px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    wordBreak: 'break-word',
    position: 'relative' as const,
  } as const,
  messageContent: {
    fontSize: '14px',
    lineHeight: '1.5',
  } as const,
  timestamp: {
    fontSize: '11px',
    opacity: '0.7',
    marginTop: '4px',
    textAlign: 'right' as const,
  } as const,
}