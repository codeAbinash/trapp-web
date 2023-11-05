import React from 'react'
import MobileInput from './components/MobileInput'
import Button from '../../components/Button'
import { blank_fn } from '../../lib/util'
import LoginWith from './components/LoginWith'
import { ClickTextLink } from '../../components/Input'
import { useNavigate } from 'react-router-dom'
import transitions from '../../lib/transition'

function Login() {
  const [phone, setPhone] = React.useState('')
  const [code, setCode] = React.useState('')
  const navigate = useNavigate()
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
      <div className='xxs:h-[45dvh] flex h-[50dvh] w-full flex-col items-center justify-between gap-3 p-5 pt-0'>
        <div className='flex w-full flex-col gap-4'>
          <MobileInput code={code} setCode={setCode} phone={phone} setPhone={setPhone} />
          <Button
            onClick={transitions(() => {
              navigate('/')
            })}
          >
            LOGIN
          </Button>
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
