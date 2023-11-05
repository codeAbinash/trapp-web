import { useCallback, useEffect, useRef } from 'react'
import Button from '../../components/Button'
import { ClickText } from '../../components/Input'
import { blank_fn } from '../../constants'
import { countryCode } from '../../lib/lib'
type InputRef = React.MutableRefObject<HTMLInputElement>

export default function OTP() {
  const input1 = useRef<HTMLInputElement>(null)
  const input2 = useRef<HTMLInputElement>(null)
  const input3 = useRef<HTMLInputElement>(null)
  const input4 = useRef<HTMLInputElement>(null)
  const input5 = useRef<HTMLInputElement>(null)
  const input6 = useRef<HTMLInputElement>(null)
  const inputs: any = [input1, input2, input3, input4, input5, input6]

  useEffect(() => {})

  function verifyOtp() {
    console.log('verify otp')
    countryCode().then((r) => console.log(r))
  }

  const handelKeydown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>, i: number) => {
      const nativeEvent = event.nativeEvent
      const target = nativeEvent.target as HTMLInputElement
      nativeEvent.preventDefault()
      // Limit to 1 character
      if (target.value.length > 0) target.value = target.value.slice(0, 1)
      if (nativeEvent.key === 'ArrowLeft') i > 0 && inputs[i - 1].current?.focus()
      else if (nativeEvent.key === 'ArrowRight') i < 5 && inputs[i + 1].current?.focus()
      else if (nativeEvent.key === 'Escape') inputs[i].current?.blur()
      else if (nativeEvent.key === 'Backspace') {
        target.value = ''
        i > 0 && inputs[i - 1].current?.focus()
      } else if (!isNaN(Number(nativeEvent.key))) {
        target.value = nativeEvent.key
        if (i == 5 && inputs.every((r: InputRef) => r.current.value)) verifyOtp()
        else i < 5 && inputs[i + 1].current?.focus()
      } else if (i == 5) if (nativeEvent.key == 'Enter') verifyOtp()
    },
    [inputs, verifyOtp],
  )
  return (
    <div className='h-dvh highlight-none flex select-none flex-col justify-between p-5'>
      <div className='flex flex-grow items-center justify-center pt-5'>
        <img src='/AppIcons/full.png' className='w-1/2' />
      </div>
      <div className='flex w-full flex-grow flex-col items-center justify-center gap-5'>
        <div className='flex flex-col gap-2 pb-3'>
          <h1 className='text-[2rem] font-[450]'>Verify OTP</h1>
          <p className='-mt-2 text-sm'>
            We have sent an OTP to your mobile number ends with 6870.
            <span className='ml-1 cursor-pointer rounded-sm text-accent active:bg-accent/30'> Edit Number?</span>
          </p>
        </div>
        <div></div>
        <div></div>
        <div className='phone-number flex items-center justify-center gap-2'>
          {inputs.map((r: any, i: number) => {
            return (
              <input
                type='number'
                ref={r}
                key={i}
                maxLength={1}
                onKeyDown={(event) => handelKeydown(event, i)}
                placeholder='0'
                className='no-input-arrow aspect-[0.9] w-full appearance-none rounded-xl border-none bg-white/10 text-center text-lg caret-transparent outline-none outline-offset-0 transition-[outline-color] placeholder:text-white/25 focus:outline-accent'
              />
            )
          })}
        </div>
        <div className='flex w-full flex-col gap-5'>
          <Button onClick={blank_fn}>CONFIRM</Button>
        </div>
        <div></div>
        <div></div>

        <div className='flex flex-col items-center justify-center pb-2 text-center text-sm'>
          <p className='text-gray-300'>Don't receive the OTP?</p>
          <ClickText text='RESEND' />
        </div>
      </div>
      <div></div>
    </div>
  )
}
