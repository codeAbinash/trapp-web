import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { forwardRef } from 'react'
import { useNavigate } from 'react-router-dom'
import transitions from '../lib/transition'

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
        `button-full highlight-none w-full max-w-lg cursor-pointer select-none rounded-xl ${
          disabled ? 'bg-white/10' : 'bg-color'
        } p-4 text-center text-sm text-white ${className}`,
      )}
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400 }}
      onClick={(e) => {
        if (to) transitions(() => navigate(to))()
        if (onClick) onClick(e)
      }}
      ref={ref}
      disabled={disabled}
      {...rest}
    >
      {children}
    </motion.button>
  )
})
export const NormalButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { children, className, onClick, disabled, ...rest } = props

  return (
    <motion.button
      className={cn(
        `button-full highlight-none w-full max-w-lg cursor-pointer select-none rounded-xl ${
          disabled ? 'bg-white/10' : 'bg-color'
        } p-4 text-center text-sm text-white ${className}`,
      )}
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400 }}
      onClick={(e) => {
        if (onClick) onClick(e)
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
