
import React from 'react'

export default function Banner({ image, alt }) {
  return (
    <div className="w-full px-6 max-w-7xl mx-auto my-4">
      <img src={image} alt={alt} className="w-full rounded-lg shadow-md" />
    </div>
  )
}
