import { RefreshCw } from "lucide-react"

interface ComponentLoaderProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function ComponentLoader({ className = "", size = 'md' }: ComponentLoaderProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <RefreshCw className={`${sizeClasses[size]} animate-spin text-blue-500`} />
    </div>
  )
}