import request from '@/utils/request'

export function loadCode(query) {
  return request({
    url: '/xauth/codes',
    method: 'get',
    params: query
  })
}
