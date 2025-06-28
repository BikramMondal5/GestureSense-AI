import { RefreshCw } from "lucide-react"

interface LoadingStateProps {
  message?: string
}

export function LoadingState({ message = "Loading..." }: LoadingStateProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <div className="text-white text-center">
        <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
        <p>{message}</p>
      </div>
    </div>
  )
}