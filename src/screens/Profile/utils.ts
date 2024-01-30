import ls from '../../lib/util'

export type UserProfile = {
  status: boolean
  data: {
    id: number
    name: string
    country_code: string
    phone: string
    email: string | null
    profile_pic: string | null
    created_at: string
    updated_at: string
  }
  subscription_status: 'expired' | 'active'
  message: string
} | null

export function getProfileInfoLs(): UserProfile {
  return JSON.parse(ls.get('userProfile') || 'null')
}

export function setProfileInfoLs(data: UserProfile): void {
  ls.set('userProfile', JSON.stringify(data))
}
