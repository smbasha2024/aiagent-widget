// Message type
export interface Message {
  id: number
  text: string
  isUser: boolean
  timestamp?: Date
}

// Widget configuration
export interface WidgetConfig {
  title?: string
  subtitle?: string
  primaryColor?: string
  secondaryColor?: string
  initialMessage?: string
  placeholder?: string
}

// Header props
export interface HeaderProps {
  onNewChat: () => void
  onClose: () => void
  title?: string
  subtitle?: string
}

// ChatMessage props
export interface ChatMessageProps {
  message: string
  isUser: boolean
  timestamp?: Date
}

// Footer props
export interface FooterProps {
  copyrightText?: string
  showBetaTag?: boolean
  links?: Array<{
    label: string
    href: string
  }>
}

// ChatWidget props
export interface ChatWidgetProps {
  config?: WidgetConfig
  apiEndpoint?: string
  onMessageSent?: (message: string) => void
  onWidgetClose?: () => void
}