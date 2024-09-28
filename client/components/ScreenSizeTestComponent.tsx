// client/components/ScreenSizeTestComponent.tsx
import React from 'react'

const ScreenSizeTestComponent = () => {
  return (
    <div>
      {/* Base case: Mobile devices (smaller than 640px) */}
      <div className="block bg-blue-500 p-4 text-white sm:hidden">
        <p>Screen width: less than 640px</p>
        <p>Breakpoint: Default (no prefix)</p>
      </div>

      {/* Small screens (sm): 640px to 767px */}
      <div className="hidden bg-green-500 p-4 text-white sm:block md:hidden">
        <p>Screen width: 640px to 767px</p>
        <p>Breakpoint: sm</p>
      </div>

      {/* Medium screens (md): 768px to 1023px */}
      <div className="hidden bg-yellow-500 p-4 text-black md:block lg:hidden">
        <p>Screen width: 768px to 1023px</p>
        <p>Breakpoint: md</p>
      </div>

      {/* Large screens (lg): 1024px to 1279px */}
      <div className="hidden bg-orange-500 p-4 text-white lg:block xl:hidden">
        <p>Screen width: 1024px to 1279px</p>
        <p>Breakpoint: lg</p>
      </div>

      {/* Extra large screens (xl): 1280px to 1535px */}
      <div className="hidden bg-red-500 p-4 text-white xl:block 2xl:hidden">
        <p>Screen width: 1280px to 1535px</p>
        <p>Breakpoint: xl</p>
      </div>

      {/* 2XL screens (2xl): 1536px and up */}
      <div className="hidden bg-purple-500 p-4 text-white 2xl:block">
        <p>Screen width: 1536px and above</p>
        <p>Breakpoint: 2xl</p>
      </div>
    </div>
  )
}

export default ScreenSizeTestComponent
