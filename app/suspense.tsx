// app/suspense.tsx
'use client'

import { ReactNode } from 'react'

export default function SuspenseBoundary({ children }: { children: ReactNode }) {
  return <>{children}</>
}