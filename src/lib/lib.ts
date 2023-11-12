import countryCodes from './countryCodes.json'

type CountryCode = keyof typeof countryCodes

export async function countryCode() {
  try {
    const apiUrl = 'https://ip-api.com/json'
    const res = await fetch(apiUrl)
    if (res.status !== 200) return ''
    const data = await res.json()
    const code: CountryCode = data.countryCode
    return countryCodes[code]
  } catch (err) {
    console.log(err)
  }
  return ''
}
