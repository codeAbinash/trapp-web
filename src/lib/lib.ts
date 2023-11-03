export async function countryCode() {
  const apiUrl = 'http://ip-api.com/json'
  const res = await fetch(apiUrl)
  const data = await res.json()
  return data.countryCode
}
