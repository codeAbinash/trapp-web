import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import headerIntersect from '../../lib/headerIntersect'
import { blank_fn } from '../../lib/util'

export function Header({ children, onclick = blank_fn }: { children?: React.ReactNode; onclick?: Function }) {
  const intersect = useRef<HTMLParagraphElement>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    headerIntersect(intersect.current as Element, setIsIntersecting)
  }, [])
  return (
    <>
      <p ref={intersect}></p>
      <div
        className={`sticky top-0 z-40 flex w-full items-center gap-2 bg-bg/90 px-3 py-3 backdrop-blur-lg ${
          isIntersecting ? '' : 'shadow-sm shadow-[#ffffff15]'
        }`}
      >
        <div
          className='tap95 mr-2 rounded-full p-3.5 active:bg-white/10'
          onClick={() => {
            if (onclick == blank_fn) navigate(-1)
            onclick()
          }}
        >
          <img src='/icons/other/arrow.svg' className='aspect-square w-[1.2rem] rotate-180' />
        </div>
        <div>{children}</div>
      </div>
    </>
  )
}
