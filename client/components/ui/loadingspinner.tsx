import React from 'react'
import { Loader2 } from 'lucide-react'

const LoadingSpinner = ({ size = 24, color = '#9E3700' }) => {
  return (
    <div className="mx-auto my-20 flex items-center justify-center">
      <Loader2 className={`animate-spin ${color}`} size={size} />
    </div>
  )
}

export default LoadingSpinner
