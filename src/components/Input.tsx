import { Link } from 'react-router-dom'
import { blank_fn } from '../constants'
import React from 'react'

export function ClickTextLink({ text, to }: { text: string; to: string }) {
  return (
    <p className='tap95 cursor-pointer rounded-lg px-2 py-1 font-[450] text-accent active:bg-accent/20'>
      <Link to={to}>{text}</Link>
    </p>
  )
}

export function ClickText({ text, onClick = blank_fn }: { text: string; onClick?: any }) {
  return (
    <p
      className='tap95 cursor-pointer rounded-lg px-2 py-1 font-[450] text-accent active:bg-accent/20'
      onClick={onClick}
    >
      {text}
    </p>
  )
}

export default function Input({
  type = 'text',
  placeholder,
  value,
  onChange,
  className,
}: {
  type: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`${className} rounded-xl border-none bg-white/5 p-4.5 pl-6 text-sm tracking-widest outline-none`}
    />
  )
}
