// client/components/TestComponent.tsx
import React from 'react'

const TestComponent = () => {
  return (
    <div>
      <div className="block bg-blue-500 p-4 text-white sm:hidden">
        Visible on mobile (smaller than 640px)
      </div>
      <div className="hidden bg-green-500 p-4 text-white sm:block">
        Visible on desktop (640px and above)
      </div>
    </div>
  )
}

export default TestComponent
