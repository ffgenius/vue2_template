import cache from '@/utils/cache'

export function getToken() {
  return cache.local.get('token')
}
