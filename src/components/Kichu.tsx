import React from 'react'
import { blank_fn } from '../constants'

export default function Kichu({ text = 'Sample', onClick = blank_fn }: { text?: string; onClick: any }) {
  return (
    <div>
      <h1 className='text-base font-normal text-accent'>{text}</h1>
    </div>
  )
}
