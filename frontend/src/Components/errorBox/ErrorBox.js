import React from 'react'
import './ErrorBox.css'

export default function ErrorBox({errorText}) {
  return (
    <div>
      
        <h2 className='error-text'>{errorText}</h2>
    </div>
  )
}
