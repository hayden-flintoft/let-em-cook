import React from 'react'

const SearchFooter: React.FC = () => {
  return (
    <div className="container mx-auto p-8 text-center text-white">
      <p>
        &copy; {new Date().getFullYear()} Your App Name. All rights reserved.
      </p>
    </div>
  )
}

export default SearchFooter
