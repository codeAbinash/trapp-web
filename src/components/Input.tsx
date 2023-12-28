import { Link, useNavigate } from 'react-router-dom'
import { blank_fn } from '../constants'
import React from 'react'
import transitions from '../lib/transition'

export function ClickTextLink({ text, to }: { text: string; to: string }) {
  const navigate = useNavigate()

  return (
    <p className='tap95 bottom-link text-color active:bg-color/20 cursor-pointer rounded-lg px-2 py-1 font-[450]'>
      <span
        onClick={transitions(() =>
          navigate(to, {
            replace: true,
          }),
        )}
      >
        {text}
      </span>
    </p>
  )
}

export function ClickText({ text, onClick = blank_fn }: { text: string; onClick?: any }) {
  return (
    <p className='tap95 text-color active:bg-color/20 cursor-pointer rounded-lg px-2 py-1 font-[450]' onClick={onClick}>
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
  inputRef,
  onKeyDown = blank_fn,
}: {
  type: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  inputRef?: React.RefObject<HTMLInputElement>
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`${className} p-4.5 rounded-xl border-none bg-white/5 pl-6 text-sm tracking-[1px] outline-none`}
      ref={inputRef}
      onKeyDown={onKeyDown}
    />
  )
}
