import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import { ClickText } from '../../components/Input'
import { LoadingButton } from '../../components/Loading'
import { usePopupAlertContext } from '../../context/PopupAlertContext'
import { verifyOtp_f } from '../../lib/api'
import transitions from '../../lib/transition'
import ls from '../../lib/util'
type InputRef = React.MutableRefObject<HTMLInputElement>

export default function OTP() {
  const navigate = useNavigate()
  const input1 = useRef<HTMLInputElement>(null)
  const input2 = useRef<HTMLInputElement>(null)
  const input3 = useRef<HTMLInputElement>(null)
  const input4 = useRef<HTMLInputElement>(null)
  const input5 = useRef<HTMLInputElement>(null)
  const input6 = useRef<HTMLInputElement>(null)
  const inputs: any = [input1, input2, input3, input4, input5, input6]
  const state = useLocation().state as { phone: string; code: string; type: 'login' | 'signup'; name: 'string' }
  const { phone, code } = state
  const [isVerifying, setIsVerifying] = useState(false)
  const { newPopup } = usePopupAlertContext()

  useEffect(() => {})

  async function verifyOtp(otp: string) {
    setIsVerifying(true)
    console.log(phone, code, otp, state.type)
    const res = await verifyOtp_f(phone, code, otp, state.type)
    setIsVerifying(false)
    if (!res.status) return newPopup({ title: 'Error verifying ', subTitle: res.message })
    ls.set('token', res.data.token)
    transitions(() => navigate('/home', { replace: true }))()
  }

  function handelSubmit() {
    if (isVerifying) return
    let otp = ''
    inputs.forEach((r: InputRef) => (otp += r.current.value))
    if (otp.length < 6) return newPopup({ title: 'Invalid OTP', subTitle: 'Please enter a valid OTP' })
    verifyOtp(otp)
    inputs[5].current?.blur()
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
        if (i == 5 && inputs.every((r: InputRef) => r.current.value)) handelSubmit()
        else i < 5 && inputs[i + 1].current?.focus()
      } else if (i == 5) if (nativeEvent.key == 'Enter') handelSubmit()
    },
    [inputs, verifyOtp],
  )
  return (
    <div className='highlight-none flex h-dvh select-none flex-col justify-between p-5'>
      <div className='flex flex-grow items-center justify-center pt-5'>
        <img src='/AppIcons/full.png' className='logo-long w-1/2' />
      </div>
      <div className='flex w-full flex-grow flex-col items-center justify-center gap-5'>
        <div className='flex flex-col gap-2 pb-3'>
          <h1 className='text-[2rem] font-[450]'>Verify OTP</h1>
          <p className='-mt-2 text-sm'>
            We have sent an OTP to your mobile number ends with {phone.slice(-4)}
            <span
              className='ml-1 cursor-pointer rounded-sm text-color active:bg-color/30'
              onClick={transitions(() => {
                navigate(`/${state.type}`, { state: { phone, code, name: state.name }, replace: true })
              })}
            >
              {' '}
              Edit Number?
            </span>
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
                className='no-input-arrow aspect-[0.9] w-full appearance-none rounded-xl border-none bg-white/10 text-center text-lg caret-transparent outline-none outline-offset-0 transition-[outline-color] placeholder:text-white/25 focus:outline-color'
              />
            )
          })}
        </div>
        <div className='flex w-full flex-col gap-5'>
          {isVerifying ? <LoadingButton text='Verifying OTP' /> : <Button onClick={handelSubmit}>VERIFY</Button>}
        </div>
        <div></div>
        <div></div>

        <div className='flex flex-col items-center justify-center pb-2 text-center text-sm'>
          <p className='bottom-text text-gray-300'>Don't receive the OTP?</p>
          <ClickText text='RESEND' />
        </div>
      </div>
      <div></div>
    </div>
  )
}
