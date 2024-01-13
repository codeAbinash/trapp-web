import { motion } from 'framer-motion'
import { forwardRef } from 'react'
import { blank_fn } from '../constants'
import { useNavigate } from 'react-router-dom'
import transitions from '../lib/transition'
import { cn } from '@/lib/utils'

// export default function Button({ onClick = blank_fn, children }: { onClick: any; children?: React.ReactNode }) {
//   return (
//     <button
//       className='highlight-transparent button-full tap99 w-full select-none rounded-xl bg-color p-[1.1rem] text-sm font-[450] text-white'
//       onClick={onClick}
//     >
//       {children}
//     </button>
//   )
// }

type ButtonProps = {
  children: React.ReactNode
  className?: string
  to?: string
  disabled?: boolean
  onClick?: Function
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { children, className, to, onClick, disabled, ...rest } = props
  const navigate = useNavigate()

  return (
    <motion.button
      className={cn(
        'button-full highlight-none w-full max-w-lg cursor-pointer select-none rounded-xl bg-color p-4 text-center text-sm text-white ' +
          className,
      )}
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400 }}
      onClick={() => {
        if (to) {
          transitions(() => {
            navigate(to)
          })()
        }
        if (onClick) {
          onClick()
        }
      }}
      ref={ref}
      disabled={disabled}
      {...rest}
    >
      {children}
    </motion.button>
  )
})

export default Button
