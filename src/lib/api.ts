import { app } from '../constants'
import ls from './util'

const API_URL = app.api

const API = {
  send_otp_login: `${API_URL}/auth/login/send_otp`,
  verify_otp_login: `${API_URL}/auth/login`,
  send_otp_signup: `${API_URL}/auth/signup/send_otp`,
  verify_otp_signup: `${API_URL}/auth/signup`,
  user: {
    current: {
      get: `${API_URL}/user/get_current_user`,
      update: `${API_URL}/user/update_user`,
    },
  },
}

type defaultHeaders = {
  'Content-Type': 'application/json'
  Accept: 'application/json'
  secret?: string
}
export const defaultHeaders: defaultHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  //   secret: app.secret,
}

type formDataHeaders = {
  ContentType: 'multipart/form-data'
  Accept: 'application/json'
  //   secret: string
}
export const formDataHeaders: formDataHeaders = {
  //   secret: app.secret,
  Accept: 'application/json',
  ContentType: 'multipart/form-data',
}

export function authorizedHeader(header: formDataHeaders | defaultHeaders) {
  return { ...header, Authorization: `Bearer ${ls.get('token')}` }
}

export type apiResponse = {
  status: boolean
  message: string
  data?: any
}

export default API

type errors = {
  [key: string]: string[]
}
export function getError(errors: errors) {
  const key = Object.keys(errors)[0]
  const value = errors[key][0]
  return value
}

async function returnResponse(res: any): Promise<apiResponse> {
  const data = await res.json()
  if (data.status === true) return { status: true, message: data.message, data: data }
  else if (!data.errors) return { status: false, message: data.message || 'Network Error' }
  return { status: false, message: getError(data.errors) || data.message || 'Network Error' }
}

function catchError(err: any): apiResponse {
  console.log(err)
  return { status: false, message: 'Network Error' }
}

// All API calls

export async function getCurrentUser(): Promise<apiResponse> {
  const headers = authorizedHeader(defaultHeaders)
  try {
    const res = await fetch(API.user.current.get, {
      method: 'POST',
      headers: headers,
    })
    return await returnResponse(res)
  } catch (err) {
    return catchError(err)
  }
}

export async function verifyOtp_f(
  phone: string,
  country_code: string,
  otp: string,
  type: 'login' | 'signup',
): Promise<apiResponse> {
  const link = type === 'login' ? API.verify_otp_login : API.verify_otp_signup
  const body = { phone, country_code, otp }
  try {
    const res = await fetch(link, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify(body),
    })
    return await returnResponse(res)
  } catch (err) {
    return catchError(err)
  }
}

export async function sendOtpSignup_f(phone: string, country_code: string, name: string): Promise<apiResponse> {
  try {
    const body = { phone, country_code, name }
    const res = await fetch(API.send_otp_signup, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify(body),
    })
    return await returnResponse(res)
  } catch (err) {
    return catchError(err)
  }
}

export async function sendOtpLogin_f(phone: string, country_code: string): Promise<apiResponse> {
  try {
    const body = { phone, country_code }
    const res = await fetch(API.send_otp_login, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify(body),
    })
    return await returnResponse(res)
  } catch (err) {
    return catchError(err)
  }
}
