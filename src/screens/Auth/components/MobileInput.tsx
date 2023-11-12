import React, { useEffect } from 'react'
import Input from '../../../components/Input'
import { countryCode } from '../../../lib/lib'

function MobileInput({
  code,
  setCode,
  phone,
  setPhone,
  enterFn,
}: {
  code: string
  setCode: Function
  phone: string
  setPhone: Function
  enterFn?: Function
}) {
  const nextRef = React.useRef<HTMLInputElement>(null)

  async function loadCountryCode() {
    const c_code = await countryCode()
    if (code == '') setCode(c_code)
  }

  useEffect(() => {
    loadCountryCode()
  }, [])

  return (
    <div>
      <p className='pb-2 pl-1 text-sm'>Mobile Number</p>
      <div className='flex gap-3'>
        <Input
          type='tel'
          placeholder='+91'
          value={code}
          onChange={(e) => {
            if (!e.target.value.startsWith('+')) setCode('+' + e.target.value.trim())
            else setCode(e.target.value.trim())
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') if (nextRef.current) nextRef.current.focus()
          }}
          className='w-[30%]'
        />
        <Input
          type='number'
          placeholder='987 654 3210'
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value.trim())
          }}
          className='w-full flex-grow'
          inputRef={nextRef}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              nextRef.current?.blur()
              if (enterFn) enterFn()
            }
          }}
        />
      </div>
    </div>
  )
}

export default MobileInput
