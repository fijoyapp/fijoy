import {
  LOCAL_STORAGE_HOUSEHOLD_ID_KEY,
  LOCAL_STORAGE_TOKEN_KEY,
} from '@/constant'

export function logout() {
  localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY)
  localStorage.removeItem(LOCAL_STORAGE_HOUSEHOLD_ID_KEY)
}
