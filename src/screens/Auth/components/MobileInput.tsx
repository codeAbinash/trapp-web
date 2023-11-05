import React from 'react'
import Input from '../../../components/Input'

function MobileInput({
  code,
  setCode,
  phone,
  setPhone,
}: {
  code: string
  setCode: Function
  phone: string
  setPhone: Function
}) {
  return (
    <div>
      <p className='pb-2 pl-1 text-sm'>Mobile Number</p>
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
  )
}

export default MobileInput
