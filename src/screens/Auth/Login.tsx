import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import { ClickTextLink } from '../../components/Input'
import { LoadingButton } from '../../components/Loading'
import { usePopupAlertContext } from '../../context/PopupAlertContext'
import { sendOtpLogin_f } from '../../lib/api'
import { validatePhone } from '../../lib/lib'
import transitions from '../../lib/transition'
import LoginWith from './components/LoginWith'
import MobileInput from './components/MobileInput'

function Login() {
  const [phone, setPhone] = React.useState('')
  const [code, setCode] = React.useState('')
  const navigate = useNavigate()
  const { newPopup } = usePopupAlertContext()
  const [isSendingOtp, setIsSendingOtp] = React.useState(false)
  const state = useLocation().state as { phone: string; code: string }

  async function sendOtp() {
    setIsSendingOtp(true)
    const phone_f = phone.trim()
    const code_f = code.trim().replace('+', '')
    const data = await sendOtpLogin_f(phone_f, code_f)
    setIsSendingOtp(false)
    // if (!data.status) return newPopup({ title: 'Error sending OTP', subTitle: data.message })
    transitions(() => navigate('/otp', { state: { phone, code, type: 'login' }, replace: true }))()
  }

  function handleLogin() {
    const { status, message } = validatePhone(phone, code)
    if (!status) return newPopup({ title: 'Invalid Number', subTitle: message })
    sendOtp()
  }

  useEffect(() => {
    if (state) {
      const { phone, code } = state
      setPhone(phone)
      setCode(code)
    }
  }, [state])

  return (
    <div className='h-dvh flex w-full select-none flex-col items-center justify-between'>
      <div className='relative h-[50dvh] w-full items-center justify-center'>
        <div className='absolute top-0 z-10 h-[25dvh] w-full bg-gradient-to-b from-bg to-bg/50'></div>
        <img src='/images/background.jpg' className='absolute h-[inherit] w-full object-cover' />
        <div className='absolute bottom-0 z-10 h-[25dvh] w-full bg-gradient-to-t from-bg to-bg/50'></div>
        <div className='absolute z-20 flex h-[50dvh] w-full items-center justify-center'>
          <img src='/AppIcons/full.png' className='logo-long w-1/2' />
        </div>
      </div>
      <div className='flex h-[50dvh] w-full flex-col items-center justify-between gap-3 p-5 pt-0 xxs:h-[45dvh]'>
        <div className='flex w-full flex-col gap-4'>
          <MobileInput code={code} setCode={setCode} phone={phone} setPhone={setPhone} enterFn={handleLogin} />
          {isSendingOtp ? (
            <LoadingButton text='Sending OTP' />
          ) : (
            <Button className='btn' onClick={handleLogin}>
              LOGIN
            </Button>
          )}
        </div>
        <div className='flex w-full flex-grow flex-col items-center justify-center gap-5'>
          <LoginWith />
        </div>
        <div className='flex flex-col items-center justify-center pb-5 text-center text-[0.9rem]'>
          <p className='bottom-text text-gray-400'>Don't have an account?</p>
          <span
            className='tap95 bottom-link cursor-pointer rounded-lg px-2 py-1 font-[450] text-accent active:bg-accent/20'
            onClick={transitions(() => navigate('/register', { replace: true, state: { phone, code } }))}
          >
            REGISTER
          </span>
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default Login
