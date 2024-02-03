import { setProfile } from '@/Redux/profile'
import store from '@/Redux/store'
import { getCurrentUser_f } from '@/lib/api'
import ls from '../../lib/util'

export interface UserProfile {
  status: boolean
  data: Data
  subscription_status: 'expired' | 'active'
  message: string
}

interface Data {
  id: number
  name: string
  country_code: string
  phone: string
  email: string
  profile_pic: string
  coins: number
  created_at: string
  updated_at: string
}
export function getProfileInfoLs(): UserProfile {
  return JSON.parse(ls.get('userProfile') || 'null')
}

export function setProfileInfoLs(data: UserProfile): void {
  ls.set('userProfile', JSON.stringify(data))
}

export async function updateLocalUserData() {
  const userProfileData = await getCurrentUser_f()
  if (userProfileData.status) {
    setProfileInfoLs(userProfileData.data)
    store.dispatch(setProfile(userProfileData.data as UserProfile))
  }
}
