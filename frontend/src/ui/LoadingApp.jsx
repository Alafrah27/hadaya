

import React from 'react'

function LoadingApp() {
  return (
    <div className='bg-primary-bg flex items-center justify-center h-screen'>
      <div className='animate-spin rounded-full h-14 w-14 border-b-4 border-t-4  border-red-600'></div>
    </div>
  )
}

export default LoadingApp