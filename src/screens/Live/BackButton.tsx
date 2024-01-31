import transitions from '@/lib/transition'
import { useNavigate } from 'react-router-dom'

export default function BackButton({ show }: { show: boolean }) {
  const navigate = useNavigate()

  if (!show) return null

  return (
    <div
      className='tap95 fixed left-2 top-2 z-10 mr-2 rounded-full p-3.5 active:bg-white/10'
      onClick={(e) => {
        console.log('clicked')
        e.stopPropagation()
        transitions(() => navigate(-1))()
      }}
    >
      <img src='/icons/other/arrow.svg' className='aspect-square w-[1.1rem] rotate-180' />
    </div>
  )
}
