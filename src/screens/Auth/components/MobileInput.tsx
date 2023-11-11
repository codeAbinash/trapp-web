import React from 'react'
import Input from '../../../components/Input'

function MobileInput({
  code,
  setCode,
  phone,
  setPhone,
  nextRef,
  enterFn,
}: {
  code: string
  setCode: Function
  phone: string
  setPhone: Function
  nextRef: React.RefObject<HTMLInputElement>
  enterFn?: Function
}) {
  return (
    <div>
      <p className='pb-2 pl-1 text-sm'>Mobile Number</p>
      <div className='flex gap-3'>
        <Input
          type='tel'
          placeholder='+95'
          value={code}
          onChange={(e) => {
            if (!e.target.value.startsWith('+')) setCode('+' + e.target.value)
            else setCode(e.target.value)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') nextRef?.current?.focus()
            console.log(nextRef)
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
          inputRef={nextRef}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              if (enterFn) enterFn()
            }
          }}
        />
      </div>
    </div>
  )
}

export default MobileInput
