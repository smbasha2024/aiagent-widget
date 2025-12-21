'use client'
import { useWidgetBridge, WidgetContext } from "@/hooks/useWidgetBridge";

import { useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from 'react'
import Header from './Header'
import ChatMessage from './ChatMessage'
import Footer from './Footer'
import { Message, ChatWidgetProps } from '@/types'

export default function ChatWidget({ 
  config = {},
  apiEndpoint,
  onMessageSent,
  onWidgetClose 
}: ChatWidgetProps) {
  
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: config.initialMessage || "Hello! I'm RICA, your AI assistant. How can I help you today?", 
      isUser: false,
      timestamp: new Date()
    },
  ])
  const [inputValue, setInputValue] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const { context, setContext } = useWidgetBridge();
  if (!context) {
    console.log("⏳ Waiting for widget context from parent...");
    return <div>Initializing widget…</div>;
  }
  console.log("✅ Widget context received:", context);


  const simulateAIResponse = (userMessage: string): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const responses = [
          `I understand your question about "${userMessage}". Based on my knowledge...`,
          `That's an interesting point about "${userMessage}"! Here's what I think...`,
          `Thanks for asking about "${userMessage}"! Let me provide some insights...`,
          `I can help with "${userMessage}"! Here's the information you're looking for...`,
          `Great question about "${userMessage}"! Let me break it down for you...`,
        ]
        resolve(responses[Math.floor(Math.random() * responses.length)])
      }, 1000)
    })
  }

  const handleSend = async (): Promise<void> => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: string = inputValue.trim()
    setInputValue('')
    
    // Add user message
    const newUserMessage: Message = {
      id: Date.now(),
      text: userMessage,
      isUser: true,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, newUserMessage])
    setIsLoading(true)

    // Callback for parent
    onMessageSent?.(userMessage)

    try {
      let aiResponse: string
      
      if (apiEndpoint) {
        // Real API call
        const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: userMessage })
        })
        const data = await response.json()
        aiResponse = data.response
      } else {
        // Simulated response
        aiResponse = await simulateAIResponse(userMessage)
      }

      const newAiMessage: Message = {
        id: Date.now() + 1,
        text: aiResponse,
        isUser: false,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, newAiMessage])
    } catch (error) {
      console.error('Error getting AI response:', error)
      
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: "Sorry, I'm having trouble connecting. Please try again.",
        isUser: false,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleNewChat = (): void => {
    setMessages([{
      id: 1,
      text: config.initialMessage || "Hello! I'm RICA, your AI assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }])
    setInputValue('')
  }

  const handleClose = (): void => {
    if (window.parent !== window) {
      window.parent.postMessage({ type: 'CLOSE_WIDGET' }, '*')
    }
    onWidgetClose?.()
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value)
  }

  return (
    <div style={styles.widget}>
      <Header 
        onNewChat={handleNewChat} 
        onClose={handleClose}
        title={config.title}
        subtitle={config.subtitle}
      />
      
      <main style={styles.chatContainer}>
        <div 
          className="hide-scrollbar"
          style={styles.messagesArea}
        >
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.text}
              isUser={message.isUser}
              timestamp={message.timestamp}
            />
          ))}
          
          {isLoading && (
            <div style={styles.loadingContainer}>
              <div style={styles.avatar}>
                <div style={styles.botAvatar}>
                  <svg style={styles.botIcon} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
              </div>
              <div style={styles.typingIndicator}>
                <div className="typing-dot" style={styles.typingDot}></div>
                <div className="typing-dot" style={styles.typingDot}></div>
                <div className="typing-dot" style={styles.typingDot}></div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <div style={styles.inputContainer}>
          <div style={styles.inputWrapper}>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder={config.placeholder || "Type your message here..."}
              disabled={isLoading}
              style={styles.input}
              aria-label="Chat input"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
              style={{
                ...styles.sendButton,
                opacity: (!inputValue.trim() || isLoading) ? 0.5 : 1,
                cursor: (!inputValue.trim() || isLoading) ? 'not-allowed' : 'pointer',
                backgroundColor: config.primaryColor || '#2563eb',
              }}
              aria-label="Send message"
            >
              <svg style={styles.sendIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          <div style={styles.inputHint}>
            Press Enter to send • Shift + Enter for new line
          </div>
        </div>
      </main>

      <Footer 
        copyrightText={config.title || 'RICA AI'}
      />
    </div>
  )
}

const styles = {
  widget: {
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100vh',
    maxHeight: '600px',
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
    overflow: 'hidden',
  } as const,
  chatContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    padding: '20px',
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  } as const,
  messagesArea: {
    flex: 1,
    overflowY: 'auto' as const,
    marginBottom: '20px',
  } as const,
  inputContainer: {
    paddingTop: '15px',
    borderTop: '1px solid #e5e7eb',
  } as const,
  inputWrapper: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  } as const,
  input: {
    flex: 1,
    padding: '14px 16px',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    fontSize: '14px',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'all 0.2s',
    backgroundColor: '#f9fafb',
  } as const,
  sendButton: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s',
  } as const,
  sendIcon: {
    width: '20px',
    height: '20px',
    color: 'white',
  } as const,
  inputHint: {
    fontSize: '11px',
    color: '#9ca3af',
    textAlign: 'center' as const,
    marginTop: '8px',
  } as const,
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px',
  } as const,
  typingIndicator: {
    display: 'flex',
    gap: '4px',
    padding: '12px 16px',
    backgroundColor: '#f3f4f6',
    borderRadius: '16px',
    borderTopLeftRadius: '4px',
  } as const,
  typingDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#9ca3af',
    animation: 'typing 1.4s infinite',
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
  botIcon: {
    width: '18px',
    height: '18px',
    color: 'white',
  } as const,
}

// Add CSS for typing animation
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style')
  styleSheet.textContent = `
    @keyframes typing {
      0%, 60%, 100% { transform: translateY(0); }
      30% { transform: translateY(-4px); }
    }
    
    .typing-dot:nth-child(1) { animation-delay: 0s; }
    .typing-dot:nth-child(2) { animation-delay: 0.2s; }
    .typing-dot:nth-child(3) { animation-delay: 0.4s; }
  `
  document.head.appendChild(styleSheet)
}