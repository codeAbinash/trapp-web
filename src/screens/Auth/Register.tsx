import { useState } from 'react'
import Button from '../../components/Button'
import Input, { ClickTextLink } from '../../components/Input'
import { blank_fn } from '../../constants'
import MobileInput from './components/MobileInput'
import LoginWith from './components/LoginWith'
import { usePopupAlertContext } from '../../context/PopupAlertContext'
import transitions from '../../lib/transition'
import { validatePhone } from '../../lib/lib'
import { sendOtpSignup } from '../../lib/api'
import { LoadingButton } from '../../components/Loading'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [isSendingOtp, setIsSendingOtp] = useState(false)
  const { newPopup } = usePopupAlertContext()
  const navigate = useNavigate()

  function handelRegister() {
    const user_name = name.trim()
    if (!user_name) return transitions(() => newPopup({ title: 'Enter Name', subTitle: 'Please enter your name.' }))()
    const phoneValidStatus = validatePhone(phone, code)
    if (!phoneValidStatus.status)
      return transitions(() => newPopup({ title: 'Invalid Number', subTitle: phoneValidStatus.message }))()
    sendOtp()
  }

  async function sendOtp() {
    setIsSendingOtp(true)
    const res = await sendOtpSignup(phone, code, name.trim())
    setIsSendingOtp(false)
    if (!res.status) return transitions(() => newPopup({ title: 'Error sending OTP', subTitle: res.message }))()
    transitions(() => navigate('/otp', { state: { phone, code, name }, replace: true }))()
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
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
              className='w-full'
            />
          </div>
          <MobileInput code={code} setCode={setCode} phone={phone} setPhone={setPhone} enterFn={handelRegister} />
          {isSendingOtp ? <LoadingButton /> : <Button onClick={handelRegister}>REGISTER</Button>}
        </div>

        <LoginWith />
      </div>
      <div className='mt-2 flex flex-col items-center justify-center pb-5 text-center text-[0.9rem]'>
        <p className='bottom-text text-gray-400'>Already have an account?</p>
        <ClickTextLink text='Login' to='/login' />
      </div>
    </div>
  )
}
