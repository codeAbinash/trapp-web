import { blank_fn } from '../constants'

export default function Button({ onClick = blank_fn, children }: { onClick: any; children?: React.ReactNode }) {
  return (
    <button
      className='highlight-transparent tap99 w-full select-none rounded-xl bg-accent p-[1.1rem] text-sm font-[450] text-white'
      onClick={onClick}
    >
      {children}
    </button>
  )
}
