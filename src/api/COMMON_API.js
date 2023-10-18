import request from '@/utils/request'

export function loadCode(query) {
  return request({
    url: '/admin/xauth/codes',
    method: 'get',
    params: query
  })
}
