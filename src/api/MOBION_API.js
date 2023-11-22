import request from '@/utils/request'

export function load(query) {
  return request({
    url: '/admin/v1/mobon/search',
    method: 'get',
    params: query
  })
}
