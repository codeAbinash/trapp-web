import React, { useEffect } from 'react'
import MobileInput from './components/MobileInput'
import Button from '../../components/Button'
import { blank_fn } from '../../lib/util'
import LoginWith from './components/LoginWith'
import { ClickTextLink } from '../../components/Input'
import { useNavigate } from 'react-router-dom'
import transitions from '../../lib/transition'
import { sendOtpLogin } from '../../lib/api'
import { usePopupAlertContext } from '../../context/PopupAlertContext'
import { Loading, LoadingButton } from '../../components/Loading'

type ValidStatus = {
  status: boolean
  message: string
}

function validatePhone(phone: string, country_code: string): ValidStatus {
  if (country_code.length < 2)
    return {
      status: false,
      message: 'Please enter country code.',
    }
  if (!phone)
    return {
      status: false,
      message: 'Please enter phone number.',
    }
  return {
    status: true,
    message: '',
  }
}

function Login() {
  const [phone, setPhone] = React.useState('')
  const [code, setCode] = React.useState('')
  const navigate = useNavigate()
  const { newPopup } = usePopupAlertContext()
  const [isSendingOtp, setIsSendingOtp] = React.useState(false)
  const codeRef = React.useRef<HTMLInputElement>(null)
  const phoneRef = React.useRef<HTMLInputElement>(null)

  async function sendOtp() {
    setIsSendingOtp(true)
    const data = await sendOtpLogin('9547400680', '91')
    if (data.status) navigate('/otp', { state: { phone, code }, replace: true })
    else newPopup({ title: 'Error sending OTP', subTitle: data.message })
    setIsSendingOtp(false)
  }

  function handleLogin() {
    const { status, message } = validatePhone(phone, code)
    if (!status) return newPopup({ title: 'Invalid', subTitle: message })
    sendOtp()
  }

  useEffect(() => {
    // sendOtp()
  }, [])
  return (
    <div className='h-dvh flex w-full flex-col items-center justify-between'>
      <div className='relative h-[50dvh] w-full items-center justify-center'>
        <div className='absolute top-0 z-10 h-[25dvh] w-full bg-gradient-to-b from-bg to-bg/50'></div>
        <img src='/images/background.jpg' className='absolute h-[inherit] w-full object-cover' />
        <div className='absolute bottom-0 z-10 h-[25dvh] w-full bg-gradient-to-t from-bg to-bg/50'></div>
        <div className='absolute z-20 flex h-[50dvh] w-full items-center justify-center'>
          <img src='/AppIcons/full.png' className='w-1/2' />
        </div>
      </div>
      <div className='flex h-[50dvh] w-full flex-col items-center justify-between gap-3 p-5 pt-0 xxs:h-[45dvh]'>
        <div className='flex w-full flex-col gap-4'>
          <MobileInput
            code={code}
            setCode={setCode}
            phone={phone}
            setPhone={setPhone}
            nextRef={phoneRef}
            enterFn={handleLogin}
          />
          {isSendingOtp ? <LoadingButton /> : <Button onClick={handleLogin}>LOGIN</Button>}
        </div>
        <div className='flex w-full flex-grow flex-col items-center justify-center gap-5'>
          <LoginWith />
        </div>
        <div className='flex flex-col items-center justify-center pb-5 text-center text-[0.9rem]'>
          <p className='text-gray-400'>Don't have an account?</p>
          <ClickTextLink text='Register' to='/register' />
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default Login
