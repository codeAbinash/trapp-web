import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { LoadingButton } from '../../components/Loading'
import { usePopupAlertContext } from '../../context/PopupAlertContext'
import { sendOtpSignup_f } from '../../lib/api'
import { validatePhone } from '../../lib/lib'
import transitions from '../../lib/transition'
import LoginWith from './components/LoginWith'
import MobileInput from './components/MobileInput'

export default function Register() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [isSendingOtp, setIsSendingOtp] = useState(false)
  const { newPopup } = usePopupAlertContext()
  const navigate = useNavigate()
  const state = useLocation().state as { phone: string; code: string; name: 'string' }

  useEffect(() => {
    if (state) {
      const { phone, code } = state
      setPhone(phone)
      setCode(code)
      setName(state.name)
    }
  }, [state])

  function handelRegister() {
    const user_name = name.trim()
    if (!user_name) return newPopup({ title: 'Enter Name', subTitle: 'Please enter your name.' })
    const phoneValidStatus = validatePhone(phone, code)
    if (!phoneValidStatus.status) return newPopup({ title: 'Invalid Number', subTitle: phoneValidStatus.message })
    sendOtp()
  }

  async function sendOtp() {
    setIsSendingOtp(true)
    const phone_f = phone.trim()
    const code_f = code.trim().replace('+', '')
    const name_f = name.trim()
    const res = await sendOtpSignup_f(phone_f, code_f, name_f)
    setIsSendingOtp(false)
    if (!res.status) return newPopup({ title: 'Error sending OTP', subTitle: res.message })
    transitions(() => navigate('/otp', { state: { phone, code, type: 'register', name }, replace: true }))()
  }

  return (
    <div className='h-dvh highlight-none flex select-none flex-col justify-between p-5'>
      <div className='mt-5 flex min-h-[20dvh] flex-grow items-center justify-center'>
        <img src='/AppIcons/full.png' className='logo-long w-1/2' />
      </div>

      <div className='flex w-full flex-grow flex-col items-center justify-center gap-5'>
        <div className='flex flex-col gap-2 pb-3'>
          <h1 className='text-[2rem] font-[450]'>Register</h1>
          <p className='-mt-2 text-sm'>Create a new account and learn martial arts and more fighting skills</p>
        </div>

        <div className='flex w-full flex-col gap-5'>
          <div>
            <p className='pb-2 pl-1 text-sm'>Full Name</p>
            <Input
              type='text'
              placeholder='Jone Doe'
              value={name || ''}
              onChange={(e) => {
                setName(e.target.value)
              }}
              className='w-full'
            />
          </div>
          <MobileInput code={code} setCode={setCode} phone={phone} setPhone={setPhone} enterFn={handelRegister} />
          {isSendingOtp ? (
            <LoadingButton text='Sending OTP' />
          ) : (
            <Button className='btn' onClick={handelRegister}>
              REGISTER
            </Button>
          )}
        </div>

        <LoginWith />
      </div>
      <div className='mt-2 flex flex-col items-center justify-center pb-5 text-center text-[0.9rem]'>
        <p className='bottom-text text-gray-400'>Already have an account?</p>
        <span
          className='tap95 bottom-link text-color active:bg-color/20 cursor-pointer rounded-lg px-2 py-1 font-[450]'
          onClick={transitions(() => navigate('/login', { replace: true, state: { phone, code } }))}
        >
          LOGIN
        </span>
      </div>
    </div>
  )
}
