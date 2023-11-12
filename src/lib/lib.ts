import { app } from '../constants'
import countryCodes from './countryCodes.json'

type CountryCode = keyof typeof countryCodes

export async function countryCode() {
  try {
    const apiUrl = `https://ipinfo.io/json?token=${app.ipInoKey}`
    const res = await fetch(apiUrl)
    if (res.status !== 200) return ''
    const data = await res.json()
    const code: CountryCode = data.country
    return countryCodes[code]
  } catch (err) {
    console.log(err)
  }
  return ''
}
// export async function countryCode() {
//   try {
//     const apiUrl = 'https://ip-api.com/json'
//     const res = await fetch(apiUrl, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//     if (res.status !== 200) return ''
//     const data = await res.json()
//     const code: CountryCode = data.countryCode
//     return countryCodes[code]
//   } catch (err) {
//     console.log(err)
//   }
//   return ''
// }

export type ValidStatus = {
  status: boolean
  message: string
}

export function validatePhone(phone: string, country_code: string): ValidStatus {
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
