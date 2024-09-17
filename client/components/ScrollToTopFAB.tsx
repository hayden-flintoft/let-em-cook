import React, { useState, useEffect } from 'react'

// Utility function to throttle events
const throttle = (func: (...args: any[]) => void, limit: number) => {
  let inThrottle: boolean
  return function (this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

const ScrollToTopFAB: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  // Toggle button visibility based on scroll position
  const toggleVisibility = () => {
    if (
      document.documentElement.scrollTop > 300 || // For most modern browsers
      document.body.scrollTop > 300 // Fallback for older browsers
    ) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  // Scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    // Add throttled scroll event listener
    const throttledToggleVisibility = throttle(toggleVisibility, 200)
    window.addEventListener('scroll', throttledToggleVisibility)

    return () => {
      window.removeEventListener('scroll', throttledToggleVisibility)
    }
  }, [])

  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 rounded-full bg-[#9E3700] p-4 shadow-lg hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-white"
          aria-label="Scroll to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </div>
  )
}

export default ScrollToTopFAB
