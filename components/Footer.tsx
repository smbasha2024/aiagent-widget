'use client'

import { FooterProps } from '@/types'

export default function Footer({ 
  copyrightText = 'RICA AI', 
  showBetaTag = true,
  links = [
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Help', href: '#' },
  ]
}: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.copyright}>
          <span style={styles.text}>
            © {currentYear} {copyrightText}.
          </span>
          {showBetaTag && (
            <span style={styles.betaTag}>
              Beta
            </span>
          )}
        </div>
        <div style={styles.links}>
          {links.map((link, index) => (
            <span key={link.label}>
              <a href={link.href} style={styles.link}>{link.label}</a>
              {index < links.length - 1 && (
                <span style={styles.separator}>•</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </footer>
  )
}

const styles = {
  footer: {
    backgroundColor: '#f9fafb',
    borderTop: '1px solid #e5e7eb',
    padding: '12px 20px',
    borderBottomLeftRadius: '12px',
    borderBottomRightRadius: '12px',
  } as const,
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as const,
  copyright: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  } as const,
  text: {
    fontSize: '12px',
    color: '#6b7280',
    fontWeight: 400 as const,
  } as const,
  betaTag: {
    fontSize: '10px',
    backgroundColor: '#fef3c7',
    color: '#92400e',
    padding: '2px 6px',
    borderRadius: '12px',
    fontWeight: 600 as const,
  } as const,
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  } as const,
  link: {
    fontSize: '12px',
    color: '#6b7280',
    textDecoration: 'none',
    transition: 'color 0.2s',
  } as const,
  separator: {
    fontSize: '12px',
    color: '#d1d5db',
  } as const,
}