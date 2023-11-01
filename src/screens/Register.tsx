import { useState } from 'react'
import Button from '../components/Button'
import Input, { ClickTextLink } from '../components/Input'
import { blank_fn } from '../constants'

export default function Register() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')

  return (
    <div className='h-dvh highlight-none flex select-none flex-col justify-between p-5'>
      <div className='mt-5 flex flex-grow items-center justify-center'>
        <img src='/AppIcons/full.png' className='w-1/2' />
      </div>

      <div className='flex w-full flex-grow flex-col items-center justify-center gap-5'>
        <div className='flex flex-col gap-2 pb-3'>
          <h1 className='text-[2rem] font-[450]'>Register</h1>
          <p className='-mt-2 text-sm'>Create a new account and learn martial arts and more fighting skills</p>
        </div>

        <div className='flex w-full flex-col gap-5'>
          <div>
            <p className='pb-1 pl-1 text-sm'>Full Name</p>
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
          <div>
            <p className='pb-1 pl-1 text-sm'>Mobile Number</p>
            <div className='flex gap-3'>
              <Input
                type='number'
                placeholder='+95'
                value={code}
                onChange={(e) => {
                  setCode(e.target.value)
                }}
                className='w-[30%]'
              />
              <Input
                type='number'
                placeholder='987 654 3210'
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value)
                }}
                className='w-full flex-grow'
              />
            </div>
          </div>
          <Button onClick={blank_fn}>REGISTER</Button>
        </div>

        <div className='flex w-full flex-row items-center justify-center'>
          <div className='h-0.5 w-full bg-white/20'></div>
          <span className='w-full text-center text-xs'>Continue with</span>
          <div className='h-0.5 w-full bg-white/20'></div>
        </div>

        <div className='flex gap-5'>
          <div>
            <img src='icons/social/facebook.webp' className='w-10 rounded-full' />
          </div>
          <div>
            <img src='icons/social/google.png' className='w-10 rounded-full' />
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center justify-center pb-2 text-center text-sm'>
        <p className='text-gray-400'>Already have an account?</p>
        <ClickTextLink text='Login' to='/login' />
      </div>
    </div>
  )
}
